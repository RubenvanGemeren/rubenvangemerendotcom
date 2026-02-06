import { MongoClient, Db, Document } from 'mongodb';

function getConnectionString(): string {
  // Option 1: Use full connection string if provided (easiest)
  if (process.env.MONGODB_CONNECTION_STRING) {
    return process.env.MONGODB_CONNECTION_STRING;
  }

  // Option 2: Build connection string from parts
  const username = process.env.DB_ADMIN_USERNAME;
  const password = process.env.DB_ADMIN_PASSWORD;
  const cluster = process.env.MONGODB_CLUSTER || 'rubenvangemerendotcom-cluster';

  if (!username || !password) {
    throw new Error('Missing required database environment variables. Either provide MONGODB_CONNECTION_STRING or both DB_ADMIN_USERNAME and DB_ADMIN_PASSWORD');
  }

  // URL encode password to handle special characters
  const encodedPassword = encodeURIComponent(password);

  return `mongodb+srv://${username}:${encodedPassword}@${cluster}.mongodb.net/?retryWrites=true&w=majority`;
}

// In Cloudflare Workers, connections should not be reused across requests.
// Create a new client per request. For Node.js environments (local dev),
// we can still cache the client for the duration of the process.
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getDb(): Promise<Db> {
  // During build time, database is not available
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    throw new Error('Database not available during build time');
  }

  // In non-Worker environments (local dev), reuse the cached connection
  if (cachedDb) {
    return cachedDb;
  }

  const databaseName = process.env.MONGODB_DATABASE || 'github_stats';
  const connectionString = getConnectionString();

  const client = new MongoClient(connectionString, {
    // Minimal pool for serverless/Workers environments
    maxPoolSize: 3,
    minPoolSize: 0,
    // Shorter timeouts for serverless cold starts
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
  });

  try {
    await client.connect();
  } catch (error) {
    if (error instanceof Error && error.message.includes('ENOTFOUND')) {
      throw new Error(
        `Failed to connect to MongoDB cluster. Please verify:\n` +
        `1. The cluster name/connection string is correct\n` +
        `2. The cluster exists in MongoDB Atlas\n` +
        `3. Your network allows connections to MongoDB Atlas\n` +
        `Original error: ${error.message}`
      );
    }
    throw error;
  }

  const db = client.db(databaseName);

  // Cache for local dev (Node.js), but in Workers each invocation is isolated
  cachedClient = client;
  cachedDb = db;

  return db;
}

export async function closeDb(): Promise<void> {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
  }
}

// Helper function to get a collection
export async function getCollection<T extends Document = Document>(collectionName: string) {
  const database = await getDb();
  return database.collection<T>(collectionName);
}
