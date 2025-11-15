export interface GitHubCommit {
  id?: number;
  repo_owner: string;
  repo_name: string;
  commit_sha: string;
  author: string;
  date: Date;
  additions: number;
  deletions: number;
  raw_data?: Record<string, unknown>;
}

export interface GitHubIssue {
  id?: number;
  repo_owner: string;
  repo_name: string;
  issue_number: number;
  state: 'opened' | 'closed';
  date: Date;
  raw_data?: Record<string, unknown>;
}

export interface GitHubPullRequest {
  id?: number;
  repo_owner: string;
  repo_name: string;
  pr_number: number;
  state: 'opened' | 'closed' | 'merged';
  date: Date;
  raw_data?: Record<string, unknown>;
}

export type DateRange = '24h' | 'week' | 'month' | 'year' | 'all';

export interface ComparisonData {
  value: number;
  isPositive: boolean;
}

export interface GitHubStats {
  commits: number;
  issuesOpened: number;
  issuesClosed: number;
  prsOpened: number;
  prsClosed: number;
  prsMerged: number;
  totalRepos: number;
  commitsTrend: Array<{ date: string; count: number }>;
  issuesTrend: Array<{ date: string; opened: number; closed: number }>;
  prsTrend: Array<{ date: string; opened: number; closed: number; merged: number }>;
  dateRange: DateRange;
  // Comparison data (null for 'all' range)
  commitsComparison: ComparisonData | null;
  issuesOpenedComparison: ComparisonData | null;
  issuesClosedComparison: ComparisonData | null;
  prsOpenedComparison: ComparisonData | null;
  prsClosedComparison: ComparisonData | null;
  prsMergedComparison: ComparisonData | null;
}

export interface GitHubEvent {
  id: string;
  type: string;
  actor: {
    login: string;
  };
  repo: {
    name: string;
  };
  payload: Record<string, unknown>;
  created_at: string;
}

