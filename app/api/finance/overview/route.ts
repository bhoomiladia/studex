// app/api/finance/overview/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import FeesHistory from "@/models/FeesHistory";
import Student from "@/models/Student";

export async function GET() {
  try {
    await connectDB();
    
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear, 11, 31);

    // Total revenue
    const paidFees = await FeesHistory.find({ 
      status: 'Paid',
      paymentDate: { $gte: startOfYear, $lte: endOfYear }
    });
    const totalRevenue = paidFees.reduce((sum, fee) => sum + fee.amount, 0);

    // Pending payments
    const pendingFees = await FeesHistory.find({ status: 'Pending' });
    const pendingAmount = pendingFees.reduce((sum, fee) => sum + fee.amount, 0);
    const pendingStudents = await Student.distinct('_id', { 
      _id: { $in: pendingFees.map(f => f.studentId) } 
    });

    // Hostel fees
    const hostelFees = paidFees.filter(fee => fee.feeType === 'Hostel');
    const hostelRevenue = hostelFees.reduce((sum, fee) => sum + fee.amount, 0);

    // Library fines
    const fineFees = await FeesHistory.find({ 
      feeType: 'Fine',
      status: 'Pending'
    });
    const outstandingFines = fineFees.reduce((sum, fee) => sum + fee.amount, 0);

    return NextResponse.json({
      totalRevenue,
      pendingAmount,
      pendingStudents,
      hostelRevenue,
      outstandingFines,
      currentYear
    });
  } catch (error) {
    console.error('Finance overview API error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}