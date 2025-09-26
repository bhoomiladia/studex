import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Student from "@/models/Student";
import FeesHistory from "@/models/FeesHistory";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const student = await Student.findById(id)
      .select('firstName lastName email phone department year rollNumber')
      .lean<
        | {
            firstName?: string
            lastName?: string
            email: string
            phone?: string
            department?: string
            year?: number
            rollNumber: string
          }
        | null
      >();
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    const fees = await FeesHistory.find({ studentId: id })
      .sort({ createdAt: -1 })
      .lean();

    const feeStructure = {
      tuitionFee: fees.filter(f => f.feeType === 'Tuition').reduce((sum, f) => sum + f.amount, 0),
      hostelFee: fees.filter(f => f.feeType === 'Hostel').reduce((sum, f) => sum + f.amount, 0),
      libraryFee: fees.filter(f => f.feeType === 'Fine').reduce((sum, f) => sum + f.amount, 0),
    } as any;
    feeStructure.totalFees = feeStructure.tuitionFee + feeStructure.hostelFee + feeStructure.libraryFee;

    const paymentHistory = fees.map(f => ({
      _id: String(f._id),
      type: f.feeType,
      amount: f.amount,
      status: f.status,
      date: f.paymentDate || f.createdAt,
      dueDate: f.dueDate,
      method: undefined,
      receiptNo: undefined,
      description: f.remarks,
    }));

    return NextResponse.json({
      student: {
        name: `${student.firstName} ${student.lastName || ''}`.trim(),
        rollNumber: student.rollNumber,
        email: student.email,
        phone: student.phone,
        department: student.department,
        year: student.year,
      },
      feeStructure,
      paymentHistory,
    });
  } catch (error) {
    console.error('Finance student detail API error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
