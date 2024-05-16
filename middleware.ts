import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === '/gallery/AprilFool' || pathname === '/gallery/Shuko') {
    return NextResponse.redirect(new URL('/gallery', req.nextUrl));
  }
}

export const config = {
  matcher: ['/', '/gallery/:path*'],
};
