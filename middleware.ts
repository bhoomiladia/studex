import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect student dashboard
  if (pathname.startsWith("/student-dashboard")) {
    const token = req.cookies.get("studex_token")?.value;
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth-page";
      return NextResponse.redirect(url);
    }
    const { valid } = verifyToken(token);
    if (!valid) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth-page";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/student-dashboard/:path*"],
};
