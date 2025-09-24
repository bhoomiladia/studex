import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import Student from "@/models/Student";

function toCSV(rows: any[], headers: string[]): string {
  const escape = (v: any) => {
    const s = v == null ? "" : String(v);
    if (s.includes(",") || s.includes("\n") || s.includes('"')) {
      return '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
  };
  const headerLine = headers.join(",");
  const lines = rows.map((r) => headers.map((h) => escape(r[h])).join(","));
  return [headerLine, ...lines].join("\n");
}

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);

  const filters: any = {};
  if (searchParams.get("status")) {
    filters.status = searchParams.get("status") === "true";
  }
  if (searchParams.get("department")) {
    filters.department = searchParams.get("department");
  }
  if (searchParams.get("year")) {
    filters.year = searchParams.get("year");
  }
  if (searchParams.get("name")) {
    const nameQuery = searchParams.get("name") || "";
    filters.$or = [
      { firstName: { $regex: nameQuery, $options: "i" } },
      { lastName: { $regex: nameQuery, $options: "i" } },
      { email: { $regex: nameQuery, $options: "i" } },
      { rollNumber: { $regex: nameQuery, $options: "i" } },
    ];
  }

  const sortBy = searchParams.get("sortBy") || "firstName";
  const order = searchParams.get("order") === "desc" ? -1 : 1;

  const students = await Student.find(filters).sort({ [sortBy]: order }).lean();

  const headers = [
    "firstName",
    "lastName",
    "email",
    "rollNumber",
    "department",
    "year",
    "status",
  ];

  const rows = students.map((s: any) => ({
    firstName: s.firstName || "",
    lastName: s.lastName || "",
    email: s.email || "",
    rollNumber: s.rollNumber || "",
    department: s.department || "",
    year: s.year ?? "",
    status: s.status ? "Approved" : "Pending",
  }));

  const csv = toCSV(rows, headers);
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=students.csv",
    },
  });
}
