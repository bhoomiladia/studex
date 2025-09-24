import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Book from "@/models/Book";
import LibraryTransaction from "@/models/LibraryTransaction";

// GET /api/library/books/[id]
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const book = await Book.findById(params.id).lean();
    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }
    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT /api/library/books/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const data = await req.json();

    // Prevent negative or inconsistent quantities
    if (typeof data.totalQty === "number" && typeof data.availableQty === "number") {
      if (data.availableQty > data.totalQty || data.totalQty < 0 || data.availableQty < 0) {
        return NextResponse.json({ error: "Invalid quantities" }, { status: 400 });
      }
    }

    const updated = await Book.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updated) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE /api/library/books/[id]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    // Prevent deletion if there are active (unreturned) transactions
    const activeIssues = await LibraryTransaction.countDocuments({
      bookCode: params.id,
      returnedAt: { $exists: false },
    });
    if (activeIssues > 0) {
      return NextResponse.json(
        { error: "Cannot delete: There are active transactions for this book" },
        { status: 400 }
      );
    }
    const deleted = await Book.findByIdAndDelete(params.id).lean();
    if (!deleted) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
