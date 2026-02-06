import { NextRequest, NextResponse } from 'next/server';
import { getGitHubStats } from '@/lib/github/stats';
import type { DateRange } from '@/types/github';

// Timeout wrapper to prevent hanging Workers
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`Request timed out after ${ms}ms`)), ms)
    ),
  ]);
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dateRange = (searchParams.get('dateRange') || 'week') as DateRange;

    // Validate dateRange
    const validRanges: DateRange[] = ['24h', 'week', 'month', 'year', 'all'];
    const validDateRange = validRanges.includes(dateRange) ? dateRange : 'week';

    // 25s timeout to stay within Cloudflare Workers' 30s CPU limit
    const stats = await withTimeout(getGitHubStats(validDateRange), 25000);
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch stats',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

