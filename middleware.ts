import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { DEFAULT_LOCALE, LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE, isLocaleCode } from './lib/locales';

const PROTECTED_SEGMENTS = ['mchango', 'map', 'dashboard', 'reports', 'transparency', 'calculator'];

function isProtectedPath(pathname: string): boolean {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length < 2) return false;
  return isLocaleCode(parts[0]) && PROTECTED_SEGMENTS.includes(parts[1]);
}

/** The visitor's remembered language, or the default when none is stored. */
function getPreferredLocale(request: NextRequest): string {
  const stored = request.cookies.get(LOCALE_COOKIE)?.value?.toLowerCase();
  return isLocaleCode(stored) ? stored : DEFAULT_LOCALE;
}

/** Redirect to a new pathname while keeping the query string and hash intact. */
function redirectToPathname(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  return NextResponse.redirect(url);
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Bypass all static files, images, icons, and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/icons') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  const firstSegment = pathname.split('/').filter(Boolean)[0]?.toLowerCase() ?? '';

  // Bare root and unprefixed paths go to the language the visitor last chose.
  if (pathname === '/' || pathname === '') {
    return redirectToPathname(request, `/${getPreferredLocale(request)}`);
  }
  if (!isLocaleCode(firstSegment)) {
    return redirectToPathname(request, `/${getPreferredLocale(request)}${pathname}`);
  }

  // Require login for protected segments
  if (isProtectedPath(pathname)) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
    });
    if (!token) {
      const loginUrl = new URL(`/${firstSegment}/login`, request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // The URL is the source of truth: remember whichever locale is being viewed.
  const response = NextResponse.next();
  if (request.cookies.get(LOCALE_COOKIE)?.value !== firstSegment) {
    response.cookies.set(LOCALE_COOKIE, firstSegment, {
      path: '/',
      maxAge: LOCALE_COOKIE_MAX_AGE,
      sameSite: 'lax',
    });
  }
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - images (public images)
     * - favicon.ico (favicon file)
     * - public files with extensions (e.g. .png, .jpg, .svg, .ico, etc.)
     */
    '/((?!api|_next/static|_next/image|images|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|csv|docx?|xlsx?|zip|webmanifest|json)$).*)',
  ],
};
