// app/api/finance/fees/route.ts - Corrected version
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import FeesHistory from "@/models/FeesHistory";
import Student from "@/models/Student";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    // Validate required fields
    const { studentId, feeType, amount, dueDate, description } = body;
    
    if (!studentId || !feeType || !amount || !dueDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ FIX: Proper student search without _id in $or for non-ObjectId values
    let student;
    
    // Check if studentId is a valid ObjectId (24 character hex)
    if (/^[0-9a-fA-F]{24}$/.test(studentId)) {
      student = await Student.findById(studentId);
    } else {
      // Agar ObjectId nahi hai, toh ONLY roll number ya email se search karo
      // ❌ _id ko hata do from $or agar value ObjectId format mein nahi hai
      student = await Student.findOne({
        $or: [
          { rollNumber: studentId },
          { email: studentId }
          // _id ko hata do yahan se
        ]
      });
    }

    if (!student) {
      return NextResponse.json(
        { error: `Student not found with ID: ${studentId}. Please check roll number or email.` },
        { status: 404 }
      );
    }

    console.log("Found student:", {
      id: student._id,
      name: `${student.firstName} ${student.lastName}`,
      rollNumber: student.rollNumber
    });

    // Create new fee record with actual student ID
    const fee = new FeesHistory({
      studentId: student._id, // ✅ Use the actual ObjectId
      feeType,
      amount: parseFloat(amount),
      dueDate: new Date(dueDate),
      remarks: description || "",
      status: "Pending"
    });

    await fee.save();

    // Populate for response
    const savedFee = await FeesHistory.findById(fee._id)
      .populate('studentId', 'firstName lastName rollNumber email');

    return NextResponse.json({
      message: "Fee added successfully",
      fee: {
        _id: savedFee._id,
        studentName: `${savedFee.studentId.firstName} ${savedFee.studentId.lastName || ''}`.trim(),
        rollNumber: savedFee.studentId.rollNumber,
        feeType: savedFee.feeType,
        amount: savedFee.amount,
        dueDate: savedFee.dueDate,
        status: savedFee.status
      }
    });

  } catch (error) {
    console.error("Add fee API error:", error);
    
    // Better error response
    if (error.name === 'CastError') {
      return NextResponse.json(
        { error: "Invalid student ID format" },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
// Get all fees (optional - for listing)
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const studentId = searchParams.get('studentId');

    let query: any = {};
    if (studentId) {
      query.studentId = studentId;
    }

    const fees = await FeesHistory.find(query)
      .populate('studentId', 'firstName lastName rollNumber email department')
      .sort({ dueDate: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await FeesHistory.countDocuments(query);

    return NextResponse.json({
      fees,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });

  } catch (error) {
    console.error("Get fees API error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}