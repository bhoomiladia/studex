// @ts-nocheck

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Student from "@/models/Student";
import crypto from "node:crypto";

// Helper to hash password without extra deps
function hashPassword(password: string) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    // Basic validation (aligns with client-side steps)
    const requiredPersonal = [
      "firstName",
      "lastName",
      "dob",
      "gender",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "postalCode",
    ];

    const requiredAcademic = ["course", "department", "year"]; // rollNumber optional for year === 1
    const requiredGuardian = ["guardianName", "guardianPhone", "emergencyContact"];
    const requiredFinal = ["previousSchool", "password", "confirmPassword"];

    for (const key of [...requiredPersonal, ...requiredAcademic, ...requiredGuardian, ...requiredFinal]) {
      if (!body[key] && body[key] !== 0) {
        return NextResponse.json({ error: `Missing field: ${key}` }, { status: 400 });
      }
    }

    if (Number(body.year) > 1 && !body.rollNumber) {
      return NextResponse.json({ error: "Roll number is required for students above 1st year." }, { status: 400 });
    }

    if (body.password !== body.confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }

    // Prepare payload for Student model
    const payload: any = {
      firstName: body.firstName,
      lastName: body.lastName,
      dob: body.dob ? new Date(body.dob) : undefined,
      gender: body.gender,
      email: body.email,
      phone: body.phone,
      address: body.address,
      city: body.city,
      state: body.state,
      postalCode: body.postalCode,
      course: body.course,
      department: body.department,
      year: Number(body.year),
      rollNumber: body.rollNumber || undefined,
      password: hashPassword(String(body.password)),
      // confirmPassword is not stored for security reasons
      status: false,
      hostel: String(body.hostel).toLowerCase() === "yes", // boolean in schema
      // NOTE: Student.hostelName in schema expects ObjectId of Hostel. We are NOT resolving here.
      // If needed later, a separate flow should link a Hostel document to student.
      roomNumber: body.roomNumber || undefined,
      messPreference: body.messPreference || undefined,
      roomPreference: body.roomPreference || undefined,
      guardianName: body.guardianName,
      guardianPhone: body.guardianPhone,
      emergencyContact: body.emergencyContact,
      previousSchool: body.previousSchool,
    };

    try {
      const student = await Student.create(payload);
      return NextResponse.json({ message: "Application submitted", studentId: student._id }, { status: 201 });
    } catch (err: any) {
      // Handle duplicate keys (email, rollNumber)
      if (err?.code === 11000) {
        const dupField = Object.keys(err.keyPattern || {})[0] || "field";
        return NextResponse.json({ error: `${dupField} already exists` }, { status: 409 });
      }
      console.error("Error creating student:", err);
      return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
    }
  } catch (error) {
    console.error("API error /student-application:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
