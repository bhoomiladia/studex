// @ts-nocheck


import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import { verifyToken } from "@/lib/auth";
import Student from "@/models/Student";
import Hostel from "@/models/Hostel";
import LibraryTransaction from "@/models/LibraryTransaction";
import FeesHistory from "@/models/FeesHistory";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const token = req.cookies.get("studex_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { valid, payload } = verifyToken(token);
    if (!valid || !payload?.sub) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const student = await Student.findById(payload.sub)
      .select("firstName lastName email rollNumber department year status hostelName roomNumber messPreference roomPreference")
      .lean();
    if (!student) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Hostel allocation (student.hostelName holds Hostel ObjectId)
    let hostel: any = null;
    if (student.hostelName) {
      hostel = await Hostel.findById(student.hostelName).lean();
    }

    // Library transactions and Fees history
    const [transactions, fees] = await Promise.all([
      LibraryTransaction.find({ studentId: payload.sub })
        .populate('bookCode', 'title author')
        .lean(),
      FeesHistory.find({ studentId: payload.sub }).lean(),
    ]);

    // Shape books to what the frontend expects
    const books = transactions.map((t: any) => ({
      _id: t._id,
      bookTitle: t.bookCode?.title || 'Unknown Book',
      author: t.bookCode?.author || 'Unknown',
      issueDate: t.issuedAt,
      dueDate: t.dueDate,
      status: t.returnedAt ? 'returned' : 'issued',
      returnDate: t.returnedAt || null,
    }));

    return NextResponse.json({ student, hostel, books, fees });
  } catch (e) {
    console.error("/api/student/dashboard error", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
