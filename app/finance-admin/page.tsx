"use client";
import { useEffect, useState, useCallback } from "react";
import { Search, Filter, ChevronUp, ChevronDown, Eye, DollarSign, Receipt, CreditCard, AlertCircle, CheckCircle, XCircle, Download, Send, Plus, Users, Building, Book, Loader2 } from "lucide-react";

export default function FinanceAdminDashboard() {
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [filters, setFilters] = useState({ status: "pending", feeType: "", department: "" });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState("dueDate");
  const [order, setOrder] = useState("asc");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("payments");
  const [showFeeModal, setShowFeeModal] = useState(false);
  const [newFee, setNewFee] = useState({ studentId: "", feeType: "", amount: "", dueDate: "", description: "" });

  const limit = 10;

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    const query = new URLSearchParams({
      ...filters,
      page: String(page),
      limit: String(limit),
      sortBy,
      order,
    }).toString();

    // Simulated API call
    setTimeout(() => {
      const mockStudents = Array.from({ length: 10 }, (_, i) => ({
        _id: i.toString(),
        rollNumber: `2023CS${1000 + i}`,
        name: `Student ${i + 1}`,
        department: ["CSE", "ECE", "MECH"][i % 3],
        year: (i % 4) + 1,
        totalFees: 50000,
        paidAmount: i % 3 === 0 ? 50000 : i % 3 === 1 ? 25000 : 0,
        pendingAmount: i % 3 === 0 ? 0 : i % 3 === 1 ? 25000 : 50000,
        status: i % 3 === 0 ? "paid" : i % 3 === 1 ? "partial" : "pending",
        dueDate: new Date(Date.now() + (i % 5) * 86400000).toISOString(),
        feeType: i % 2 === 0 ? "Tuition" : "Hostel",
        fines: i % 4 === 0 ? 500 : 0
      }));
      setStudents(mockStudents);
      setTotal(50);
      setLoading(false);
    }, 1000);
  }, [filters, page, sortBy, order]);

  const fetchFinancialOverview = useCallback(async () => {
    setLoading(true);
    // Simulated API call for financial overview
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleSendReminder = async (studentId: string) => {
    const confirm1 = confirm("Send payment reminder to this student?");
    if (!confirm1) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      fetchStudents();
      setLoading(false);
    }, 500);
  };

  const handleMarkPaid = async (studentId: string, amount: number) => {
    const confirm1 = confirm(`Mark payment of ₹${amount} as received?`);
    if (!confirm1) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      fetchStudents();
      setLoading(false);
    }, 500);
  };

  const handleAddFee = async () => {
    // Validate fee data
    if (!newFee.studentId || !newFee.feeType || !newFee.amount || !newFee.dueDate) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setShowFeeModal(false);
      setNewFee({ studentId: "", feeType: "", amount: "", dueDate: "", description: "" });
      fetchStudents();
      setLoading(false);
    }, 500);
  };

  const handleWaiveFine = async (studentId: string, fineAmount: number) => {
    const confirm1 = confirm(`Waive fine of ₹${fineAmount} for this student?`);
    if (!confirm1) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      fetchStudents();
      setLoading(false);
    }, 500);
  };

  const viewStudentDetails = async (id: string) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSelectedStudent({
        student: {
          _id: id,
          name: "Student Details",
          rollNumber: "2023CS1001",
          email: "student@college.edu",
          department: "CSE",
          year: 2,
          phone: "9876543210"
        },
        paymentHistory: [
          { 
            _id: "1", 
            type: "Tuition Fee", 
            amount: 25000, 
            status: "Paid", 
            date: new Date().toISOString(),
            receiptNo: "RCPT2024001",
            method: "Online Transfer"
          },
          { 
            _id: "2", 
            type: "Hostel Fee", 
            amount: 15000, 
            status: "Pending", 
            date: new Date(Date.now() + 86400000).toISOString(),
            dueDate: new Date(Date.now() + 86400000).toISOString()
          },
          { 
            _id: "3", 
            type: "Library Fine", 
            amount: 500, 
            status: "Pending", 
            date: new Date().toISOString(),
            description: "Late book return"
          }
        ],
        feeStructure: {
          tuitionFee: 50000,
          hostelFee: 30000,
          libraryFee: 5000,
          totalFees: 85000
        },
        issues: [
          { 
            _id: "1", 
            type: "Fee Waiver Request", 
            description: "Requesting fee extension due to financial constraints", 
            status: "Pending", 
            date: new Date().toISOString() 
          }
        ]
      });
      setLoading(false);
    }, 500);
  };

  const downloadReceipt = (payment: any) => {
    // Simulate receipt download
    alert(`Downloading receipt for ${payment.receiptNo}`);
  };

  useEffect(() => {
    if (activeTab === "payments") {
      fetchStudents();
    } else {
      fetchFinancialOverview();
    }
  }, [activeTab, fetchStudents, fetchFinancialOverview]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedStudent(null);
        setShowFeeModal(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const StatusBadge = ({ status }: { status: string }) => {
    const config = {
      paid: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      partial: { color: "bg-yellow-100 text-yellow-800", icon: AlertCircle },
      pending: { color: "bg-red-100 text-red-800", icon: XCircle }
    };
    
    const { color, icon: Icon } = config[status as keyof typeof config] || config.pending;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${color}`}>
        <Icon className="w-4 h-4 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const AmountDisplay = ({ amount, type }: { amount: number; type: "paid" | "pending" | "fine" }) => {
    const colors = {
      paid: "text-green-600",
      pending: "text-red-600",
      fine: "text-orange-600"
    };
    
    return (
      <span className={`font-bold ${colors[type]}`}>
        ₹{amount.toLocaleString()}
      </span>
    );
  };

  const FinancialCard = ({ title, amount, icon: Icon, color, subtitle }: any) => (
    <div className="bg-white rounded-2xl shadow-sm border p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">₹{amount.toLocaleString()}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              Finance Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2">Manage student payments, fees, and financial records</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <div className="text-2xl font-bold text-green-600">₹{(850000).toLocaleString()}</div>
              <div className="text-sm text-gray-500">Total Collected</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <div className="text-2xl font-bold text-red-600">₹{(250000).toLocaleString()}</div>
              <div className="text-sm text-gray-500">Pending Payments</div>
            </div>
          </div>
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <FinancialCard
            title="Total Revenue"
            amount={850000}
            icon={DollarSign}
            color="bg-green-500"
            subtitle="This academic year"
          />
          <FinancialCard
            title="Pending Payments"
            amount={250000}
            icon={AlertCircle}
            color="bg-red-500"
            subtitle="From 45 students"
          />
          <FinancialCard
            title="Hostel Fees"
            amount={300000}
            icon={Building}
            color="bg-blue-500"
            subtitle="Current semester"
          />
          <FinancialCard
            title="Library Fines"
            amount={15000}
            icon={Book}
            color="bg-orange-500"
            subtitle="Outstanding fines"
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border p-2 mb-6">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab("payments")}
              className={`flex-1 py-3 px-4 rounded-lg text-center font-medium transition-all ${
                activeTab === "payments"
                  ? "bg-blue-100 text-blue-700 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <CreditCard className="w-5 h-5 mx-auto mb-1" />
              Payment Management
            </button>
            <button
              onClick={() => setActiveTab("reports")}
              className={`flex-1 py-3 px-4 rounded-lg text-center font-medium transition-all ${
                activeTab === "reports"
                  ? "bg-green-100 text-green-700 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Receipt className="w-5 h-5 mx-auto mb-1" />
              Reports & Analytics
            </button>
            <button
              onClick={() => setActiveTab("issues")}
              className={`flex-1 py-3 px-4 rounded-lg text-center font-medium transition-all ${
                activeTab === "issues"
                  ? "bg-orange-100 text-orange-700 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <AlertCircle className="w-5 h-5 mx-auto mb-1" />
              Fee Issues
            </button>
          </div>
        </div>

        {/* Payment Management Tab */}
        {activeTab === "payments" && (
          <>
            {/* Filters Card */}
            <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Payment Filters</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  <option value="pending">Pending Payments</option>
                  <option value="partial">Partial Payments</option>
                  <option value="paid">Paid</option>
                  <option value="">All Status</option>
                </select>
                
                <select 
                  onChange={(e) => setFilters({ ...filters, feeType: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Fee Types</option>
                  <option value="Tuition">Tuition Fees</option>
                  <option value="Hostel">Hostel Fees</option>
                  <option value="Library">Library Fines</option>
                  <option value="Other">Other Fees</option>
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
              </div>
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee Details</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students.map((student) => (
                      <tr key={student._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.rollNumber} • {student.department}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="space-y-1">
                            <div className="text-sm">
                              Total: <AmountDisplay amount={student.totalFees} type="paid" />
                            </div>
                            <div className="text-sm">
                              Paid: <AmountDisplay amount={student.paidAmount} type="paid" />
                            </div>
                            <div className="text-sm">
                              Pending: <AmountDisplay amount={student.pendingAmount} type="pending" />
                            </div>
                            {student.fines > 0 && (
                              <div className="text-sm">
                                Fines: <AmountDisplay amount={student.fines} type="fine" />
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(student.dueDate).toLocaleDateString()}
                          </div>
                          <div className={`text-xs ${
                            new Date(student.dueDate) < new Date() ? 'text-red-600' : 'text-gray-500'
                          }`}>
                            {new Date(student.dueDate) < new Date() ? 'Overdue' : 'Due'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={student.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          {student.status !== "paid" && (
                            <>
                              <button 
                                onClick={() => handleMarkPaid(student._id, student.pendingAmount)}
                                className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Mark Paid
                              </button>
                              <button 
                                onClick={() => handleSendReminder(student._id)}
                                className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                              >
                                <Send className="w-4 h-4 mr-1" />
                                Reminder
                              </button>
                            </>
                          )}
                          {student.fines > 0 && (
                            <button 
                              onClick={() => handleWaiveFine(student._id, student.fines)}
                              className="inline-flex items-center px-3 py-1.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                            >
                              Waive Fine
                            </button>
                          )}
                          <button 
                            onClick={() => viewStudentDetails(student._id)}
                            className="inline-flex items-center px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
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

            {/* Add Fee Button */}
            <div className="flex justify-end mt-6">
              <button 
                onClick={() => setShowFeeModal(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Fee
              </button>
            </div>
          </>
        )}

        {/* Reports & Analytics Tab */}
        {activeTab === "reports" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4">Fee Collection Trends</h3>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-gray-500">Chart: Monthly Collection Trends</div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4">Department-wise Collection</h3>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-gray-500">Chart: Department Distribution</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">Transaction {i}</div>
                      <div className="text-sm text-gray-600">Student {i} • {["Tuition", "Hostel", "Library"][i % 3]} Fee</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">₹{(10000 + i * 5000).toLocaleString()}</div>
                      <div className="text-sm text-gray-600">{new Date().toLocaleDateString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Fee Issues Tab */}
        {activeTab === "issues" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4">Pending Fee Issues</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">Fee Waiver Request #{i}</div>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pending</span>
                    </div>
                    <p className="text-gray-600 mb-3">Student requesting fee extension due to financial constraints...</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Student {i} • {["CSE", "ECE", "MECH"][i % 3]}</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
                        Approve
                      </button>
                      <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm">
                        Reject
                      </button>
                      <button className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
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
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedStudent.student.name}</h2>
                  <p className="text-blue-100">{selectedStudent.student.rollNumber} • {selectedStudent.student.department}</p>
                </div>
                <button onClick={() => setSelectedStudent(null)} className="text-white hover:text-blue-200">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Student Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Student Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Email</label>
                      <p className="font-medium">{selectedStudent.student.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Phone</label>
                      <p className="font-medium">{selectedStudent.student.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Department</label>
                      <p className="font-medium">{selectedStudent.student.department}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Year</label>
                      <p className="font-medium">Year {selectedStudent.student.year}</p>
                    </div>
                  </div>
                </div>

                {/* Fee Structure */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Fee Structure</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Tuition Fee:</span>
                        <span className="font-medium">₹{selectedStudent.feeStructure.tuitionFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Hostel Fee:</span>
                        <span className="font-medium">₹{selectedStudent.feeStructure.hostelFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Library Fee:</span>
                        <span className="font-medium">₹{selectedStudent.feeStructure.libraryFee.toLocaleString()}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold">
                        <span>Total:</span>
                        <span>₹{selectedStudent.feeStructure.totalFees.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment History */}
                <div className="lg:col-span-2 space-y-4">
                  <h3 className="text-lg font-semibold">Payment History</h3>
                  <div className="space-y-3">
                    {selectedStudent.paymentHistory.map((payment: any) => (
                      <div key={payment._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{payment.type}</div>
                          <div className="text-sm text-gray-600">
                            {payment.receiptNo && `Receipt: ${payment.receiptNo} • `}
                            {payment.method && `${payment.method} • `}
                            {payment.dueDate && `Due: ${new Date(payment.dueDate).toLocaleDateString()}`}
                            {payment.description && ` • ${payment.description}`}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-bold ${
                            payment.status === 'Paid' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            ₹{payment.amount.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">
                            {new Date(payment.date).toLocaleDateString()}
                          </div>
                        </div>
                        {payment.status === 'Paid' && (
                          <button 
                            onClick={() => downloadReceipt(payment)}
                            className="ml-4 inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Receipt
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Fee Modal */}
      {showFeeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowFeeModal(false)}>
          <div 
            className="bg-white rounded-2xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-6 text-white rounded-t-2xl">
              <h2 className="text-xl font-bold">Add New Fee</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student Roll Number</label>
                <input
                  type="text"
                  value={newFee.studentId}
                  onChange={(e) => setNewFee({ ...newFee, studentId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter student roll number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fee Type</label>
                <select
                  value={newFee.feeType}
                  onChange={(e) => setNewFee({ ...newFee, feeType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select fee type</option>
                  <option value="Tuition">Tuition Fee</option>
                  <option value="Hostel">Hostel Fee</option>
                  <option value="Library">Library Fine</option>
                  <option value="Other">Other Fee</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                <input
                  type="number"
                  value={newFee.amount}
                  onChange={(e) => setNewFee({ ...newFee, amount: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  type="date"
                  value={newFee.dueDate}
                  onChange={(e) => setNewFee({ ...newFee, dueDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                <textarea
                  value={newFee.description}
                  onChange={(e) => setNewFee({ ...newFee, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Fee description"
                  rows={3}
                />
              </div>
            </div>
            
            <div className="border-t px-6 py-4 bg-gray-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                onClick={() => setShowFeeModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddFee}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Add Fee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}