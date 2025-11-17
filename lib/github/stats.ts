/**
 * @deprecated This file is deprecated. Database access has been migrated to Cloudflare Pages Functions
 * using MongoDB Atlas Data API. See functions/api/github/stats.js
 *
 * This function is kept for backward compatibility but should not be used in new code.
 * Use the API endpoint /api/github/stats instead.
 */

// Legacy imports - these files have been moved to legacy/db/
// @ts-ignore - Deprecated, keeping for reference
import { getCollection } from '@/lib/db/connection';
// @ts-ignore - Deprecated, keeping for reference
import { COLLECTIONS } from '@/lib/db/schema';
import type { GitHubStats, DateRange } from '@/types/github';

function getDateRangeBoundary(range: DateRange): Date | null {
  const now = new Date();

  switch (range) {
    case '24h':
      return new Date(now.getTime() - 24 * 60 * 60 * 1000);
    case 'week':
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    case 'month':
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    case 'year':
      return new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
    case 'all':
      return null;
    default:
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // Default to week
  }
}

function getPreviousPeriodBoundary(range: DateRange): { start: Date; end: Date } | null {
  if (range === 'all') {
    return null; // No comparison for 'all time'
  }

  const now = new Date();
  let periodDuration: number;

  switch (range) {
    case '24h':
      periodDuration = 24 * 60 * 60 * 1000;
      break;
    case 'week':
      periodDuration = 7 * 24 * 60 * 60 * 1000;
      break;
    case 'month':
      periodDuration = 30 * 24 * 60 * 60 * 1000;
      break;
    case 'year':
      periodDuration = 365 * 24 * 60 * 60 * 1000;
      break;
    default:
      periodDuration = 7 * 24 * 60 * 60 * 1000;
  }

  // Current period: [now - periodDuration, now]
  // Previous period: [now - 2*periodDuration, now - periodDuration]
  const currentPeriodStart = new Date(now.getTime() - periodDuration);
  const previousPeriodEnd = currentPeriodStart;
  const previousPeriodStart = new Date(now.getTime() - 2 * periodDuration);

  return {
    start: previousPeriodStart,
    end: previousPeriodEnd,
  };
}

function getTrendGroupingFormat(range: DateRange): string {
  switch (range) {
    case '24h':
      return '%Y-%m-%d %H:00'; // Hourly for 24h
    case 'week':
      return '%Y-%m-%d'; // Daily for week
    case 'month':
      return '%Y-%m-%d'; // Daily for month
    case 'year':
      return '%Y-%m'; // Monthly for year
    case 'all':
      return '%Y'; // Yearly for all time
    default:
      return '%Y-%m-%d';
  }
}

export async function getGitHubStats(dateRange: DateRange = 'week'): Promise<GitHubStats> {
  try {
    const dateBoundary = getDateRangeBoundary(dateRange);
    const trendFormat = getTrendGroupingFormat(dateRange);

    const commitsCollection = await getCollection(COLLECTIONS.COMMITS);
    const issuesCollection = await getCollection(COLLECTIONS.ISSUES);
    const prsCollection = await getCollection(COLLECTIONS.PULL_REQUESTS);

    // Build date filter for queries (optimized to use index)
    const dateFilter = dateBoundary ? { date: { $gte: dateBoundary } } : {};

    // Get commits count (optimized with index)
    const commits = await commitsCollection.countDocuments(dateFilter);

    // Get issues opened/closed count (optimized with index)
    const issuesOpened = await issuesCollection.countDocuments({
      ...dateFilter,
      state: 'opened',
    });

    const issuesClosed = await issuesCollection.countDocuments({
      ...dateFilter,
      state: 'closed',
    });

    // Get PRs opened/closed/merged count (optimized with index)
    const prsOpened = await prsCollection.countDocuments({
      ...dateFilter,
      state: 'opened',
    });

    const prsClosed = await prsCollection.countDocuments({
      ...dateFilter,
      state: 'closed',
    });

    const prsMerged = await prsCollection.countDocuments({
      ...dateFilter,
      state: 'merged',
    });

    // Get total unique repos using aggregation (optimized)
    const allRepos = await commitsCollection
      .aggregate([
        ...(dateBoundary ? [{ $match: { date: { $gte: dateBoundary } } }] : []),
        {
          $group: {
            _id: { repo_owner: '$repo_owner', repo_name: '$repo_name' },
          },
        },
      ])
      .toArray();

    const issueRepos = await issuesCollection
      .aggregate([
        ...(dateBoundary ? [{ $match: { date: { $gte: dateBoundary } } }] : []),
        {
          $group: {
            _id: { repo_owner: '$repo_owner', repo_name: '$repo_name' },
          },
        },
      ])
      .toArray();

    const prRepos = await prsCollection
      .aggregate([
        ...(dateBoundary ? [{ $match: { date: { $gte: dateBoundary } } }] : []),
        {
          $group: {
            _id: { repo_owner: '$repo_owner', repo_name: '$repo_name' },
          },
        },
      ])
      .toArray();

    // Combine and get unique repos
    const repoSet = new Set<string>();
    [...allRepos, ...issueRepos, ...prRepos].forEach((repo) => {
      repoSet.add(`${repo._id.repo_owner}/${repo._id.repo_name}`);
    });
    const totalRepos = repoSet.size;

    // Get commits trend (optimized: $match first, then $group)
    const commitsTrendData = await commitsCollection
      .aggregate([
        ...(dateBoundary ? [{ $match: { date: { $gte: dateBoundary } } }] : []),
        {
          $group: {
            _id: {
              $dateToString: {
                format: trendFormat,
                date: '$date',
              },
            },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
        {
          $project: {
            _id: 0,
            date: '$_id',
            count: 1,
          },
        },
      ])
      .toArray();

    const commitsTrend = commitsTrendData.map((row: any) => ({
      date: row.date,
      count: row.count,
    }));

    // Get issues trend (optimized: $match first, then $group)
    const issuesTrendData = await issuesCollection
      .aggregate([
        ...(dateBoundary ? [{ $match: { date: { $gte: dateBoundary } } }] : []),
        {
          $group: {
            _id: {
              $dateToString: {
                format: trendFormat,
                date: '$date',
              },
            },
            opened: {
              $sum: {
                $cond: [{ $eq: ['$state', 'opened'] }, 1, 0],
              },
            },
            closed: {
              $sum: {
                $cond: [{ $eq: ['$state', 'closed'] }, 1, 0],
              },
            },
          },
        },
        {
          $sort: { _id: 1 },
        },
        {
          $project: {
            _id: 0,
            date: '$_id',
            opened: 1,
            closed: 1,
          },
        },
      ])
      .toArray();

    const issuesTrend = issuesTrendData.map((row: any) => ({
      date: row.date,
      opened: row.opened || 0,
      closed: row.closed || 0,
    }));

    // Get PRs trend (optimized: $match first, then $group)
    const prsTrendData = await prsCollection
      .aggregate([
        ...(dateBoundary ? [{ $match: { date: { $gte: dateBoundary } } }] : []),
        {
          $group: {
            _id: {
              $dateToString: {
                format: trendFormat,
                date: '$date',
              },
            },
            opened: {
              $sum: {
                $cond: [{ $eq: ['$state', 'opened'] }, 1, 0],
              },
            },
            closed: {
              $sum: {
                $cond: [{ $eq: ['$state', 'closed'] }, 1, 0],
              },
            },
            merged: {
              $sum: {
                $cond: [{ $eq: ['$state', 'merged'] }, 1, 0],
              },
            },
          },
        },
        {
          $sort: { _id: 1 },
        },
        {
          $project: {
            _id: 0,
            date: '$_id',
            opened: 1,
            closed: 1,
            merged: 1,
          },
        },
      ])
      .toArray();

    const prsTrend = prsTrendData.map((row: any) => ({
      date: row.date,
      opened: row.opened || 0,
      closed: row.closed || 0,
      merged: row.merged || 0,
    }));

    // Calculate previous period stats for comparison (skip for 'all' range)
    const previousPeriod = getPreviousPeriodBoundary(dateRange);
    let commitsComparison = null;
    let issuesOpenedComparison = null;
    let issuesClosedComparison = null;
    let prsOpenedComparison = null;
    let prsClosedComparison = null;
    let prsMergedComparison = null;

    if (previousPeriod) {
      const previousDateFilter = {
        date: {
          $gte: previousPeriod.start,
          $lt: previousPeriod.end,
        },
      };

      // Get previous period counts
      const previousCommits = await commitsCollection.countDocuments(previousDateFilter);
      const previousIssuesOpened = await issuesCollection.countDocuments({
        ...previousDateFilter,
        state: 'opened',
      });
      const previousIssuesClosed = await issuesCollection.countDocuments({
        ...previousDateFilter,
        state: 'closed',
      });
      const previousPrsOpened = await prsCollection.countDocuments({
        ...previousDateFilter,
        state: 'opened',
      });
      const previousPrsClosed = await prsCollection.countDocuments({
        ...previousDateFilter,
        state: 'closed',
      });
      const previousPrsMerged = await prsCollection.countDocuments({
        ...previousDateFilter,
        state: 'merged',
      });

      // Calculate differences (current - previous)
      commitsComparison = {
        value: commits - previousCommits,
        isPositive: commits > previousCommits,
      };
      issuesOpenedComparison = {
        value: issuesOpened - previousIssuesOpened,
        isPositive: issuesOpened > previousIssuesOpened,
      };
      issuesClosedComparison = {
        value: issuesClosed - previousIssuesClosed,
        isPositive: issuesClosed > previousIssuesClosed,
      };
      prsOpenedComparison = {
        value: prsOpened - previousPrsOpened,
        isPositive: prsOpened > previousPrsOpened,
      };
      prsClosedComparison = {
        value: prsClosed - previousPrsClosed,
        isPositive: prsClosed > previousPrsClosed,
      };
      prsMergedComparison = {
        value: prsMerged - previousPrsMerged,
        isPositive: prsMerged > previousPrsMerged,
      };
    }

    return {
      commits,
      issuesOpened,
      issuesClosed,
      prsOpened,
      prsClosed,
      prsMerged,
      totalRepos,
      commitsTrend,
      issuesTrend,
      prsTrend,
      dateRange,
      commitsComparison,
      issuesOpenedComparison,
      issuesClosedComparison,
      prsOpenedComparison,
      prsClosedComparison,
      prsMergedComparison,
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    // Return empty stats on error
    return {
      commits: 0,
      issuesOpened: 0,
      issuesClosed: 0,
      prsOpened: 0,
      prsClosed: 0,
      prsMerged: 0,
      totalRepos: 0,
      commitsTrend: [],
      issuesTrend: [],
      prsTrend: [],
      dateRange,
      commitsComparison: null,
      issuesOpenedComparison: null,
      issuesClosedComparison: null,
      prsOpenedComparison: null,
      prsClosedComparison: null,
      prsMergedComparison: null,
    };
  }
}
