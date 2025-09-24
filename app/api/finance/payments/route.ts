import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import FeesHistory from "@/models/FeesHistory";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { studentId, feeId, amount, paymentDate } = await req.json();

    if (!studentId || !feeId || typeof amount !== 'number' || !paymentDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const fee = await FeesHistory.findById(feeId);
    if (!fee) {
      return NextResponse.json({ error: "Fee record not found" }, { status: 404 });
    }
    if (String(fee.studentId) !== String(studentId)) {
      return NextResponse.json({ error: "Fee does not belong to the specified student" }, { status: 400 });
    }
    if (fee.status === 'Paid') {
      return NextResponse.json({ error: "Fee is already marked as paid" }, { status: 400 });
    }

    const amt = Number(amount);

    if (amt >= fee.amount) {
      fee.status = 'Paid';
      fee.paymentDate = new Date(paymentDate);
      await fee.save();
    } else if (amt > 0) {
      // Partial payment: close current fee as paid for the paid amount and create a new pending for remainder
      const remaining = fee.amount - amt;
      // Mark current as paid with original amount (for simple accounting)
      fee.status = 'Paid';
      fee.paymentDate = new Date(paymentDate);
      await fee.save();
      // Create new pending fee for the remainder
      const remainder = new FeesHistory({
        studentId: fee.studentId,
        feeType: fee.feeType,
        amount: remaining,
        status: 'Pending',
        dueDate: fee.dueDate,
        remarks: `Auto-created remainder of partial payment against ${fee._id}`,
      });
      await remainder.save();
    } else {
      return NextResponse.json({ error: "Amount must be greater than 0" }, { status: 400 });
    }

    return NextResponse.json({ message: 'Payment recorded' });
  } catch (error) {
    console.error('Payments API error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
