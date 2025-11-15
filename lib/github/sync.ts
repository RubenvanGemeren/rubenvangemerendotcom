import { getCollection } from '@/lib/db/connection';
import { COLLECTIONS } from '@/lib/db/schema';
import { decrypt } from '@/lib/encryption';
import {
  fetchUserPublicEvents,
  fetchRepoEvents,
  fetchRepoCommits,
  fetchRepoIssues,
  fetchRepoPullRequests,
  fetchUserRepos,
} from './api';
import type { GitHubCommit, GitHubIssue, GitHubPullRequest } from '@/types/github';

interface SyncResult {
  commitsAdded: number;
  issuesAdded: number;
  prsAdded: number;
  errors: string[];
}

export async function syncGitHubData(): Promise<SyncResult> {
  const result: SyncResult = {
    commitsAdded: 0,
    issuesAdded: 0,
    prsAdded: 0,
    errors: [],
  };

  const username = process.env.GITHUB_USERNAME;
  const githubToken = process.env.GITHUB_TOKEN;
  const privateOwner = process.env.GITHUB_PRIVATE_OWNER;
  const privateRepo = process.env.GITHUB_PRIVATE_REPO;

  if (!username) {
    throw new Error('GITHUB_USERNAME environment variable is required');
  }

  if (!githubToken) {
    throw new Error('GITHUB_TOKEN environment variable is required');
  }

  try {
    // Decrypt token if needed (for now, assume it's stored encrypted in env or plain)
    // In production, you might want to store encrypted token in DB and decrypt here
    const token = githubToken; // For now, use directly. Can add decryption if token is stored encrypted

    // Fetch public events
    if (process.env.NODE_ENV !== 'production') {
      console.log('Fetching public events...');
    }
    const publicEvents = await fetchUserPublicEvents(username, token);
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Fetched ${publicEvents.length} public events`);
    }

    // Parse and store commits from public events
    for (const event of publicEvents) {
      try {
        if (event.type === 'PushEvent' && event.payload.commits) {
          const repoParts = event.repo.name.split('/');
          if (repoParts.length === 2) {
            const [owner, repo] = repoParts;
            const commits = Array.isArray(event.payload.commits)
              ? event.payload.commits
              : [event.payload.commits];

            for (const commit of commits) {
              if (commit.sha) {
                await insertCommit({
                  repo_owner: owner,
                  repo_name: repo,
                  commit_sha: commit.sha,
                  author: event.actor.login,
                  date: new Date(event.created_at),
                  additions: 0, // PushEvent doesn't provide these
                  deletions: 0,
                  raw_data: commit,
                });
                result.commitsAdded++;
              }
            }
          }
        }
      } catch (error) {
        result.errors.push(`Error processing public event ${event.id}: ${error}`);
      }
    }

    // Fetch user's repositories and sync data from each
    if (process.env.NODE_ENV !== 'production') {
      console.log('Fetching user repositories...');
    }
    const userRepos = await fetchUserRepos(username, token, 'owner');
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Found ${userRepos.length} repositories owned by user`);
    }

    // Also include the private repo if specified and not already in the list
    const reposToSync = [...userRepos];
    if (privateOwner && privateRepo) {
      const privateRepoExists = userRepos.some(
        (repo: any) => repo.owner.login === privateOwner && repo.name === privateRepo
      );
      if (!privateRepoExists) {
        reposToSync.push({
          owner: { login: privateOwner },
          name: privateRepo,
        });
      }
    }

    // Sync commits, issues, and PRs from each repo
    for (const repo of reposToSync) {
      const repoOwner = repo.owner?.login || privateOwner;
      const repoName = repo.name || privateRepo;

      if (!repoOwner || !repoName) continue;

      try {
        // Fetch commits from this repo
        if (process.env.NODE_ENV !== 'production') {
          console.log(`Fetching commits from ${repoOwner}/${repoName}...`);
        }
        try {
          const commits = await fetchRepoCommits(repoOwner, repoName, token);
          if (process.env.NODE_ENV !== 'production') {
            console.log(`Fetched ${commits.length} commits from ${repoOwner}/${repoName}`);
          }

          for (const commit of commits) {
            try {
              await insertCommit({
                repo_owner: repoOwner,
                repo_name: repoName,
                commit_sha: commit.sha,
                author: commit.author?.login || commit.commit?.author?.name || 'unknown',
                date: new Date(commit.commit.author.date),
                additions: commit.stats?.additions || 0,
                deletions: commit.stats?.deletions || 0,
                raw_data: commit,
              });
              result.commitsAdded++;
            } catch (error) {
              result.errors.push(`Error processing commit ${commit.sha} from ${repoOwner}/${repoName}: ${error}`);
            }
          }
        } catch (error) {
          result.errors.push(`Error fetching commits from ${repoOwner}/${repoName}: ${error}`);
        }

        // Fetch issues from this repo
        if (process.env.NODE_ENV !== 'production') {
          console.log(`Fetching issues from ${repoOwner}/${repoName}...`);
        }
        try {
          const issues = await fetchRepoIssues(repoOwner, repoName, token, 'all');
          if (process.env.NODE_ENV !== 'production') {
            console.log(`Fetched ${issues.length} issues from ${repoOwner}/${repoName}`);
          }

          for (const issue of issues) {
            // Skip PRs (they have pull_request property)
            if (issue.pull_request) {
              continue;
            }

            try {
              await insertIssue({
                repo_owner: repoOwner,
                repo_name: repoName,
                issue_number: issue.number,
                state: issue.state === 'open' ? 'opened' : 'closed',
                date: new Date(issue.state === 'open' ? issue.created_at : issue.closed_at || issue.updated_at),
                raw_data: issue,
              });
              result.issuesAdded++;
            } catch (error) {
              result.errors.push(`Error processing issue #${issue.number} from ${repoOwner}/${repoName}: ${error}`);
            }
          }
        } catch (error) {
          result.errors.push(`Error fetching issues from ${repoOwner}/${repoName}: ${error}`);
        }

        // Fetch pull requests from this repo
        if (process.env.NODE_ENV !== 'production') {
          console.log(`Fetching pull requests from ${repoOwner}/${repoName}...`);
        }
        try {
          const prs = await fetchRepoPullRequests(repoOwner, repoName, token, 'all');
          if (process.env.NODE_ENV !== 'production') {
            console.log(`Fetched ${prs.length} pull requests from ${repoOwner}/${repoName}`);
          }

          for (const pr of prs) {
            try {
              let state: 'opened' | 'closed' | 'merged' = 'opened';
              if (pr.merged_at) {
                state = 'merged';
              } else if (pr.state === 'closed') {
                state = 'closed';
              }

              await insertPullRequest({
                repo_owner: repoOwner,
                repo_name: repoName,
                pr_number: pr.number,
                state,
                date: new Date(
                  state === 'merged' && pr.merged_at
                    ? pr.merged_at
                    : state === 'closed' && pr.closed_at
                    ? pr.closed_at
                    : pr.created_at
                ),
                raw_data: pr,
              });
              result.prsAdded++;
            } catch (error) {
              result.errors.push(`Error processing PR #${pr.number} from ${repoOwner}/${repoName}: ${error}`);
            }
          }
        } catch (error) {
          result.errors.push(`Error fetching pull requests from ${repoOwner}/${repoName}: ${error}`);
        }
      } catch (error) {
        result.errors.push(`Error processing repo ${repoOwner}/${repoName}: ${error}`);
      }
    }

    // Also parse issues and PRs from public events
    for (const event of publicEvents) {
      try {
        const repoParts = event.repo.name.split('/');
        if (repoParts.length !== 2) continue;

        const [owner, repo] = repoParts;

        if (event.type === 'IssuesEvent') {
          const issue = event.payload.issue as any;
          if (issue && typeof issue === 'object' && 'number' in issue && typeof issue.number === 'number') {
            await insertIssue({
              repo_owner: owner,
              repo_name: repo,
              issue_number: issue.number,
              state: event.payload.action === 'opened' ? 'opened' : 'closed',
              date: new Date(event.created_at),
              raw_data: issue,
            });
            result.issuesAdded++;
          }
        } else if (event.type === 'PullRequestEvent') {
          const pr = event.payload.pull_request as any;
          if (pr && typeof pr === 'object' && 'number' in pr && typeof pr.number === 'number') {
            let state: 'opened' | 'closed' | 'merged' = 'opened';
            if (pr.merged) {
              state = 'merged';
            } else if (event.payload.action === 'closed') {
              state = 'closed';
            }

            await insertPullRequest({
              repo_owner: owner,
              repo_name: repo,
              pr_number: pr.number,
              state,
              date: new Date(event.created_at),
              raw_data: pr,
            });
            result.prsAdded++;
          }
        }
      } catch (error) {
        result.errors.push(`Error processing public event ${event.id}: ${error}`);
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log('Sync completed:', result);
    }
    return result;
  } catch (error) {
    console.error('Error in syncGitHubData:', error);
    throw error;
  }
}

async function insertCommit(commit: GitHubCommit): Promise<void> {
  const collection = await getCollection(COLLECTIONS.COMMITS);
  const now = new Date();

  await collection.updateOne(
    {
      repo_owner: commit.repo_owner,
      repo_name: commit.repo_name,
      commit_sha: commit.commit_sha,
    },
    {
      $set: {
        author: commit.author,
        date: commit.date,
        additions: commit.additions,
        deletions: commit.deletions,
        raw_data: commit.raw_data || {},
        updated_at: now,
      },
      $setOnInsert: {
        created_at: now,
      },
    },
    { upsert: true }
  );
}

async function insertIssue(issue: GitHubIssue): Promise<void> {
  const collection = await getCollection(COLLECTIONS.ISSUES);
  const now = new Date();

  await collection.updateOne(
    {
      repo_owner: issue.repo_owner,
      repo_name: issue.repo_name,
      issue_number: issue.issue_number,
    },
    {
      $set: {
        state: issue.state,
        date: issue.date,
        raw_data: issue.raw_data || {},
        updated_at: now,
      },
      $setOnInsert: {
        created_at: now,
      },
    },
    { upsert: true }
  );
}

async function insertPullRequest(pr: GitHubPullRequest): Promise<void> {
  const collection = await getCollection(COLLECTIONS.PULL_REQUESTS);
  const now = new Date();

  await collection.updateOne(
    {
      repo_owner: pr.repo_owner,
      repo_name: pr.repo_name,
      pr_number: pr.pr_number,
    },
    {
      $set: {
        state: pr.state,
        date: pr.date,
        raw_data: pr.raw_data || {},
        updated_at: now,
      },
      $setOnInsert: {
        created_at: now,
      },
    },
    { upsert: true }
  );
}
