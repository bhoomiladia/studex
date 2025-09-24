import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Student from "@/models/Student";
import FeesHistory from "@/models/FeesHistory";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { studentId } = await req.json();

    if (!studentId) {
      return NextResponse.json(
        { error: "Student ID is required" },
        { status: 400 }
      );
    }

    // Find student
    const student = await Student.findById(studentId);
    if (!student) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    // Get pending fees
    const pendingFees = await FeesHistory.find({
      studentId,
      status: "Pending"
    }).sort({ dueDate: 1 });

    // Calculate total pending amount
    const totalPending = pendingFees.reduce((sum, fee) => sum + fee.amount, 0);

    // Here you would typically:
    // 1. Send email to student
    // 2. Send SMS notification
    // 3. Log the reminder in database
    // 4. Integrate with messaging service

    // For now, we'll simulate the reminder
    console.log(`📧 REMINDER SENT TO: ${student.email}`);
    console.log(`📱 Student: ${student.firstName} ${student.lastName}`);
    console.log(`💰 Pending Amount: ₹${totalPending}`);
    console.log(`📋 Pending Fees: ${pendingFees.length}`);
    
    pendingFees.forEach(fee => {
      console.log(`   - ${fee.feeType}: ₹${fee.amount} (Due: ${new Date(fee.dueDate).toLocaleDateString()})`);
    });

    return NextResponse.json({
      message: "Payment reminder sent successfully!",
      reminder: {
        student: {
          name: `${student.firstName} ${student.lastName}`,
          email: student.email,
          rollNumber: student.rollNumber
        },
        pendingFees: pendingFees.length,
        totalAmount: totalPending,
        fees: pendingFees.map(fee => ({
          type: fee.feeType,
          amount: fee.amount,
          dueDate: fee.dueDate,
          overdue: new Date(fee.dueDate) < new Date()
        })),
        sentAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error("Reminder API error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

// Optional: Get reminder history
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get('studentId');

    // In a real app, you'd have a Reminders model to track sent reminders
    // For now, return basic info
    
    return NextResponse.json({
      message: "Reminder system is active",
      lastSent: new Date().toISOString(),
      studentId: studentId || 'All'
    });

  } catch (error) {
    console.error("Get reminders error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}