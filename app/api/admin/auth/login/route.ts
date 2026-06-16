import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_VALUE,
  isValidAdminCredentials,
} from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { email?: string; password?: string };

  if (!isValidAdminCredentials(body.email?.trim() ?? "", body.password ?? "")) {
    return NextResponse.json({ error: "Invalid admin credentials." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, ADMIN_SESSION_VALUE, {
    httpOnly: true,
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}
