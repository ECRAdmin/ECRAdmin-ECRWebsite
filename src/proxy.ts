import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales } from "./lib/locale";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect to /ar if no locale is present
  // In a real app, you might want to detect the user's preferred locale
  request.nextUrl.pathname = `/ar${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, static, etc.)
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.png$).*)",
  ],
};
