// app/api/library/transactions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import LibraryTransaction from "@/models/LibraryTransaction";
import Book from "@/models/Book";
import Student from "@/models/Student";

export async function GET() {
  try {
    await connectDB();
    
    const transactions = await LibraryTransaction.find()
      .populate("studentId", "firstName lastName rollNumber email department year")
      .populate("bookCode", "title bookCode author totalQty availableQty")
      .lean();

    // Transform the data properly
    const transformedTransactions = transactions.map(transaction => ({
      _id: transaction._id,
      book: transaction.bookCode ? {
        _id: transaction.bookCode._id,
        title: transaction.bookCode.title,
        bookCode: transaction.bookCode.bookCode,
        author: transaction.bookCode.author
      } : null,
      student: transaction.studentId ? {
        _id: transaction.studentId._id,
        name: `${transaction.studentId.firstName} ${transaction.studentId.lastName || ""}`.trim(),
        rollNumber: transaction.studentId.rollNumber,
        email: transaction.studentId.email,
        department: transaction.studentId.department,
        year: transaction.studentId.year
      } : null,
      issuedAt: transaction.issuedAt,
      dueDate: transaction.dueDate,
      returnedAt: transaction.returnedAt,
      fineAmount: transaction.fineAmount
    }));

    return NextResponse.json(transformedTransactions);
  } catch (error) {
    console.error("Transactions API error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    
    // Check if book is available
    const book = await Book.findById(body.bookCode);
    if (!book || book.availableQty <= 0) {
      return NextResponse.json({ error: "Book not available" }, { status: 400 });
    }

    // Create transaction
    const transaction = new LibraryTransaction(body);
    await transaction.save();

    // Update book quantity
    book.availableQty -= 1;
    await book.save();

    return NextResponse.json(transaction);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// ✅ RETURN BOOK FUNCTION - Same route mein
export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const { transactionId, action } = await req.json();
    
    if (action === 'return') {
      const transaction = await LibraryTransaction.findById(transactionId);
      if (!transaction) {
        return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
      }

      if (transaction.returnedAt) {
        return NextResponse.json({ error: "Book already returned" }, { status: 400 });
      }

      // Update transaction
      transaction.returnedAt = new Date();
      await transaction.save();

      // Update book quantity
      const book = await Book.findById(transaction.bookCode);
      if (book) {
        book.availableQty += 1;
        await book.save();
      }

      return NextResponse.json({ 
        message: "Book returned successfully",
        transaction: transaction 
      });
    }
    
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Return book error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}