import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAppRoute = req.nextUrl.pathname.startsWith('/app');
  const isApiAuthRoute = req.nextUrl.pathname.startsWith('/api/auth');

  // Allow auth API routes
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // Protect /app/* routes
  if (isAppRoute && !isLoggedIn) {
    const loginUrl = new URL('/login', req.nextUrl.origin);
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect logged-in users from login page to dashboard
  if (req.nextUrl.pathname === '/login' && isLoggedIn) {
    return NextResponse.redirect(new URL('/app/dashboard', req.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/app/:path*', '/login'],
};
