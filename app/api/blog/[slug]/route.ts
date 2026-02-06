import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/db/connection';
import { BLOG_COLLECTION } from '@/lib/db/blog-schema';
import { validateAdminKey } from '@/lib/blog/admin-auth';
import type { BlogPost, UpdateBlogPostInput } from '@/types/blog';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

/**
 * GET /api/blog/[slug]
 * Fetch a single blog post by slug.
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const collection = await getCollection<BlogPost>(BLOG_COLLECTION);

    const post = await collection.findOne({ slug, deletedAt: null });

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/blog/[slug]
 * Update a blog post. Requires admin key.
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const authError = validateAdminKey(request);
    if (authError) return authError;

    const { slug } = await params;
    const body: UpdateBlogPostInput = await request.json();

    const collection = await getCollection<BlogPost>(BLOG_COLLECTION);

    // Build update object with only provided fields
    const updateFields: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (body.title !== undefined) updateFields.title = body.title;
    if (body.subtitle !== undefined) updateFields.subtitle = body.subtitle;
    if (body.summary !== undefined) updateFields.summary = body.summary;
    if (body.content !== undefined) updateFields.content = body.content;
    if (body.tags !== undefined) updateFields.tags = body.tags;
    if (body.coverImage !== undefined) updateFields.coverImage = body.coverImage;
    if (body.metadata !== undefined) updateFields.metadata = body.metadata;

    const result = await collection.findOneAndUpdate(
      { slug },
      { $set: updateFields },
      { returnDocument: 'after' }
    );

    if (!result) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, post: result });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/blog/[slug]
 * Soft delete a blog post (sets deletedAt). Requires admin key.
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const authError = validateAdminKey(request);
    if (authError) return authError;

    const { slug } = await params;
    const collection = await getCollection<BlogPost>(BLOG_COLLECTION);

    const result = await collection.findOneAndUpdate(
      { slug, deletedAt: null },
      { $set: { deletedAt: new Date(), updatedAt: new Date() } },
      { returnDocument: 'after' }
    );

    if (!result) {
      return NextResponse.json(
        { error: 'Blog post not found or already deleted' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, post: result });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
