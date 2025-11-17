/**
 * GitHub Sync API Endpoint
 *
 * POST /api/github/sync
 *
 * Headers:
 * - x-sync-secret: Secret key for authentication
 *
 * Syncs GitHub data (commits, issues, PRs) to MongoDB via Durable Object.
 * Calls GitHub API and writes results to database.
 */

import { callMongoDO } from "../../_lib/mongoDoClient";
import type { PagesFunctionContext, Env } from "../../../types/cloudflare";
import type { GitHubCommit, GitHubIssue, GitHubPullRequest } from "../../../types/github";

const COLLECTIONS = {
  COMMITS: "github_commits",
  ISSUES: "github_issues",
  PULL_REQUESTS: "github_pull_requests",
} as const;

const GITHUB_API_BASE = "https://api.github.com";

interface GitHubEvent {
  id: string;
  type: string;
  actor: { login: string };
  repo: { name: string };
  payload: {
    commits?: Array<{ sha: string }> | { sha: string };
    issue?: { number: number };
    pull_request?: { number: number; merged?: boolean };
    action?: string;
  };
  created_at: string;
}

interface GitHubRepo {
  owner: { login: string };
  name: string;
}

interface GitHubCommitResponse {
  sha: string;
  author?: { login: string };
  commit?: { author: { date: string; name: string } };
  stats?: { additions: number; deletions: number };
}

interface GitHubIssueResponse {
  number: number;
  state: "open" | "closed";
  created_at: string;
  closed_at?: string;
  updated_at: string;
  pull_request?: unknown;
}

interface GitHubPRResponse {
  number: number;
  state: "open" | "closed";
  merged_at?: string;
  closed_at?: string;
  created_at: string;
}

interface SyncResult {
  commitsAdded: number;
  issuesAdded: number;
  prsAdded: number;
  errors: string[];
}

async function fetchWithAuth(
  url: string,
  token: string | undefined,
  options: RequestInit = {}
): Promise<Response> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "GitHub-Stats-Dashboard",
  };

  if (token) {
    headers.Authorization = `token ${token}`;
  }

  const response = await fetch(url, { headers, ...options });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GitHub API error: ${response.status} ${response.statusText} - ${errorText}`);
  }

  return response;
}

async function fetchUserPublicEvents(username: string, token: string | undefined): Promise<GitHubEvent[]> {
  const url = `${GITHUB_API_BASE}/users/${username}/events/public?per_page=100`;
  const response = await fetchWithAuth(url, token);
  return response.json() as Promise<GitHubEvent[]>;
}

async function fetchUserRepos(username: string, token: string | undefined): Promise<GitHubRepo[]> {
  const url = `${GITHUB_API_BASE}/user/repos?type=owner&per_page=100&sort=updated`;
  const response = await fetchWithAuth(url, token);
  return response.json() as Promise<GitHubRepo[]>;
}

async function fetchRepoCommits(
  owner: string,
  repo: string,
  token: string | undefined
): Promise<GitHubCommitResponse[]> {
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/commits?per_page=100`;
  const response = await fetchWithAuth(url, token);
  return response.json() as Promise<GitHubCommitResponse[]>;
}

async function fetchRepoIssues(
  owner: string,
  repo: string,
  token: string | undefined
): Promise<GitHubIssueResponse[]> {
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues?state=all&per_page=100`;
  const response = await fetchWithAuth(url, token);
  return response.json() as Promise<GitHubIssueResponse[]>;
}

async function fetchRepoPullRequests(
  owner: string,
  repo: string,
  token: string | undefined
): Promise<GitHubPRResponse[]> {
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/pulls?state=all&per_page=100`;
  const response = await fetchWithAuth(url, token);
  return response.json() as Promise<GitHubPRResponse[]>;
}

interface CommitData {
  repo_owner: string;
  repo_name: string;
  commit_sha: string;
  author: string;
  date: Date;
  additions: number;
  deletions: number;
  raw_data?: Record<string, unknown>;
}

interface IssueData {
  repo_owner: string;
  repo_name: string;
  issue_number: number;
  state: "opened" | "closed";
  date: Date;
  raw_data?: Record<string, unknown>;
}

interface PRData {
  repo_owner: string;
  repo_name: string;
  pr_number: number;
  state: "opened" | "closed" | "merged";
  date: Date;
  raw_data?: Record<string, unknown>;
}

async function insertCommit(env: Env, commit: CommitData): Promise<void> {
  const now = new Date();
  const filter = {
    repo_owner: commit.repo_owner,
    repo_name: commit.repo_name,
    commit_sha: commit.commit_sha,
  };

  const update = {
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
  };

  await callMongoDO(env, "updateOne", {
    collection: COLLECTIONS.COMMITS,
    args: {
      filter,
      update,
      options: { upsert: true }
    }
  });
}

async function insertIssue(env: Env, issue: IssueData): Promise<void> {
  const now = new Date();
  const filter = {
    repo_owner: issue.repo_owner,
    repo_name: issue.repo_name,
    issue_number: issue.issue_number,
  };

  const update = {
    $set: {
      state: issue.state,
      date: issue.date,
      raw_data: issue.raw_data || {},
      updated_at: now,
    },
    $setOnInsert: {
      created_at: now,
    },
  };

  await callMongoDO(env, "updateOne", {
    collection: COLLECTIONS.ISSUES,
    args: {
      filter,
      update,
      options: { upsert: true }
    }
  });
}

async function insertPullRequest(env: Env, pr: PRData): Promise<void> {
  const now = new Date();
  const filter = {
    repo_owner: pr.repo_owner,
    repo_name: pr.repo_name,
    pr_number: pr.pr_number,
  };

  const update = {
    $set: {
      state: pr.state,
      date: pr.date,
      raw_data: pr.raw_data || {},
      updated_at: now,
    },
    $setOnInsert: {
      created_at: now,
    },
  };

  await callMongoDO(env, "updateOne", {
    collection: COLLECTIONS.PULL_REQUESTS,
    args: {
      filter,
      update,
      options: { upsert: true }
    }
  });
}

async function syncGitHubData(env: Env): Promise<SyncResult> {
  const result: SyncResult = {
    commitsAdded: 0,
    issuesAdded: 0,
    prsAdded: 0,
    errors: [],
  };

  const username = env.GITHUB_USERNAME;
  const githubToken = env.GITHUB_TOKEN;
  const privateOwner = env.GITHUB_PRIVATE_OWNER;
  const privateRepo = env.GITHUB_PRIVATE_REPO;

  if (!username) {
    throw new Error("GITHUB_USERNAME environment variable is required");
  }

  if (!githubToken) {
    throw new Error("GITHUB_TOKEN environment variable is required");
  }

  try {
    // Fetch public events
    const publicEvents = await fetchUserPublicEvents(username, githubToken);

    // Parse and store commits from public events
    for (const event of publicEvents) {
      try {
        if (event.type === "PushEvent" && event.payload.commits) {
          const repoParts = event.repo.name.split("/");
          if (repoParts.length === 2) {
            const [owner, repo] = repoParts;
            const commits = Array.isArray(event.payload.commits)
              ? event.payload.commits
              : [event.payload.commits];

            for (const commit of commits) {
              if (commit.sha) {
                await insertCommit(env, {
                  repo_owner: owner,
                  repo_name: repo,
                  commit_sha: commit.sha,
                  author: event.actor.login,
                  date: new Date(event.created_at),
                  additions: 0,
                  deletions: 0,
                  raw_data: commit as Record<string, unknown>,
                });
                result.commitsAdded++;
              }
            }
          }
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        result.errors.push(`Error processing public event ${event.id}: ${errorMessage}`);
      }
    }

    // Fetch user's repositories
    const userRepos = await fetchUserRepos(username, githubToken);

    // Also include the private repo if specified
    const reposToSync: GitHubRepo[] = [...userRepos];
    if (privateOwner && privateRepo) {
      const privateRepoExists = userRepos.some(
        (repo) => repo.owner.login === privateOwner && repo.name === privateRepo
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
        // Fetch commits
        try {
          const commits = await fetchRepoCommits(repoOwner, repoName, githubToken);
          for (const commit of commits) {
            try {
              await insertCommit(env, {
                repo_owner: repoOwner,
                repo_name: repoName,
                commit_sha: commit.sha,
                author: commit.author?.login || commit.commit?.author?.name || "unknown",
                date: new Date(commit.commit?.author?.date || new Date()),
                additions: commit.stats?.additions || 0,
                deletions: commit.stats?.deletions || 0,
                raw_data: commit as Record<string, unknown>,
              });
              result.commitsAdded++;
            } catch (error) {
              const errorMessage = error instanceof Error ? error.message : "Unknown error";
              result.errors.push(
                `Error processing commit ${commit.sha} from ${repoOwner}/${repoName}: ${errorMessage}`
              );
            }
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Unknown error";
          result.errors.push(`Error fetching commits from ${repoOwner}/${repoName}: ${errorMessage}`);
        }

        // Fetch issues
        try {
          const issues = await fetchRepoIssues(repoOwner, repoName, githubToken);
          for (const issue of issues) {
            // Skip PRs (they have pull_request property)
            if (issue.pull_request) {
              continue;
            }

            try {
              await insertIssue(env, {
                repo_owner: repoOwner,
                repo_name: repoName,
                issue_number: issue.number,
                state: issue.state === "open" ? "opened" : "closed",
                date: new Date(
                  issue.state === "open" ? issue.created_at : issue.closed_at || issue.updated_at
                ),
                raw_data: issue as Record<string, unknown>,
              });
              result.issuesAdded++;
            } catch (error) {
              const errorMessage = error instanceof Error ? error.message : "Unknown error";
              result.errors.push(
                `Error processing issue #${issue.number} from ${repoOwner}/${repoName}: ${errorMessage}`
              );
            }
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Unknown error";
          result.errors.push(`Error fetching issues from ${repoOwner}/${repoName}: ${errorMessage}`);
        }

        // Fetch pull requests
        try {
          const prs = await fetchRepoPullRequests(repoOwner, repoName, githubToken);
          for (const pr of prs) {
            try {
              let state: "opened" | "closed" | "merged" = "opened";
              if (pr.merged_at) {
                state = "merged";
              } else if (pr.state === "closed") {
                state = "closed";
              }

              await insertPullRequest(env, {
                repo_owner: repoOwner,
                repo_name: repoName,
                pr_number: pr.number,
                state,
                date: new Date(
                  state === "merged" && pr.merged_at
                    ? pr.merged_at
                    : state === "closed" && pr.closed_at
                    ? pr.closed_at
                    : pr.created_at
                ),
                raw_data: pr as Record<string, unknown>,
              });
              result.prsAdded++;
            } catch (error) {
              const errorMessage = error instanceof Error ? error.message : "Unknown error";
              result.errors.push(
                `Error processing PR #${pr.number} from ${repoOwner}/${repoName}: ${errorMessage}`
              );
            }
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Unknown error";
          result.errors.push(
            `Error fetching pull requests from ${repoOwner}/${repoName}: ${errorMessage}`
          );
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        result.errors.push(`Error processing repo ${repoOwner}/${repoName}: ${errorMessage}`);
      }
    }

    // Also parse issues and PRs from public events
    for (const event of publicEvents) {
      try {
        const repoParts = event.repo.name.split("/");
        if (repoParts.length !== 2) continue;

        const [owner, repo] = repoParts;

        if (event.type === "IssuesEvent") {
          const issue = event.payload.issue;
          if (issue && typeof issue === "object" && "number" in issue && typeof issue.number === "number") {
            await insertIssue(env, {
              repo_owner: owner,
              repo_name: repo,
              issue_number: issue.number,
              state: event.payload.action === "opened" ? "opened" : "closed",
              date: new Date(event.created_at),
              raw_data: issue as Record<string, unknown>,
            });
            result.issuesAdded++;
          }
        } else if (event.type === "PullRequestEvent") {
          const pr = event.payload.pull_request;
          if (pr && typeof pr === "object" && "number" in pr && typeof pr.number === "number") {
            let state: "opened" | "closed" | "merged" = "opened";
            if ("merged" in pr && pr.merged) {
              state = "merged";
            } else if (event.payload.action === "closed") {
              state = "closed";
            }

            await insertPullRequest(env, {
              repo_owner: owner,
              repo_name: repo,
              pr_number: pr.number,
              state,
              date: new Date(event.created_at),
              raw_data: pr as Record<string, unknown>,
            });
            result.prsAdded++;
          }
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        result.errors.push(`Error processing public event ${event.id}: ${errorMessage}`);
      }
    }

    return result;
  } catch (error) {
    console.error("Error in syncGitHubData:", error);
    throw error;
  }
}

export async function onRequest(context: PagesFunctionContext): Promise<Response> {
  const { request, env } = context;

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  try {
    // Check for sync secret in header
    const syncSecret = request.headers.get("x-sync-secret");
    const expectedSecret = env.SYNC_SECRET;

    if (!expectedSecret) {
      return new Response(JSON.stringify({ error: "Sync secret not configured" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    if (!syncSecret || syncSecret !== expectedSecret) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // Run sync
    const result = await syncGitHubData(env);

    return new Response(
      JSON.stringify({
        success: true,
        result: {
          commitsAdded: result.commitsAdded,
          issuesAdded: result.issuesAdded,
          prsAdded: result.prsAdded,
          errors: result.errors,
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("Error in sync endpoint:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({
        error: "Sync failed",
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

