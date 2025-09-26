import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Student from "@/models/Student";
import FeesHistory from "@/models/FeesHistory";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || 'pending';
    const feeType = searchParams.get('feeType') || '';
    const search = searchParams.get('search') || '';
    const department = searchParams.get('department') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const sortBy = searchParams.get('sortBy') || 'dueDate';
    const order = searchParams.get('order') || 'asc';

    // Build query
    let query: any = {};
    
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { rollNumber: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (department) {
      query.department = department;
    }

    const students = await Student.find(query)
      .select('firstName lastName rollNumber email department year phone')
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    // Get fee information for each student
    const studentsWithFees = await Promise.all(
      students.map(async (student: any) => {
        const fees = await FeesHistory.find({ studentId: student._id })
          .sort({ dueDate: order === 'asc' ? 1 : -1 })
          .lean<Array<{ amount: number; status: 'Paid' | 'Pending' | 'Overdue'; dueDate: Date; feeType: string }>>();

        const totalFees = fees.reduce((sum: number, fee) => sum + fee.amount, 0);
        const paidAmount = fees
          .filter((fee) => fee.status === 'Paid')
          .reduce((sum: number, fee) => sum + fee.amount, 0);
        const pendingAmount = totalFees - paidAmount;
        
        const pendingFees = fees.filter((fee) => fee.status !== 'Paid');
        const hasOverdue = pendingFees.some((fee) => new Date(fee.dueDate) < new Date());

        return {
          _id: student._id,
          name: `${student.firstName} ${student.lastName || ''}`.trim(),
          rollNumber: student.rollNumber,
          email: student.email,
          department: student.department,
          year: student.year,
          totalFees,
          paidAmount,
          pendingAmount,
          status: pendingAmount === 0 ? 'paid' : hasOverdue ? 'overdue' : 'pending',
          dueDate: pendingFees.length > 0 ? pendingFees[0].dueDate : null,
          feeType: pendingFees.length > 0 ? pendingFees[0].feeType : '',
          fines: fees.filter((fee) => fee.feeType === 'Fine').reduce((sum: number, fee) => sum + fee.amount, 0),
          fees // Include all fees for details
        };
      })
    );

    // Apply status filter
    const filteredStudents = studentsWithFees.filter(student => {
      if (status === 'pending') return student.pendingAmount > 0;
      if (status === 'paid') return student.pendingAmount === 0;
      return true;
    });

    const total = await Student.countDocuments(query);

    return NextResponse.json({
      students: filteredStudents,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Finance students API error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}