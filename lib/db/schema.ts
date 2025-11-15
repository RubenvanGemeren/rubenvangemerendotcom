import { Collection, IndexSpecification } from 'mongodb';
import { getCollection } from './connection';

export const COLLECTIONS = {
  COMMITS: 'github_commits',
  ISSUES: 'github_issues',
  PULL_REQUESTS: 'github_pull_requests',
} as const;

export interface IndexDefinition {
  keys: IndexSpecification;
  options?: {
    unique?: boolean;
    name?: string;
  };
}

export async function ensureIndexes(): Promise<void> {
  // Commits collection indexes
  const commitsCollection = await getCollection(COLLECTIONS.COMMITS);
  await commitsCollection.createIndex(
    { repo_owner: 1, repo_name: 1, commit_sha: 1 },
    { unique: true, name: 'unique_commit' }
  );
  await commitsCollection.createIndex({ date: 1 }, { name: 'idx_date' });
  await commitsCollection.createIndex({ author: 1 }, { name: 'idx_author' });
  await commitsCollection.createIndex({ repo_owner: 1, repo_name: 1 }, { name: 'idx_repo' });

  // Issues collection indexes
  const issuesCollection = await getCollection(COLLECTIONS.ISSUES);
  await issuesCollection.createIndex(
    { repo_owner: 1, repo_name: 1, issue_number: 1 },
    { unique: true, name: 'unique_issue' }
  );
  await issuesCollection.createIndex({ date: 1 }, { name: 'idx_date' });
  await issuesCollection.createIndex({ state: 1 }, { name: 'idx_state' });
  await issuesCollection.createIndex({ repo_owner: 1, repo_name: 1 }, { name: 'idx_repo' });

  // Pull requests collection indexes
  const prsCollection = await getCollection(COLLECTIONS.PULL_REQUESTS);
  await prsCollection.createIndex(
    { repo_owner: 1, repo_name: 1, pr_number: 1 },
    { unique: true, name: 'unique_pr' }
  );
  await prsCollection.createIndex({ date: 1 }, { name: 'idx_date' });
  await prsCollection.createIndex({ state: 1 }, { name: 'idx_state' });
  await prsCollection.createIndex({ repo_owner: 1, repo_name: 1 }, { name: 'idx_repo' });

  if (process.env.NODE_ENV !== 'production') {
    console.log('MongoDB indexes created successfully');
  }
}

export async function checkCollectionsExist(): Promise<boolean> {
  try {
    const { getDb } = await import('./connection');
    const db = await getDb();
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);

    return (
      collectionNames.includes(COLLECTIONS.COMMITS) &&
      collectionNames.includes(COLLECTIONS.ISSUES) &&
      collectionNames.includes(COLLECTIONS.PULL_REQUESTS)
    );
  } catch (error) {
    console.error('Error checking collections:', error);
    return false;
  }
}

