import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Student from "@/models/Student";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const data = await req.json();

    // Auto-generate roll number for 1st-year students
    if (data.year === "1") {
      const count = await Student.countDocuments({ year: "1" });
      const dept = data.department || "CSE";
      data.rollNumber = `HIT${dept}${String(count + 1).padStart(3, "0")}`;
    }

    // Convert hostel string to boolean
    const studentData = {
      ...data,
      hostel: data.hostel === "Yes"
    };

    const newStudent = await Student.create(studentData);
    return NextResponse.json(newStudent, { status: 201 });
  } catch (err: any) {
    console.error("Error creating student:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create student" }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectDB();

  try {
    const students = await Student.find();
    return NextResponse.json(students);
  } catch (err: any) {
    console.error("Error fetching students:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch students" }, 
      { status: 500 }
    );
  }
}