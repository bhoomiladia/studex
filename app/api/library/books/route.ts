import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Book from "@/models/Book";

export async function GET() {
  try {
    await connectDB();
    const books = await Book.find().lean();
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const book = new Book(body);
    await book.save();
    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}