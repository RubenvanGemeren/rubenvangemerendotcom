import { NextRequest, NextResponse } from 'next/server';
import { syncGitHubData } from '@/lib/github/sync';

// Edge Runtime required by @cloudflare/next-on-pages adapter
// Note: MongoDB operations should be moved to a separate Cloudflare Worker
export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    // Check for sync secret in header
    const syncSecret = request.headers.get('x-sync-secret');
    const expectedSecret = process.env.SYNC_CODE;

    if (!expectedSecret) {
      return NextResponse.json(
        { error: 'Sync secret not configured' },
        { status: 500 }
      );
    }

    if (!syncSecret || syncSecret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Run sync
    const result = await syncGitHubData();

    return NextResponse.json({
      success: true,
      result: {
        commitsAdded: result.commitsAdded,
        issuesAdded: result.issuesAdded,
        prsAdded: result.prsAdded,
        errors: result.errors,
      },
    });
  } catch (error) {
    console.error('Error in sync endpoint:', error);
    return NextResponse.json(
      {
        error: 'Sync failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

