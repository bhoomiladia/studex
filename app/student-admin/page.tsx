"use client";
import { useEffect, useState, useCallback } from "react";
import { Search, Filter, ChevronUp, ChevronDown, Eye, CheckCircle, XCircle, Loader2, User, Book, Home, DollarSign } from "lucide-react";

export default function StudentAdminDashboard() {
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [filters, setFilters] = useState({ status: "", department: "", year: "", name: "" });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState("firstName");
  const [order, setOrder] = useState("asc");
  const [loading, setLoading] = useState(false);

  const limit = 10;

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        ...filters,
        status: filters.status === "" ? "" : filters.status === "true" ? "true" : "false",
        page: String(page),
        limit: String(limit),
        sortBy,
        order,
      }).toString();

      const res = await fetch(`/api/student-admin?${query}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data?.error || "Failed to fetch students");

      setStudents(data.students || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error(err);
      setStudents([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [filters, page, sortBy, order]);

  const handleApproveReject = async (id: string, action: "approve" | "reject") => {
    const confirm1 = confirm(`Are you sure you want to ${action} this student?`);
    if (!confirm1) return;
    const confirm2 = confirm(`This action cannot be undone. Proceed to ${action}?`);
    if (!confirm2) return;

    setLoading(true);
    try {
      const res = await fetch('/api/student-admin', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: id, action })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Action failed');
      await fetchStudents();
    } catch (err) {
      console.error(err);
      alert('Failed to perform action');
    } finally {
      setLoading(false);
    }
  };

  const viewDetails = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/student-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: id })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to load details');
      setSelectedStudent(data);
    } catch (err) {
      console.error(err);
      alert('Failed to load details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedStudent(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const StatusBadge = ({ status }: { status: boolean }) => (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
      status ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
    }`}>
      {status ? (
        <>
          <CheckCircle className="w-4 h-4 mr-1" />
          Approved
        </>
      ) : (
        <>
          <Loader2 className="w-4 h-4 mr-1 animate-spin" />
          Pending
        </>
      )}
    </span>
  );

  const DepartmentBadge = ({ department }: { department: string }) => {
    const colors = {
      CSE: "bg-blue-100 text-blue-800",
      ECE: "bg-purple-100 text-purple-800",
      MECH: "bg-orange-100 text-orange-800"
    };
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colors[department as keyof typeof colors] || "bg-gray-100 text-gray-800"}`}>
        {department}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              Student Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2">Manage student applications and profiles</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="text-2xl font-bold text-blue-600">{total}</div>
            <div className="text-sm text-gray-500">Total Students</div>
          </div>
        </div>

        {/* Filters Card */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filters & Search</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => setFilters({ ...filters, name: e.target.value })}
              />
            </div>
            
            <select 
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="true">Approved</option>
              <option value="false">Pending</option>
            </select>
            
            <select 
              onChange={(e) => setFilters({ ...filters, department: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Departments</option>
              <option value="CSE">Computer Science</option>
              <option value="ECE">Electronics</option>
              <option value="MECH">Mechanical</option>
            </select>
            
            <select 
              onChange={(e) => setFilters({ ...filters, year: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Years</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
            
            <select 
              onChange={(e) => setOrder(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        {/* Students Table Card */}
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{`${student.firstName || ''} ${student.lastName || ''}`.trim() || '—'}</div>
                        <div className="text-sm text-gray-500">{student.rollNumber || "—"}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <DepartmentBadge department={student.department} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Year {student.year}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={student.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {!student.status && (
                        <>
                          <button 
                            onClick={() => handleApproveReject(student._id, "approve")}
                            className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </button>
                          <button 
                            onClick={() => handleApproveReject(student._id, "reject")}
                            className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </button>
                        </>
                      )}
                      <button 
                        onClick={() => viewDetails(student._id)}
                        className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-gray-50 px-6 py-4 border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{(page - 1) * limit + 1}</span> to{" "}
                <span className="font-medium">{Math.min(page * limit, total)}</span> of{" "}
                <span className="font-medium">{total}</span> students
              </div>
              <div className="flex space-x-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronUp className="w-4 h-4 mr-1 transform -rotate-90" />
                  Previous
                </button>
                <button
                  disabled={page * limit >= total}
                  onClick={() => setPage(page + 1)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronDown className="w-4 h-4 ml-1 transform -rotate-90" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
            <div className="text-lg font-medium text-gray-900">Loading...</div>
          </div>
        </div>
      )}

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedStudent(null)}>
          <div 
            className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedStudent.student.name}</h2>
                  <p className="text-blue-100">{selectedStudent.student.rollNumber || "—"} • {selectedStudent.student.department}</p>
                </div>
                <button 
                  onClick={() => setSelectedStudent(null)}
                  className="text-white hover:text-blue-200 transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Student Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Email</label>
                      <p className="font-medium">{selectedStudent.student.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Year</label>
                      <p className="font-medium">Year {selectedStudent.student.year}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Status</label>
                      <StatusBadge status={selectedStudent.student.status} />
                    </div>
                  </div>
                </div>

                {/* Hostel Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Home className="w-5 h-5 text-green-600" />
                    Hostel Information
                  </h3>
                  {selectedStudent.hostel ? (
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="font-medium">{selectedStudent.hostel.hostelName}</p>
                      <p className="text-green-600">Room {selectedStudent.hostel.roomNumber}</p>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-4 text-gray-500">
                      No hostel allocated
                    </div>
                  )}
                </div>

                {/* Books Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Book className="w-5 h-5 text-purple-600" />
                    Book History
                  </h3>
                  <div className="space-y-2">
                    {selectedStudent.books.length > 0 ? (
                      selectedStudent.books.map((book: any) => (
                        <div key={book._id} className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
                          <span className="font-medium">{book.bookTitle}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            book.status === 'Issued' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {book.status}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-500 text-center py-4">No books issued</div>
                    )}
                  </div>
                </div>

                {/* Fees History */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-orange-600" />
                    Fees History
                  </h3>
                  <div className="space-y-2">
                    {selectedStudent.FeesHistorys.length > 0 ? (
                      selectedStudent.FeesHistorys.map((fee: any) => (
                        <div key={fee._id} className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
                          <span>₹{fee.amount.toLocaleString()}</span>
                          <span className="text-sm text-gray-600">
                            {new Date(fee.date).toLocaleDateString()}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-500 text-center py-4">No fees history</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t px-6 py-4 bg-gray-50">
              <button 
                onClick={() => setSelectedStudent(null)}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}