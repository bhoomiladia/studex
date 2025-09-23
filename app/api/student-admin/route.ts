import { NextRequest, NextResponse } from "next/server";
import Student from "@/models/Student";
import Hostel from "@/models/Hostel";
import LibraryTransaction from "@/models/LibraryTransaction";
import FeesHistory from "@/models/FeesHistory";
import {connectDB} from "@/lib/mongo";

// ✅ GET all students with filters + pagination + sorting
export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);

  const filters: any = {};
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const sortBy = searchParams.get("sortBy") || "name";
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
    filters.name = { $regex: searchParams.get("name"), $options: "i" };
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
      const yy = String(student.joiningYear).slice(-2);
      const dept = student.department.toUpperCase();

      // Count existing approved students in same dept & year
      const count = await Student.countDocuments({
        department: student.department,
        joiningYear: student.joiningYear,
        year: 1,
        status: true,
      });

      const serial = String(count + 1).padStart(3, "0");
      student.rollNumber = `HIT${yy}${dept}${serial}`;
    }

    student.status = true;
    await student.save();
    return NextResponse.json({ message: "Student approved", rollNumber: student.rollNumber });
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
