import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/db/connection';
import { BLOG_COLLECTION } from '@/lib/db/blog-schema';
import { validateAdminKey } from '@/lib/blog/admin-auth';
import type { BlogPost, CreateBlogPostInput } from '@/types/blog';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * GET /api/blog
 * List all non-deleted blog posts, sorted by createdAt descending.
 * Optional query param: ?includeDeleted=true (for admin panel)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeDeleted = searchParams.get('includeDeleted') === 'true';

    const collection = await getCollection<BlogPost>(BLOG_COLLECTION);

    const filter = includeDeleted ? {} : { deletedAt: null };

    const posts = await collection
      .find(filter, {
        projection: {
          slug: 1,
          title: 1,
          subtitle: 1,
          summary: 1,
          tags: 1,
          coverImage: 1,
          createdAt: 1,
          updatedAt: 1,
          deletedAt: 1,
        },
      })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/blog
 * Create a new blog post. Requires admin key.
 */
export async function POST(request: NextRequest) {
  try {
    // Validate admin key
    const authError = validateAdminKey(request);
    if (authError) return authError;

    const body: CreateBlogPostInput = await request.json();

    // Validate required fields
    if (!body.title || !body.summary || !body.content) {
      return NextResponse.json(
        { error: 'Title, summary, and content are required' },
        { status: 400 }
      );
    }

    const collection = await getCollection<BlogPost>(BLOG_COLLECTION);

    // Generate slug from title
    let slug = slugify(body.title);

    // Ensure slug is unique
    const existing = await collection.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const now = new Date();
    const post = {
      slug,
      title: body.title,
      subtitle: body.subtitle || undefined,
      summary: body.summary,
      content: body.content,
      tags: body.tags || [],
      coverImage: body.coverImage || undefined,
      metadata: body.metadata || {},
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    };

    await collection.insertOne(post as any);

    return NextResponse.json({ success: true, slug, post }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
