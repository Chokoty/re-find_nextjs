import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const sessionCookie = req.cookies.get('session-data')?.value;

  if (pathname === '/album/AprilFool' || pathname === '/album/Shuko') {
    return NextResponse.redirect(new URL('/album', req.nextUrl));
  }
  const recap2024Pattern = /^\/artists\/[^/]+\/recap2024(\/.*)?$/;
  if (
    pathname === '/recap2024' ||
    pathname.startsWith('/recap2024/') ||
    recap2024Pattern.test(pathname)
  ) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  // 보호할 경로 목록
  const protectedRoutes = ['/myLibrary'];

  // 인증되지 않은 사용자가 보호된 경로 접근 시 로그인 페이지로 리다이렉트
  if (
    protectedRoutes.some((route) => pathname.startsWith(route)) &&
    !sessionCookie
  ) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // 모든 조건에 해당하지 않으면 요청을 계속 진행
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/album/:path*',
    '/artists/:artist/recap2024',
    '/recap2024',
    '/myLibrary/:path*',
  ],
};
