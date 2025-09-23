import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Student from "@/models/Student";
import Hostel from "@/models/Hostel";

// GET: list students for hostel admin with filters
export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const sortBy = searchParams.get("sortBy") || "firstName";
  const order = searchParams.get("order") === "desc" ? -1 : 1;

  const filters: any = { status: true, hostel: true }; // only approved students who opted hostel

  // status: unalloted => no hostelName set; alloted => hostelName set
  const hostelStatus = searchParams.get("status") || "";
  if (hostelStatus === "unalloted") {
    filters.$or = [{ hostelName: { $exists: false } }, { hostelName: null }];
  } else if (hostelStatus === "alloted") {
    filters.hostelName = { $ne: null };
  }

  const gender = searchParams.get("gender");
  if (gender) filters.gender = gender;

  const roomType = searchParams.get("roomType");
  if (roomType) filters.roomPreference = roomType;

  const nameQuery = searchParams.get("name");
  if (nameQuery) {
    filters.$or = [
      { firstName: { $regex: nameQuery, $options: "i" } },
      { lastName: { $regex: nameQuery, $options: "i" } },
      { rollNumber: { $regex: nameQuery, $options: "i" } },
      { email: { $regex: nameQuery, $options: "i" } },
    ];
  }

  const students = await Student.find(filters)
    .sort({ [sortBy]: order })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate({ path: 'hostelName', model: Hostel });

  const total = await Student.countDocuments(filters);

  // Map to a simple structure expected by the frontend
  const mapped = students.map((s: any) => ({
    _id: s._id,
    firstName: s.firstName,
    lastName: s.lastName,
    rollNumber: s.rollNumber,
    department: s.department,
    year: s.year,
    gender: s.gender,
    roomPreference: s.roomPreference,
    messPreference: s.messPreference,
    status: s.hostelName ? 'alloted' : 'unalloted',
    hostel: s.hostelName ? {
      hostelName: s.hostelName?.hostelName || '',
      roomNumber: s.roomNumber || '',
      roomType: s.roomPreference || '',
    } : null,
  }));

  return NextResponse.json({ students: mapped, total, page, limit });
}

// PATCH: allot, change, vacate room
export async function PATCH(req: NextRequest) {
  await connectDB();
  const { studentId, action, hostelName, roomNumber, roomType, occupancy, costPerMonth } = await req.json();

  const student: any = await Student.findById(studentId);
  if (!student) return NextResponse.json({ error: 'Student not found' }, { status: 404 });
  if (!student.status || !student.hostel) {
    return NextResponse.json({ error: 'Student is not approved for hostel' }, { status: 400 });
  }

  if (action === 'allot' || action === 'change') {
    if (!hostelName || !roomNumber) {
      return NextResponse.json({ error: 'hostelName and roomNumber are required' }, { status: 400 });
    }

    // Find or create the Hostel room doc
    let hostelDoc = await Hostel.findOne({ hostelName, roomNumber });
    if (!hostelDoc) {
      // create with minimal required fields
      hostelDoc = await Hostel.create({
        hostelName,
        roomNumber,
        occupancy: occupancy ?? 1,
        currentVacancy: occupancy ?? 1,
        wardenName: '',
        isAC: (roomType || '').toLowerCase() === 'ac',
        costPerMonth: costPerMonth ?? 0,
      });
    }

    // If changing from an existing room, increment old room vacancy
    if (action === 'change' && student.hostelName) {
      const oldHostel = await Hostel.findById(student.hostelName);
      if (oldHostel) {
        oldHostel.currentVacancy = Math.min((oldHostel.currentVacancy || 0) + 1, oldHostel.occupancy);
        await oldHostel.save();
      }
    }

    // Decrement new room vacancy if available
    if ((hostelDoc.currentVacancy ?? 0) <= 0) {
      return NextResponse.json({ error: 'Selected room is full' }, { status: 400 });
    }
    hostelDoc.currentVacancy = Math.max((hostelDoc.currentVacancy || 0) - 1, 0);
    await hostelDoc.save();

    student.hostelName = hostelDoc._id; // linking by ObjectId per schema
    student.roomNumber = roomNumber;
    if (roomType) student.roomPreference = roomType;
    await student.save();

    return NextResponse.json({ message: action === 'allot' ? 'Hostel allotted' : 'Hostel changed' });
  }

  if (action === 'vacate') {
    // Increment vacancy for the current room
    if (student.hostelName) {
      const curHostel = await Hostel.findById(student.hostelName);
      if (curHostel) {
        curHostel.currentVacancy = Math.min((curHostel.currentVacancy || 0) + 1, curHostel.occupancy);
        await curHostel.save();
      }
    }
    student.hostelName = null;
    student.roomNumber = undefined;
    await student.save();
    return NextResponse.json({ message: 'Hostel vacated' });
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}

// POST: get detailed student + hostel info for hostel admin
export async function POST(req: NextRequest) {
  await connectDB();
  const { studentId } = await req.json();

  const student = await Student.findById(studentId).populate({ path: 'hostelName', model: Hostel });
  if (!student) return NextResponse.json({ error: 'Student not found' }, { status: 404 });

  return NextResponse.json({
    student: {
      _id: student._id,
      firstName: student.firstName,
      lastName: student.lastName,
      rollNumber: student.rollNumber,
      email: student.email,
      department: student.department,
      year: student.year,
      gender: student.gender,
      phone: student.phone,
    },
    hostel: student.hostelName ? {
      hostelName: (student.hostelName as any).hostelName,
      roomNumber: student.roomNumber,
      roomType: student.roomPreference,
      allotmentDate: student.updatedAt,
    } : null,
    issues: [],
  });
}
