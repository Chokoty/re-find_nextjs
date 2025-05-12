import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === '/album/AprilFool' || pathname === '/album/Shuko') {
    return NextResponse.redirect(new URL('/album', req.nextUrl));
  }
  const recap2024Pattern = /^\/artists\/[^\/]+\/recap2024(\/.*)?$/;
  if (
    pathname === '/recap2024' ||
    pathname.startsWith('/recap2024/') ||
    recap2024Pattern.test(pathname)
  ) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }
}

export const config = {
  matcher: ['/', '/album/:path*', '/artists/:artist/recap2024', '/recap2024'],
};
