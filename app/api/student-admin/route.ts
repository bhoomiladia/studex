import { NextRequest, NextResponse } from "next/server";
import Student from "@/models/Student";
import Hostel from "@/models/Hostel";
import LibraryTransaction from "@/models/LibraryTransaction";
import FeesHistory from "@/models/FeesHistory";
import {connectDB} from "@/lib/mongo";
import crypto from "node:crypto";
import { hashPasswordSHA256 } from "@/lib/auth";

// ✅ GET all students with filters + pagination + sorting
export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);

  const filters: any = {};
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const sortBy = searchParams.get("sortBy") || "firstName";
  const order = searchParams.get("order") === "desc" ? -1 : 1;

  if (searchParams.get("status")) {
    filters.status = searchParams.get("status") === "true";
  }
  if (searchParams.get("department")) {
    filters.department = searchParams.get("department");
  }
  if (searchParams.get("year")) {
    filters.year = searchParams.get("year");
  }
  if (searchParams.get("name")) {
    const nameQuery = searchParams.get("name") || "";
    filters.$or = [
      { firstName: { $regex: nameQuery, $options: "i" } },
      { lastName: { $regex: nameQuery, $options: "i" } },
      { email: { $regex: nameQuery, $options: "i" } },
      { rollNumber: { $regex: nameQuery, $options: "i" } },
    ];
  }

  const students = await Student.find(filters)
    .sort({ [sortBy]: order })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Student.countDocuments(filters);

  return NextResponse.json({ students, total, page, limit });
}

// ✅ Approve / Reject student
export async function PATCH(req: NextRequest) {
  await connectDB();
  const { studentId, action } = await req.json();

  if (!studentId || !["approve", "reject"].includes(action)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const student = await Student.findById(studentId);
  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  if (action === "approve") {
    // Only assign roll no. if student is 1st year
    if (student.year === 1 && !student.rollNumber) {
      const currentYear = new Date().getFullYear();
      const yy = String(currentYear).slice(-2);
      const dept = (student.department || "GEN").toUpperCase().slice(0, 3);

      const prefix = `HIT${yy}${dept}`;
      // Find the largest existing serial with this prefix
      const last = await Student.findOne({ rollNumber: { $regex: `^${prefix}\\d{3}$` } })
        .sort({ rollNumber: -1 })
        .select("rollNumber")
        .lean();
      let nextSerialNum = 1;
      if (last?.rollNumber) {
        const lastSerial = parseInt(String(last.rollNumber).slice(-3), 10);
        if (!isNaN(lastSerial)) nextSerialNum = lastSerial + 1;
      }
      student.rollNumber = `${prefix}${String(nextSerialNum).padStart(3, "0")}`;
    }

    // Ensure student has a password. If missing (or empty), generate a temporary one
    let tempPassword: string | null = null;
    if (!student.password) {
      tempPassword = crypto.randomBytes(4).toString("hex"); // 8-char temp password
      student.password = hashPasswordSHA256(tempPassword);
    }

    student.status = true;
    try {
      await student.save();
    } catch (err: any) {
      // Handle duplicate rollNumber edge-case (race conditions)
      if (err?.code === 11000 && err?.keyPattern?.rollNumber) {
        const currentYear = new Date().getFullYear();
        const yy = String(currentYear).slice(-2);
        const dept = (student.department || "GEN").toUpperCase().slice(0, 3);
        const prefix = `HIT${yy}${dept}`;
        const last = await Student.findOne({ rollNumber: { $regex: `^${prefix}\\d{3}$` } })
          .sort({ rollNumber: -1 })
          .select("rollNumber")
          .lean();
        const nextSerialNum = (last?.rollNumber ? parseInt(String(last.rollNumber).slice(-3), 10) + 1 : 1) || 1;
        student.rollNumber = `${prefix}${String(nextSerialNum).padStart(3, "0")}`;
        await student.save();
      } else {
        console.error("Approve student save error:", err);
        return NextResponse.json({ error: "Failed to approve student" }, { status: 500 });
      }
    }
    return NextResponse.json({ 
      message: "Student approved",
      rollNumber: student.rollNumber,
      credentials: tempPassword ? { email: student.email, password: tempPassword } : undefined
    });
  }

  if (action === "reject") {
    await Student.findByIdAndDelete(studentId);
    return NextResponse.json({ message: "Student rejected & removed" });
  }
}

// ✅ Get full student details
export async function POST(req: NextRequest) {
  await connectDB();
  const { studentId } = await req.json();

  const student = await Student.findById(studentId);
  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  const hostel = await Hostel.findOne({ studentId });
  const books = await LibraryTransaction.find({ studentId });
  const FeesHistorys = await FeesHistory.find({ studentId });

  return NextResponse.json({
    student,
    hostel,
    books,
    FeesHistorys,
  });
}
