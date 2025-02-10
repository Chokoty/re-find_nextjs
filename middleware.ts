import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === '/album/AprilFool' || pathname === '/album/Shuko') {
    return NextResponse.redirect(new URL('/album', req.nextUrl));
  }
}

export const config = {
  matcher: ['/', '/album/:path*'],
};
