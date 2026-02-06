import { MongoClient, Db, Document } from 'mongodb';

function getConnectionString(): string {
  // Option 1: Use full connection string if provided (easiest)
  const connStr = process.env.MONGODB_CONNECTION_STRING?.trim();
  if (connStr) {
    if (!connStr.startsWith('mongodb://') && !connStr.startsWith('mongodb+srv://')) {
      throw new Error(
        `MONGODB_CONNECTION_STRING has invalid scheme (starts with "${connStr.substring(0, 20)}..."). ` +
        'Expected it to start with "mongodb://" or "mongodb+srv://".'
      );
    }
    return connStr;
  }

  // Option 2: Build connection string from parts
  const username = process.env.DB_ADMIN_USERNAME?.trim();
  const password = process.env.DB_ADMIN_PASSWORD?.trim();
  const cluster = (process.env.MONGODB_CLUSTER || 'rubenvangemerendotcom-cluster').trim();

  if (!username || !password) {
    throw new Error(
      'Missing required database environment variables. ' +
      'Either provide MONGODB_CONNECTION_STRING or both DB_ADMIN_USERNAME and DB_ADMIN_PASSWORD. ' +
      `Currently set: MONGODB_CONNECTION_STRING=${connStr ? 'yes' : 'no'}, ` +
      `DB_ADMIN_USERNAME=${username ? 'yes' : 'no'}, DB_ADMIN_PASSWORD=${password ? 'yes' : 'no'}`
    );
  }

  // URL encode password to handle special characters
  const encodedPassword = encodeURIComponent(password);

  return `mongodb+srv://${username}:${encodedPassword}@${cluster}.mongodb.net/?retryWrites=true&w=majority`;
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

async function connectWithRetry(connectionString: string, maxRetries: number = 2): Promise<MongoClient> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const client = new MongoClient(connectionString, {
      // Single connection for serverless — no pool reuse across requests
      maxPoolSize: 1,
      minPoolSize: 0,
      maxIdleTimeMS: 10000,
      // Timeouts tuned for Cloudflare Workers (30s CPU limit)
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000,
      socketTimeoutMS: 15000,
    });

    try {
      await client.connect();
      return client;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      // Close the failed client before retrying
      try { await client.close(); } catch { /* ignore */ }

      if (attempt < maxRetries) {
        // Brief pause before retry
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  }

  throw lastError || new Error('Failed to connect to MongoDB after retries');
}

export async function getDb(): Promise<Db> {
  // During build time, database is not available
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    throw new Error('Database not available during build time');
  }

  // Reuse cached connection if available and still alive
  if (cachedDb && cachedClient) {
    return cachedDb;
  }

  const databaseName = process.env.MONGODB_DATABASE || 'github_stats';
  const connectionString = getConnectionString();

  const client = await connectWithRetry(connectionString);
  const db = client.db(databaseName);

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
