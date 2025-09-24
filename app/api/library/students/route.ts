import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Student from "@/models/Student";

export async function GET() {
  try {
    await connectDB();
    const students = await Student.find()
      .select("firstName lastName email rollNumber department year")
      .lean();
    
    // Transform data to include full name
    const transformedStudents = students.map(student => ({
      ...student,
      name: `${student.firstName} ${student.lastName || ""}`.trim()
    }));

    return NextResponse.json(transformedStudents);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}