/**
 * GitHub Stats API Endpoint
 *
 * GET /api/github/stats
 *
 * Query parameters:
 * - dateRange: '24h' | 'week' | 'month' | 'year' | 'all' (default: 'week')
 *
 * Returns GitHub statistics aggregated from MongoDB collections.
 */

import { callMongoDO } from "../../_lib/mongoDoClient";
import type { PagesFunctionContext } from "../../../types/cloudflare";
import type { DateRange, ComparisonData } from "../../../types/github";
import type { MongoCountResult, MongoAggregateResult } from "../../../types/cloudflare";

const COLLECTIONS = {
  COMMITS: "github_commits",
  ISSUES: "github_issues",
  PULL_REQUESTS: "github_pull_requests",
} as const;

function getDateRangeBoundary(range: DateRange): Date | null {
  const now = new Date();
  switch (range) {
    case "24h":
      return new Date(now.getTime() - 24 * 60 * 60 * 1000);
    case "week":
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    case "month":
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    case "year":
      return new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
    case "all":
      return null;
    default:
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  }
}

interface PreviousPeriod {
  start: Date;
  end: Date;
}

function getPreviousPeriodBoundary(range: DateRange): PreviousPeriod | null {
  if (range === "all") {
    return null;
  }

  const now = new Date();
  let periodDuration: number;
  switch (range) {
    case "24h":
      periodDuration = 24 * 60 * 60 * 1000;
      break;
    case "week":
      periodDuration = 7 * 24 * 60 * 60 * 1000;
      break;
    case "month":
      periodDuration = 30 * 24 * 60 * 60 * 1000;
      break;
    case "year":
      periodDuration = 365 * 24 * 60 * 60 * 1000;
      break;
    default:
      periodDuration = 7 * 24 * 60 * 60 * 1000;
  }

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
    case "24h":
      return "%Y-%m-%d %H:00";
    case "week":
      return "%Y-%m-%d";
    case "month":
      return "%Y-%m-%d";
    case "year":
      return "%Y-%m";
    case "all":
      return "%Y";
    default:
      return "%Y-%m-%d";
  }
}

interface RepoId {
  repo_owner: string;
  repo_name: string;
}

interface RepoDocument {
  _id: RepoId;
}

interface TrendRow {
  date: string;
  count?: number;
  opened?: number;
  closed?: number;
  merged?: number;
}

export async function onRequest(context: PagesFunctionContext): Promise<Response> {
  const { request, env } = context;

  try {
    const url = new URL(request.url);
    const dateRangeParam = url.searchParams.get("dateRange") || "week";
    const validRanges: DateRange[] = ["24h", "week", "month", "year", "all"];
    const dateRange = validRanges.includes(dateRangeParam as DateRange)
      ? (dateRangeParam as DateRange)
      : "week";

    const dateBoundary = getDateRangeBoundary(dateRange);
    const trendFormat = getTrendGroupingFormat(dateRange);

    // Build date filter for queries (native Date objects, no $date wrapper)
    const dateFilter = dateBoundary
      ? { date: { $gte: dateBoundary } }
      : {};

    // Get commits count
    const commitsCountResult = await callMongoDO(env, "count", {
      collection: COLLECTIONS.COMMITS,
      args: { filter: dateFilter }
    }) as MongoCountResult;
    const commits = commitsCountResult?.count || 0;

    // Get issues opened/closed count
    const issuesOpenedResult = await callMongoDO(env, "count", {
      collection: COLLECTIONS.ISSUES,
      args: { filter: { ...dateFilter, state: "opened" } }
    }) as MongoCountResult;
    const issuesOpened = issuesOpenedResult?.count || 0;

    const issuesClosedResult = await callMongoDO(env, "count", {
      collection: COLLECTIONS.ISSUES,
      args: { filter: { ...dateFilter, state: "closed" } }
    }) as MongoCountResult;
    const issuesClosed = issuesClosedResult?.count || 0;

    // Get PRs opened/closed/merged count
    const prsOpenedResult = await callMongoDO(env, "count", {
      collection: COLLECTIONS.PULL_REQUESTS,
      args: { filter: { ...dateFilter, state: "opened" } }
    }) as MongoCountResult;
    const prsOpened = prsOpenedResult?.count || 0;

    const prsClosedResult = await callMongoDO(env, "count", {
      collection: COLLECTIONS.PULL_REQUESTS,
      args: { filter: { ...dateFilter, state: "closed" } }
    }) as MongoCountResult;
    const prsClosed = prsClosedResult?.count || 0;

    const prsMergedResult = await callMongoDO(env, "count", {
      collection: COLLECTIONS.PULL_REQUESTS,
      args: { filter: { ...dateFilter, state: "merged" } }
    }) as MongoCountResult;
    const prsMerged = prsMergedResult?.count || 0;

    // Get unique repos using aggregation
    const commitsReposResult = await callMongoDO(env, "aggregate", {
      collection: COLLECTIONS.COMMITS,
      args: {
        pipeline: [
          ...(dateBoundary
            ? [
                {
                  $match: {
                    date: { $gte: dateBoundary },
                  },
                },
              ]
            : []),
          {
            $group: {
              _id: { repo_owner: "$repo_owner", repo_name: "$repo_name" },
            },
          },
        ]
      }
    }) as MongoAggregateResult;
    const commitsRepos = (commitsReposResult?.documents || []) as RepoDocument[];

    const issuesReposResult = await callMongoDO(env, "aggregate", {
      collection: COLLECTIONS.ISSUES,
      args: {
        pipeline: [
          ...(dateBoundary
            ? [
                {
                  $match: {
                    date: { $gte: dateBoundary },
                  },
                },
              ]
            : []),
          {
            $group: {
              _id: { repo_owner: "$repo_owner", repo_name: "$repo_name" },
            },
          },
        ]
      }
    }) as MongoAggregateResult;
    const issuesRepos = (issuesReposResult?.documents || []) as RepoDocument[];

    const prReposResult = await callMongoDO(env, "aggregate", {
      collection: COLLECTIONS.PULL_REQUESTS,
      args: {
        pipeline: [
          ...(dateBoundary
            ? [
                {
                  $match: {
                    date: { $gte: dateBoundary },
                  },
                },
              ]
            : []),
          {
            $group: {
              _id: { repo_owner: "$repo_owner", repo_name: "$repo_name" },
            },
          },
        ]
      }
    }) as MongoAggregateResult;
    const prRepos = (prReposResult?.documents || []) as RepoDocument[];

    // Combine and get unique repos
    const repoSet = new Set<string>();
    [...commitsRepos, ...issuesRepos, ...prRepos].forEach((repo) => {
      if (repo._id && repo._id.repo_owner && repo._id.repo_name) {
        repoSet.add(`${repo._id.repo_owner}/${repo._id.repo_name}`);
      }
    });
    const totalRepos = repoSet.size;

    // Get commits trend
    const commitsTrendResult = await callMongoDO(env, "aggregate", {
      collection: COLLECTIONS.COMMITS,
      args: {
        pipeline: [
          ...(dateBoundary
            ? [
                {
                  $match: {
                    date: { $gte: dateBoundary },
                  },
                },
              ]
            : []),
          {
            $group: {
              _id: {
                $dateToString: {
                  format: trendFormat,
                  date: "$date",
                },
              },
              count: { $sum: 1 },
            },
          },
          { $sort: { _id: 1 } },
          {
            $project: {
              _id: 0,
              date: "$_id",
              count: 1,
            },
          },
        ]
      }
    }) as MongoAggregateResult;
    const commitsTrendData = (commitsTrendResult?.documents || []) as TrendRow[];
    const commitsTrend = commitsTrendData.map((row) => ({
      date: row.date,
      count: row.count || 0,
    }));

    // Get issues trend
    const issuesTrendResult = await callMongoDO(env, "aggregate", {
      collection: COLLECTIONS.ISSUES,
      args: {
        pipeline: [
          ...(dateBoundary
            ? [
                {
                  $match: {
                    date: { $gte: dateBoundary },
                  },
                },
              ]
            : []),
          {
            $group: {
              _id: {
                $dateToString: {
                  format: trendFormat,
                  date: "$date",
                },
              },
              opened: {
                $sum: { $cond: [{ $eq: ["$state", "opened"] }, 1, 0] },
              },
              closed: {
                $sum: { $cond: [{ $eq: ["$state", "closed"] }, 1, 0] },
              },
            },
          },
          { $sort: { _id: 1 } },
          {
            $project: {
              _id: 0,
              date: "$_id",
              opened: 1,
              closed: 1,
            },
          },
        ]
      }
    }) as MongoAggregateResult;
    const issuesTrendData = (issuesTrendResult?.documents || []) as TrendRow[];
    const issuesTrend = issuesTrendData.map((row) => ({
      date: row.date,
      opened: row.opened || 0,
      closed: row.closed || 0,
    }));

    // Get PRs trend
    const prsTrendResult = await callMongoDO(env, "aggregate", {
      collection: COLLECTIONS.PULL_REQUESTS,
      args: {
        pipeline: [
          ...(dateBoundary
            ? [
                {
                  $match: {
                    date: { $gte: dateBoundary },
                  },
                },
              ]
            : []),
          {
            $group: {
              _id: {
                $dateToString: {
                  format: trendFormat,
                  date: "$date",
                },
              },
              opened: {
                $sum: { $cond: [{ $eq: ["$state", "opened"] }, 1, 0] },
              },
              closed: {
                $sum: { $cond: [{ $eq: ["$state", "closed"] }, 1, 0] },
              },
              merged: {
                $sum: { $cond: [{ $eq: ["$state", "merged"] }, 1, 0] },
              },
            },
          },
          { $sort: { _id: 1 } },
          {
            $project: {
              _id: 0,
              date: "$_id",
              opened: 1,
              closed: 1,
              merged: 1,
            },
          },
        ]
      }
    }) as MongoAggregateResult;
    const prsTrendData = (prsTrendResult?.documents || []) as TrendRow[];
    const prsTrend = prsTrendData.map((row) => ({
      date: row.date,
      opened: row.opened || 0,
      closed: row.closed || 0,
      merged: row.merged || 0,
    }));

    // Calculate previous period stats for comparison
    const previousPeriod = getPreviousPeriodBoundary(dateRange);
    let commitsComparison: ComparisonData | null = null;
    let issuesOpenedComparison: ComparisonData | null = null;
    let issuesClosedComparison: ComparisonData | null = null;
    let prsOpenedComparison: ComparisonData | null = null;
    let prsClosedComparison: ComparisonData | null = null;
    let prsMergedComparison: ComparisonData | null = null;

    if (previousPeriod) {
      const previousDateFilter = {
        date: {
          $gte: previousPeriod.start,
          $lt: previousPeriod.end,
        },
      };

      // Get previous period counts
      const prevCommitsResult = await callMongoDO(env, "count", {
        collection: COLLECTIONS.COMMITS,
        args: { filter: previousDateFilter }
      }) as MongoCountResult;
      const previousCommits = prevCommitsResult?.count || 0;

      const prevIssuesOpenedResult = await callMongoDO(env, "count", {
        collection: COLLECTIONS.ISSUES,
        args: { filter: { ...previousDateFilter, state: "opened" } }
      }) as MongoCountResult;
      const previousIssuesOpened = prevIssuesOpenedResult?.count || 0;

      const prevIssuesClosedResult = await callMongoDO(env, "count", {
        collection: COLLECTIONS.ISSUES,
        args: { filter: { ...previousDateFilter, state: "closed" } }
      }) as MongoCountResult;
      const previousIssuesClosed = prevIssuesClosedResult?.count || 0;

      const prevPrsOpenedResult = await callMongoDO(env, "count", {
        collection: COLLECTIONS.PULL_REQUESTS,
        args: { filter: { ...previousDateFilter, state: "opened" } }
      }) as MongoCountResult;
      const previousPrsOpened = prevPrsOpenedResult?.count || 0;

      const prevPrsClosedResult = await callMongoDO(env, "count", {
        collection: COLLECTIONS.PULL_REQUESTS,
        args: { filter: { ...previousDateFilter, state: "closed" } }
      }) as MongoCountResult;
      const previousPrsClosed = prevPrsClosedResult?.count || 0;

      const prevPrsMergedResult = await callMongoDO(env, "count", {
        collection: COLLECTIONS.PULL_REQUESTS,
        args: { filter: { ...previousDateFilter, state: "merged" } }
      }) as MongoCountResult;
      const previousPrsMerged = prevPrsMergedResult?.count || 0;

      // Calculate differences
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

    const stats = {
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

    return new Response(JSON.stringify(stats), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    console.error("Error in stats endpoint:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return new Response(
      JSON.stringify({
        error: "Failed to fetch stats",
        message: errorMessage,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}

