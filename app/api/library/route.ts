import {connectDB} from "@/lib/mongo";
import Library from "@/models/LibraryTransaction";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();
  const { studentId, bookCode } = await req.json();
  const issue = await Library.create({ studentId, bookCode });
  return NextResponse.json(issue);
}

export async function GET(req: NextRequest) {
  await connectDB();
  const issues = await Library.find().populate("studentId");
  return NextResponse.json(issues);
}
