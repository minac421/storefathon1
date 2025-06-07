import { NextRequest, NextResponse } from 'next/server';

// Supported locales
const locales = ['ar', 'en', 'tr'];
const defaultLocale = 'ar';

// Set matcher for routes that should trigger the middleware
export const config = {
  // استبعاد المسار الجذر / حتى يتم عرض الصفحة الرئيسية مباشرة
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|.*\\.png$|.*\\.jpg$|.*\\.svg$|$).*)'],
};

const cookieName = 'NEXT_LOCALE';

/**
 * Simple function to extract language preference from Accept-Language header
 */
function getPreferredLocale(acceptLanguageHeader: string | null): string {
  if (!acceptLanguageHeader) return defaultLocale;
  
  // Parse the Accept-Language header
  const languages = acceptLanguageHeader.split(',');
  const primaryLanguage = languages[0].split('-')[0].toLowerCase();
  
  // Check if primary language is in our supported locales
  if (locales.includes(primaryLanguage)) {
    return primaryLanguage;
  }
  
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // تجاهل المسار الجذر / حتى تظهر الصفحة الرئيسية
  if (pathname === '/') {
    return NextResponse.next();
  }
  
  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  // If the pathname already has a locale, pass it through
  if (pathnameHasLocale) {
    return NextResponse.next();
  }
  
  // Get user's preferred locale from cookie or Accept-Language header
  const cookieLocale = request.cookies.get(cookieName)?.value;
  const preferredLocale = cookieLocale || getPreferredLocale(request.headers.get('Accept-Language'));
  
  // Build the new URL with locale prefix
  const newUrl = new URL(
    `/${preferredLocale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`,
    request.url
  );
  
  // Preserve the search params
  newUrl.search = request.nextUrl.search;
  
  // Set a cookie with the locale for future reference
  const response = NextResponse.redirect(newUrl);
  response.cookies.set(cookieName, preferredLocale, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  });
  
  return response;
}
