import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import FeesHistory from "@/models/FeesHistory";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { studentId, feeId } = await req.json();

    if (!studentId || !feeId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const fee = await FeesHistory.findById(feeId);
    if (!fee) {
      return NextResponse.json({ error: "Fee record not found" }, { status: 404 });
    }
    if (String(fee.studentId) !== String(studentId)) {
      return NextResponse.json({ error: "Fee does not belong to the specified student" }, { status: 400 });
    }

    if (fee.feeType !== 'Fine') {
      return NextResponse.json({ error: "Only Fine fees can be waived" }, { status: 400 });
    }

    if (fee.status === 'Paid') {
      return NextResponse.json({ error: "This fine is already settled" }, { status: 400 });
    }

    // Mark fine as paid with a waive note
    fee.status = 'Paid';
    fee.paymentDate = new Date();
    fee.remarks = `${fee.remarks || ''} [Waived by admin]`.trim();
    await fee.save();

    return NextResponse.json({ message: 'Fine waived' });
  } catch (error) {
    console.error('Waive fine API error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
