import { MongoClient, Db } from 'mongodb';

let client: MongoClient | null = null;
let db: Db | null = null;

function getConnectionString(): string {
  // Option 1: Use full connection string if provided (easiest)
  if (process.env.MONGODB_CONNECTION_STRING) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Using MONGODB_CONNECTION_STRING from environment');
    }
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

  const connectionString = `mongodb+srv://${username}:${encodedPassword}@${cluster}.mongodb.net/?retryWrites=true&w=majority`;

  // Log connection info (without password) for debugging (dev only)
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Connecting to MongoDB cluster: ${cluster}`);
  }

  return connectionString;
}

export async function getDb(): Promise<Db> {
  if (db) {
    return db;
  }

  const databaseName = process.env.MONGODB_DATABASE || 'github_stats';
  const connectionString = getConnectionString();

  if (!client) {
    client = new MongoClient(connectionString, {
      maxPoolSize: 10,
      minPoolSize: 2,
    });

    try {
      await client.connect();
      if (process.env.NODE_ENV !== 'production') {
        console.log('Connected to MongoDB Atlas');
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('ENOTFOUND')) {
        throw new Error(
          `Failed to connect to MongoDB cluster "${process.env.MONGODB_CLUSTER || 'rubenvangemerendotcom-cluster'}". ` +
          `Please verify:\n` +
          `1. The cluster name is correct in your .env.local file (MONGODB_CLUSTER)\n` +
          `2. The cluster exists in MongoDB Atlas\n` +
          `3. Your network allows connections to MongoDB Atlas\n` +
          `Original error: ${error.message}`
        );
      }
      throw error;
    }
  }

  db = client.db(databaseName);
  return db;
}

export async function closeDb(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
    if (process.env.NODE_ENV !== 'production') {
      console.log('Disconnected from MongoDB');
    }
  }
}

// Helper function to get a collection
export async function getCollection<T = any>(collectionName: string) {
  const database = await getDb();
  return database.collection<T>(collectionName);
}
