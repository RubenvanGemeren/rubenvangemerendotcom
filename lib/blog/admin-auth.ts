import { NextRequest, NextResponse } from 'next/server';

/**
 * Validates the admin key from request headers.
 * Returns null if valid, or a NextResponse with an error if invalid.
 */
export function validateAdminKey(request: NextRequest): NextResponse | null {
  const adminKey = request.headers.get('x-admin-key');
  const expectedKey = process.env.BLOG_ADMIN_KEY;

  if (!expectedKey) {
    return NextResponse.json(
      { error: 'Blog admin key not configured on server' },
      { status: 500 }
    );
  }

  if (!adminKey || adminKey !== expectedKey) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  return null; // Valid
}
