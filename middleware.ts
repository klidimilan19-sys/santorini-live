import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_VALUE } from "@/lib/admin-auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoginRoute =
    pathname === "/admin/login" ||
    pathname === "/api/admin/auth/login";

  if (isLoginRoute) return NextResponse.next();

  const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (session === ADMIN_SESSION_VALUE) return NextResponse.next();

  if (pathname.startsWith("/api/admin")) {
    return NextResponse.json({ error: "Admin authentication required." }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
