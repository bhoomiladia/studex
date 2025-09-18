import {connectDB} from "@/lib/mongo";
import Hostel from "@/models/Hostel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();
  const { studentId, hostelName, roomNumber } = await req.json();
  const allotment = await Hostel.create({ studentId, hostelName, roomNumber });
  return NextResponse.json(allotment);
}

export async function GET(req: NextRequest) {
  await connectDB();
  const allotments = await Hostel.find().populate("studentId");
  return NextResponse.json(allotments);
}
