// @ts-nocheck

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const res = NextResponse.json({ message: "Logged out" });
  res.cookies.set("studex_token", "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
