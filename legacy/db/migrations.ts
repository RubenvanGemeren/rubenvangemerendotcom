/**
 * @deprecated This file is archived. Database access has been migrated to Cloudflare Pages Functions
 * using MongoDB Atlas Data API (HTTP). See functions/_lib/mongodbDataApi.js and functions/api/github/*.js
 *
 * This file is kept for reference only. It will not be used in production.
 */

import { getDb } from './connection';
import { ensureIndexes, checkCollectionsExist, COLLECTIONS } from './schema';

export async function runMigrations(): Promise<void> {
  try {
    // Get database - this will create it if it doesn't exist
    const db = await getDb();

    // Collections are created automatically when first document is inserted
    // But we can ensure they exist by creating empty collections if needed
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);

    // Create collections if they don't exist
    if (!collectionNames.includes(COLLECTIONS.COMMITS)) {
      await db.createCollection(COLLECTIONS.COMMITS);
      console.log(`Created collection: ${COLLECTIONS.COMMITS}`);
    }
    if (!collectionNames.includes(COLLECTIONS.ISSUES)) {
      await db.createCollection(COLLECTIONS.ISSUES);
      console.log(`Created collection: ${COLLECTIONS.ISSUES}`);
    }
    if (!collectionNames.includes(COLLECTIONS.PULL_REQUESTS)) {
      await db.createCollection(COLLECTIONS.PULL_REQUESTS);
      console.log(`Created collection: ${COLLECTIONS.PULL_REQUESTS}`);
    }

    // Ensure indexes exist
    await ensureIndexes();

    console.log('Database migrations completed successfully');
  } catch (error) {
    console.error('Error running migrations:', error);
    throw error;
  }
}

export async function checkTablesExist(): Promise<boolean> {
  return await checkCollectionsExist();
}

