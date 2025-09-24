// @ts-nocheck

import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/mongo";
import Student from "@/models/Student";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const cookie = req.cookies.get("studex_token")?.value;
    if (!cookie) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { valid, payload } = verifyToken(cookie);
    if (!valid || !payload?.sub) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const student = await Student.findById(payload.sub).select("firstName lastName email rollNumber department year status");
    if (!student) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ student });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
