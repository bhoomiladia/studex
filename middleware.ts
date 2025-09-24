// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth"; // ✅ Tumhara custom function

export const config = {
  matcher: ["/student-dashboard/:path*"],
  runtime: 'nodejs' // ✅ Force Node.js runtime
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  console.log("🛡️ Middleware triggered for:", pathname)

  // Protect student dashboard
  if (pathname.startsWith("/student-dashboard")) {
    const token = req.cookies.get("studex_token")?.value;
    console.log("🔐 Token found:", !!token)
    
    if (!token) {
      console.log("❌ No token, redirecting to auth-page")
      const url = req.nextUrl.clone();
      url.pathname = "/auth-page";
      return NextResponse.redirect(url);
    }
    
    // ✅ Tumhara custom verifyToken use karo
    const { valid, payload } = verifyToken(token);
    console.log("✅ Token valid:", valid)
    console.log("📄 Token payload:", payload)
    
    if (!valid) {
      console.log("❌ Invalid token, redirecting to auth-page")
      const url = req.nextUrl.clone();
      url.pathname = "/auth-page";
      return NextResponse.redirect(url);
    }
    
    console.log("🎯 Token valid, allowing access to student-dashboard")
  }

  return NextResponse.next();
}