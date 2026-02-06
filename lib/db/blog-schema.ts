import { getCollection } from './connection';

export const BLOG_COLLECTION = 'blog_posts';

export async function ensureBlogIndexes(): Promise<void> {
  const collection = await getCollection(BLOG_COLLECTION);

  // Unique slug index
  await collection.createIndex(
    { slug: 1 },
    { unique: true, name: 'unique_slug' }
  );

  // Created date index for sorting (descending for newest first)
  await collection.createIndex(
    { createdAt: -1 },
    { name: 'idx_created_at' }
  );

  // Tags index for filtering
  await collection.createIndex(
    { tags: 1 },
    { name: 'idx_tags' }
  );

  // Partial index for active (non-deleted) posts
  await collection.createIndex(
    { deletedAt: 1, createdAt: -1 },
    {
      name: 'idx_active_posts',
      partialFilterExpression: { deletedAt: null },
    }
  );

  if (process.env.NODE_ENV !== 'production') {
    console.log('Blog indexes created successfully');
  }
}
