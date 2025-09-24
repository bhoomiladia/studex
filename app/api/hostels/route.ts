// @ts-nocheck

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Hostel from "@/models/Hostel";

// Build an aggregate overview grouped by hostelName
async function getHostelOverview() {
  const pipeline = [
    {
      $group: {
        _id: "$hostelName",
        hostelName: { $first: "$hostelName" },
        totalRooms: { $sum: 1 },
        occupied: { $sum: { $subtract: ["$occupancy", "$currentVacancy"] } },
        available: { $sum: "$currentVacancy" },
        anyAC: { $max: { $cond: ["$isAC", 1, 0] } },
        anyNonAC: { $max: { $cond: [{ $not: ["$isAC"] }, 1, 0] } },
        wardenName: { $first: "$wardenName" },
        avgCostPerMonth: { $avg: "$costPerMonth" },
      },
    },
    { $sort: { hostelName: 1 } },
  ];
  const result = await Hostel.aggregate(pipeline);
  return result.map((h: any) => ({
    _id: h._id,
    hostelName: h.hostelName,
    type: h.anyAC && h.anyNonAC ? "Mixed" : h.anyAC ? "AC" : "Non-AC",
    totalRooms: h.totalRooms,
    occupied: h.occupied,
    available: h.available,
    wardenName: h.wardenName || "",
    avgCostPerMonth: Math.round(h.avgCostPerMonth || 0),
  }));
}

// GET
// - If query.rooms=1, return raw room list
// - Else, return hostel overview
export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const roomsFlag = searchParams.get("rooms");

  if (roomsFlag) {
    const rooms = await Hostel.find({}).sort({ hostelName: 1, roomNumber: 1 });
    return NextResponse.json({ rooms });
  }

  const hostels = await getHostelOverview();
  return NextResponse.json({ hostels });
}

// POST
// Create a new room in a hostel
export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const { hostelName, roomNumber, occupancy, isAC, costPerMonth, wardenName } = body || {};

  if (!hostelName || !roomNumber || !occupancy || costPerMonth === undefined) {
    return NextResponse.json({ error: "hostelName, roomNumber, occupancy, costPerMonth are required" }, { status: 400 });
  }

  const exists = await Hostel.findOne({ hostelName, roomNumber });
  if (exists) {
    return NextResponse.json({ error: "Room already exists" }, { status: 409 });
  }

  const doc = await Hostel.create({
    hostelName,
    roomNumber,
    occupancy: Number(occupancy),
    currentVacancy: Number(occupancy),
    wardenName: wardenName || "",
    isAC: !!isAC,
    costPerMonth: Number(costPerMonth),
  });

  return NextResponse.json({ message: "Room created", room: doc });
}

// PATCH
// Update a room's details or vacancy
export async function PATCH(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const { hostelName, roomNumber, updates } = body || {};
  if (!hostelName || !roomNumber || !updates) {
    return NextResponse.json({ error: "hostelName, roomNumber and updates are required" }, { status: 400 });
  }

  const allowed = ["occupancy", "currentVacancy", "wardenName", "isAC", "costPerMonth"];
  const set: any = {};
  for (const k of allowed) {
    if (k in updates) set[k] = updates[k];
  }

  const doc = await Hostel.findOneAndUpdate({ hostelName, roomNumber }, { $set: set }, { new: true });
  if (!doc) return NextResponse.json({ error: "Room not found" }, { status: 404 });
  return NextResponse.json({ message: "Room updated", room: doc });
}

// DELETE
// Delete a room
export async function DELETE(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const hostelName = searchParams.get("hostelName");
  const roomNumber = searchParams.get("roomNumber");
  if (!hostelName || !roomNumber) {
    return NextResponse.json({ error: "hostelName and roomNumber are required" }, { status: 400 });
    }

  const res = await Hostel.deleteOne({ hostelName, roomNumber });
  if (res.deletedCount === 0) {
    return NextResponse.json({ error: "Room not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Room deleted" });
}
