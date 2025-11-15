import type { GitHubEvent } from '@/types/github';

const GITHUB_API_BASE = 'https://api.github.com';

interface GitHubApiOptions {
  token?: string;
  perPage?: number;
  page?: number;
}

async function fetchWithAuth(
  url: string,
  options: GitHubApiOptions = {}
): Promise<Response> {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'GitHub-Stats-Dashboard',
  };

  if (options.token) {
    headers['Authorization'] = `token ${options.token}`;
  }

  const queryParams = new URLSearchParams();
  if (options.perPage) {
    queryParams.append('per_page', options.perPage.toString());
  }
  if (options.page) {
    queryParams.append('page', options.page.toString());
  }

  const fullUrl = queryParams.toString()
    ? `${url}?${queryParams.toString()}`
    : url;

  const response = await fetch(fullUrl, { headers });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GitHub API error: ${response.status} ${response.statusText} - ${errorText}`);
  }

  // Check rate limit
  const remaining = response.headers.get('x-ratelimit-remaining');
  const reset = response.headers.get('x-ratelimit-reset');

  if (remaining === '0') {
    const resetTime = reset ? new Date(parseInt(reset) * 1000) : new Date();
    throw new Error(`GitHub API rate limit exceeded. Resets at: ${resetTime.toISOString()}`);
  }

  return response;
}

export async function fetchUserPublicEvents(
  username: string,
  token?: string,
  perPage: number = 100
): Promise<GitHubEvent[]> {
  const url = `${GITHUB_API_BASE}/users/${username}/events/public`;
  const allEvents: GitHubEvent[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await fetchWithAuth(url, { token, perPage, page });
      const events: GitHubEvent[] = await response.json();

      if (events.length === 0) {
        hasMore = false;
      } else {
        allEvents.push(...events);
        page++;

        // Limit to prevent infinite loops - fetch max 10 pages (1000 events)
        if (page > 10) {
          hasMore = false;
        }
      }
    } catch (error) {
      console.error(`Error fetching public events page ${page}:`, error);
      hasMore = false;
    }
  }

  return allEvents;
}

export async function fetchRepoEvents(
  owner: string,
  repo: string,
  token: string,
  perPage: number = 100
): Promise<GitHubEvent[]> {
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/events`;
  const allEvents: GitHubEvent[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await fetchWithAuth(url, { token, perPage, page });
      const events: GitHubEvent[] = await response.json();

      if (events.length === 0) {
        hasMore = false;
      } else {
        allEvents.push(...events);
        page++;

        // Limit to prevent infinite loops - fetch max 10 pages (1000 events)
        if (page > 10) {
          hasMore = false;
        }
      }
    } catch (error) {
      console.error(`Error fetching repo events page ${page}:`, error);
      hasMore = false;
    }
  }

  return allEvents;
}

export async function fetchRepoCommits(
  owner: string,
  repo: string,
  token: string,
  since?: Date,
  perPage: number = 100
): Promise<any[]> {
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/commits`;
  const allCommits: any[] = [];
  let page = 1;
  let hasMore = true;

  const queryParams = new URLSearchParams();
  if (since) {
    queryParams.append('since', since.toISOString());
  }
  queryParams.append('per_page', perPage.toString());

  while (hasMore) {
    try {
      queryParams.set('page', page.toString());
      const fullUrl = `${url}?${queryParams.toString()}`;

      const response = await fetchWithAuth(fullUrl, { token });
      const commits: any[] = await response.json();

      if (commits.length === 0) {
        hasMore = false;
      } else {
        allCommits.push(...commits);
        page++;

        // Limit to prevent infinite loops
        if (page > 10) {
          hasMore = false;
        }
      }
    } catch (error) {
      console.error(`Error fetching commits page ${page}:`, error);
      hasMore = false;
    }
  }

  return allCommits;
}

export async function fetchRepoIssues(
  owner: string,
  repo: string,
  token: string,
  state: 'open' | 'closed' | 'all' = 'all',
  since?: Date,
  perPage: number = 100
): Promise<any[]> {
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues`;
  const allIssues: any[] = [];
  let page = 1;
  let hasMore = true;

  const queryParams = new URLSearchParams();
  queryParams.append('state', state);
  queryParams.append('per_page', perPage.toString());
  if (since) {
    queryParams.append('since', since.toISOString());
  }

  while (hasMore) {
    try {
      queryParams.set('page', page.toString());
      const fullUrl = `${url}?${queryParams.toString()}`;

      const response = await fetchWithAuth(fullUrl, { token });
      const issues: any[] = await response.json();

      if (issues.length === 0) {
        hasMore = false;
      } else {
        allIssues.push(...issues);
        page++;

        // Limit to prevent infinite loops
        if (page > 10) {
          hasMore = false;
        }
      }
    } catch (error) {
      console.error(`Error fetching issues page ${page}:`, error);
      hasMore = false;
    }
  }

  return allIssues;
}

export async function fetchRepoPullRequests(
  owner: string,
  repo: string,
  token: string,
  state: 'open' | 'closed' | 'all' = 'all',
  since?: Date,
  perPage: number = 100
): Promise<any[]> {
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/pulls`;
  const allPRs: any[] = [];
  let page = 1;
  let hasMore = true;

  const queryParams = new URLSearchParams();
  queryParams.append('state', state);
  queryParams.append('per_page', perPage.toString());
  if (since) {
    queryParams.append('since', since.toISOString());
  }

  while (hasMore) {
    try {
      queryParams.set('page', page.toString());
      const fullUrl = `${url}?${queryParams.toString()}`;

      const response = await fetchWithAuth(fullUrl, { token });
      const prs: any[] = await response.json();

      if (prs.length === 0) {
        hasMore = false;
      } else {
        allPRs.push(...prs);
        page++;

        // Limit to prevent infinite loops
        if (page > 10) {
          hasMore = false;
        }
      }
    } catch (error) {
      console.error(`Error fetching pull requests page ${page}:`, error);
      hasMore = false;
    }
  }

  return allPRs;
}

export async function fetchUserRepos(
  username: string,
  token: string,
  type: 'all' | 'owner' | 'member' = 'all',
  perPage: number = 100
): Promise<any[]> {
  const url = `${GITHUB_API_BASE}/user/repos`;
  const allRepos: any[] = [];
  let page = 1;
  let hasMore = true;

  const queryParams = new URLSearchParams();
  queryParams.append('type', type);
  queryParams.append('per_page', perPage.toString());
  queryParams.append('sort', 'updated');

  while (hasMore) {
    try {
      queryParams.set('page', page.toString());
      const fullUrl = `${url}?${queryParams.toString()}`;

      const response = await fetchWithAuth(fullUrl, { token });
      const repos: any[] = await response.json();

      if (repos.length === 0) {
        hasMore = false;
      } else {
        allRepos.push(...repos);
        page++;

        // Limit to prevent infinite loops - fetch max 10 pages (1000 repos)
        if (page > 10) {
          hasMore = false;
        }
      }
    } catch (error) {
      console.error(`Error fetching user repos page ${page}:`, error);
      hasMore = false;
    }
  }

  return allRepos;
}

