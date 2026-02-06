import { NextRequest, NextResponse } from 'next/server';
import { getGitHubStats } from '@/lib/github/stats';
import type { DateRange } from '@/types/github';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dateRange = (searchParams.get('dateRange') || 'week') as DateRange;

    // Validate dateRange
    const validRanges: DateRange[] = ['24h', 'week', 'month', 'year', 'all'];
    const validDateRange = validRanges.includes(dateRange) ? dateRange : 'week';

    const stats = await getGitHubStats(validDateRange);
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

