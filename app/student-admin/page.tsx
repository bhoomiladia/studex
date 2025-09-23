"use client";
import { useEffect, useState } from "react";

export default function StudentAdminDashboard() {
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [filters, setFilters] = useState({ status: "", department: "", year: "", name: "" });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");

  const limit = 10;

  const fetchStudents = async () => {
    const query = new URLSearchParams({
      ...filters,
      page: String(page),
      limit: String(limit),
      sortBy,
      order,
    }).toString();

    const res = await fetch(`/api/student-admin?${query}`);
    const data = await res.json();
    setStudents(data.students);
    setTotal(data.total);
  };

  const handleApproveReject = async (id: string, action: "approve" | "reject") => {
    const confirm1 = confirm(`Are you sure you want to ${action} this student?`);
    if (!confirm1) return;
    const confirm2 = confirm(`This action cannot be undone. Proceed to ${action}?`);
    if (!confirm2) return;

    await fetch("/api/student-admin", {
      method: "PATCH",
      body: JSON.stringify({ studentId: id, action }),
    });
    fetchStudents();
  };

  const viewDetails = async (id: string) => {
    const res = await fetch("/api/student-admin", {
      method: "POST",
      body: JSON.stringify({ studentId: id }),
    });
    const data = await res.json();
    setSelectedStudent(data);
  };

  useEffect(() => {
    fetchStudents();
  }, [filters, page, sortBy, order]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">🎓 Student Admin Dashboard</h1>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <input
          type="text"
          placeholder="Search name..."
          className="border p-2"
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        />
        <select onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
          <option value="">All</option>
          <option value="true">Approved</option>
          <option value="false">Pending</option>
        </select>
        <select onChange={(e) => setFilters({ ...filters, department: e.target.value })}>
          <option value="">Department</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="MECH">MECH</option>
        </select>
        <select onChange={(e) => setFilters({ ...filters, year: e.target.value })}>
          <option value="">Year</option>
          <option value="1">1st</option>
          <option value="2">2nd</option>
          <option value="3">3rd</option>
          <option value="4">4th</option>
        </select>
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="department">Sort by Dept</option>
          <option value="year">Sort by Year</option>
          <option value="rollNumber">Sort by Roll No</option>
        </select>
        <select onChange={(e) => setOrder(e.target.value)}>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>

      {/* Student List */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Roll No</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Department</th>
            <th className="p-2 border">Year</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td className="p-2 border">{s.rollNumber || "—"}</td>
              <td className="p-2 border">{s.name}</td>
              <td className="p-2 border">{s.department}</td>
              <td className="p-2 border">{s.year}</td>
              <td className="p-2 border">{s.status ? "✅ Approved" : "⏳ Pending"}</td>
              <td className="p-2 border space-x-2">
                {!s.status && (
                  <>
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => handleApproveReject(s._id, "approve")}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleApproveReject(s._id, "reject")}
                    >
                      Reject
                    </button>
                  </>
                )}
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => viewDetails(s._id)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={page === 1}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <span>
          Page {page} of {Math.ceil(total / limit)}
        </span>
        <button
          disabled={page * limit >= total}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-2/3 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-3">
              {selectedStudent.student.name} ({selectedStudent.student.rollNumber || "—"})
            </h2>
            <p><b>Email:</b> {selectedStudent.student.email}</p>
            <p><b>Department:</b> {selectedStudent.student.department}</p>
            <p><b>Year:</b> {selectedStudent.student.year}</p>
            <p><b>Status:</b> {selectedStudent.student.status ? "Approved" : "Pending"}</p>

            <h3 className="mt-4 font-bold">🏨 Hostel</h3>
            {selectedStudent.hostel ? (
              <p>{selectedStudent.hostel.hostelName}, Room {selectedStudent.hostel.roomNumber}</p>
            ) : (
              <p>No hostel allocated</p>
            )}

            <h3 className="mt-4 font-bold">📚 Books</h3>
            <ul>
              {selectedStudent.books.map((b: any) => (
                <li key={b._id}>{b.bookTitle} - {b.status}</li>
              ))}
            </ul>

            <h3 className="mt-4 font-bold">💰 FeesHistorys</h3>
            <ul>
              {selectedStudent.FeesHistorys.map((p: any) => (
                <li key={p._id}>{p.amount} on {new Date(p.date).toLocaleDateString()}</li>
              ))}
            </ul>

            <button
              className="mt-4 bg-gray-600 text-white px-4 py-2 rounded"
              onClick={() => setSelectedStudent(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
