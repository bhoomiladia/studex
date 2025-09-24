// @ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import { verifyToken } from "@/lib/auth";
import FeesHistory from "@/models/FeesHistory";

// Student-initiated payment: applies payment amount to oldest pending fees first.
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const token = req.cookies.get("studex_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { valid, payload } = verifyToken(token);
    if (!valid || !payload?.sub) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { amount, method } = await req.json();
    const payAmount = Number(amount);
    if (!payAmount || payAmount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // Get student's pending fees sorted by earliest due date
    const pending = await FeesHistory.find({ studentId: payload.sub, status: { $ne: 'Paid' } })
      .sort({ dueDate: 1 })
      .exec();

    if (pending.length === 0) {
      return NextResponse.json({ message: "No pending fees" });
    }

    let remaining = payAmount;
    const affected: string[] = [];

    for (const fee of pending) {
      if (remaining <= 0) break;
      if (remaining >= fee.amount) {
        // Full settle this fee
        fee.status = 'Paid';
        fee.paymentDate = new Date();
        fee.remarks = `${fee.remarks || ''} [Student payment ${method || 'online'}]`.trim();
        await fee.save();
        affected.push(String(fee._id));
        remaining -= fee.amount;
      } else {
        // Partial: mark this fee paid, create remainder as new pending
        const remainderAmount = fee.amount - remaining;
        fee.status = 'Paid';
        fee.paymentDate = new Date();
        fee.remarks = `${fee.remarks || ''} [Student partial payment ${method || 'online'}]`.trim();
        await fee.save();
        affected.push(String(fee._id));

        const remainder = new FeesHistory({
          studentId: fee.studentId,
          feeType: fee.feeType,
          amount: remainderAmount,
          status: 'Pending',
          dueDate: fee.dueDate,
          remarks: `Auto-created remainder of partial payment against ${fee._id}`,
        });
        await remainder.save();
        remaining = 0;
      }
    }

    return NextResponse.json({
      message: 'Payment processed',
      paidAmount: payAmount - remaining,
      remainingReturn: remaining,
      affectedFees: affected,
    });
  } catch (e) {
    console.error('/api/student/payment error', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
