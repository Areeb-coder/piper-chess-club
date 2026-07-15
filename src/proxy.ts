import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set.');
  }
  return new TextEncoder().encode(secret);
};

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Protect /admin and /api/admin paths, except login and verify-otp
  const isProtectedAdminRoute = path.startsWith('/admin') && path !== '/admin/login' && path !== '/admin/verify';
  const isProtectedApiRoute = path.startsWith('/api/admin') && path !== '/api/admin/login' && path !== '/api/admin/verify-otp';

  if (!isProtectedAdminRoute && !isProtectedApiRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get('admin-token')?.value;

  if (!token) {
    if (isProtectedApiRoute) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  try {
    const secret = getJwtSecretKey();
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    // Token is invalid or expired
    if (isProtectedApiRoute) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
