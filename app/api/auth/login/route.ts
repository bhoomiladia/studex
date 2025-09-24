import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Student from "@/models/Student";
import { hashPasswordSHA256, signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const student = await Student.findOne({ email });
    if (!student) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Only allow approved students to login
    if (!student.status) {
      return NextResponse.json(
        { error: "Your account is not approved yet" },
        { status: 403 }
      );
    }

    const hash = hashPasswordSHA256(String(password));
    if (hash !== student.password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = signToken({
      sub: String(student._id),
      role: "student",
      email: student.email,
    });
    
    console.log("🔐 Token created in API:", token)
    console.log("🍪 Setting cookie...")

    const res = NextResponse.json({
      message: "Logged in",
      user: { id: student._id, email: student.email, role: "student" },
    });

    res.cookies.set("studex_token", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (e) {
    console.error("/api/auth/login error", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
