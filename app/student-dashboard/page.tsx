  "use client";
  import { useEffect, useState, useCallback } from "react";
  import { DollarSign, Eye, AlertCircle, Download, CreditCard, Receipt, User, Home, Book, Calendar, CheckCircle, XCircle, Send, Plus, Loader2 } from "lucide-react";

  export default function StudentDashboard() {
    const [studentData, setStudentData] = useState<any>(null);
    const [activeTab, setActiveTab] = useState("overview");
    const [loading, setLoading] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showIssueModal, setShowIssueModal] = useState(false);
    const [paymentAmount, setPaymentAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("online");
    const [issueData, setIssueData] = useState({ type: "", description: "" });

    // Real API call to fetch student data
    const fetchStudentData = useCallback(async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/student/dashboard', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          console.log("📊 API Response:", data); // Debug log
          
          // Transform API data to match frontend structure
          const transformedData = transformApiData(data);
          setStudentData(transformedData);
        } else {
          console.error('Failed to fetch student data');
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        setLoading(false);
      }
    }, []);

    // Transform API data to match your frontend structure
    const transformApiData = (apiData: any) => {
      const { student, hostel, books, fees } = apiData;
      
      // Calculate financial info from fees history
      const totalFees = 85000; // You can make this dynamic
      const paidAmount = fees?.reduce((sum: number, fee: any) => sum + (fee.amount || 0), 0) || 0;
      const pendingAmount = totalFees - paidAmount;

      return {
        personalInfo: {
          name: `${student.firstName} ${student.lastName || ""}`.trim(),
          rollNumber: student.rollNumber,
          email: student.email,
          department: student.department,
          year: student.year,
          status: student.status ? "Active" : "Inactive"
        },
        academicInfo: {
          course: student.department, // Adjust based on your data
          semester: `${student.year || 1} Year`,
          cgpa: 0, // You can calculate this
          attendance: 85 // You can calculate this
        },
        hostelInfo: hostel ? {
          allocated: true,
          hostelName: hostel.name || "Not assigned",
          roomNumber: student.roomNumber,
          roomType: student.roomPreference,
          messPreference: student.messPreference,
          warden: hostel.wardenName || "Dr. Sharma",
          wardenContact: hostel.wardenContact || "Not available"
        } : { allocated: false },
        financialInfo: {
          totalFees: totalFees,
          paidAmount: paidAmount,
          pendingAmount: pendingAmount,
          dueDate: new Date(Date.now() + 15 * 86400000).toISOString(),
          feeBreakup: [
            { type: "Tuition Fee", amount: 50000, paid: Math.min(30000, paidAmount), pending: Math.max(0, 50000 - paidAmount) },
            { type: "Hostel Fee", amount: 30000, paid: Math.min(20000, paidAmount - 30000), pending: Math.max(0, 30000 - (paidAmount - 30000)) },
            { type: "Library Fee", amount: 5000, paid: Math.min(5000, paidAmount - 60000), pending: Math.max(0, 5000 - (paidAmount - 60000)) }
          ],
          paymentHistory: fees?.map((fee: any, index: number) => ({
            id: fee._id || index.toString(),
            type: fee.type || "Fee Payment",
            amount: fee.amount,
            date: fee.createdAt || fee.date || new Date().toISOString(),
            status: "Paid",
            receiptNo: fee.receiptNumber || `RCPT${index + 1}`
          })) || [],
          fines: [] // You can add fines data
        },
        libraryInfo: {
          booksIssued: books?.filter((book: any) => book.status === "issued").map((book: any) => ({
            id: book._id,
            title: book.bookTitle || "Unknown Book",
            author: book.author || "Unknown Author",
            issueDate: book.issueDate,
            dueDate: book.dueDate
          })) || [],
          history: books?.filter((book: any) => book.status === "returned").map((book: any) => ({
            id: book._id,
            title: book.bookTitle || "Unknown Book",
            returnDate: book.returnDate,
            status: "Returned"
          })) || []
        },
        issues: [] // You can add issues data later
      };
    };

    useEffect(() => {
      fetchStudentData();
    }, [fetchStudentData]);

    // Rest of your functions remain the same
    const handlePayment = async () => {
      if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
        alert("Please enter a valid payment amount");
        return;
      }

      setLoading(true);
      try {
        const response = await fetch('/api/student/payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: parseFloat(paymentAmount), method: paymentMethod })
        });

        if (response.ok) {
          alert(`Payment of ₹${paymentAmount} processed successfully!`);
          setShowPaymentModal(false);
          setPaymentAmount("");
          fetchStudentData(); // Refresh data
        } else {
          alert('Payment failed. Please try again.');
        }
      } catch (error) {
        alert('Payment failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };


    const handleIssueSubmit = async () => {
      if (!issueData.type || !issueData.description) {
        alert("Please fill all required fields");
        return;
      }

      setLoading(true);
      // Simulate issue submission
      setTimeout(() => {
        alert("Issue submitted successfully! We'll get back to you soon.");
        setShowIssueModal(false);
        setIssueData({ type: "", description: "" });
        fetchStudentData(); // Refresh data
        setLoading(false);
      }, 1000);
    };

    const downloadReceipt = (receiptNo: string) => {
      // Simulate receipt download
      alert(`Downloading receipt ${receiptNo}`);
    };

    const StatusBadge = ({ status }: { status: string }) => (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
        status === "Paid" || status === "Resolved" ? "bg-green-100 text-green-800" :
        status === "Pending" ? "bg-yellow-100 text-yellow-800" :
        "bg-red-100 text-red-800"
      }`}>
        {status === "Paid" || status === "Resolved" ? <CheckCircle className="w-3 h-3 mr-1" /> :
        status === "Pending" ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> :
        <XCircle className="w-3 h-3 mr-1" />}
        {status}
      </span>
    );

    if (loading && !studentData) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
            <div className="text-lg font-medium text-gray-900">Loading your dashboard...</div>
          </div>
        </div>
      );
    }

    if (!studentData) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  Welcome back, {studentData.personalInfo.name}!
                </h1>
                <p className="text-gray-600 mt-2">{studentData.personalInfo.rollNumber} • {studentData.personalInfo.department}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-red-600">
                  ₹{studentData.financialInfo.pendingAmount.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">Pending Fees</div>
                <div className="text-xs text-gray-400">
                  Due: {new Date(studentData.financialInfo.dueDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Fees</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">₹{studentData.financialInfo.totalFees.toLocaleString()}</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Paid Amount</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">₹{studentData.financialInfo.paidAmount.toLocaleString()}</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Books Issued</p>
                  <p className="text-2xl font-bold text-purple-600 mt-1">{studentData.libraryInfo.booksIssued.length}</p>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Book className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Issues</p>
                  <p className="text-2xl font-bold text-orange-600 mt-1">
                    {studentData.issues.filter((issue: any) => issue.status === "Pending").length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-sm border p-2 mb-6">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab("overview")}
                className={`flex-1 py-3 px-4 rounded-lg text-center font-medium transition-all ${
                  activeTab === "overview"
                    ? "bg-blue-100 text-blue-700 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Eye className="w-5 h-5 mx-auto mb-1" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab("fees")}
                className={`flex-1 py-3 px-4 rounded-lg text-center font-medium transition-all ${
                  activeTab === "fees"
                    ? "bg-green-100 text-green-700 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <DollarSign className="w-5 h-5 mx-auto mb-1" />
                Fee Payment
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
                Raise Issue
              </button>
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Full Name</label>
                    <p className="font-medium">{studentData.personalInfo.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Roll Number</label>
                    <p className="font-medium">{studentData.personalInfo.rollNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Email</label>
                    <p className="font-medium">{studentData.personalInfo.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Phone</label>
                    <p className="font-medium">{studentData.personalInfo.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Department</label>
                    <p className="font-medium">{studentData.personalInfo.department}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Year</label>
                    <p className="font-medium">Year {studentData.personalInfo.year}</p>
                  </div>
                </div>
              </div>

              {/* Hostel Information */}
              {studentData.hostelInfo.allocated && (
                <div className="bg-white rounded-2xl shadow-sm border p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Home className="w-5 h-5 text-green-600" />
                    Hostel Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Hostel Name</label>
                      <p className="font-medium">{studentData.hostelInfo.hostelName}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Room Number</label>
                      <p className="font-medium">{studentData.hostelInfo.roomNumber}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Room Type</label>
                      <p className="font-medium">{studentData.hostelInfo.roomType}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Mess Preference</label>
                      <p className="font-medium">{studentData.hostelInfo.messPreference}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Warden</label>
                      <p className="font-medium">{studentData.hostelInfo.warden}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Warden Contact</label>
                      <p className="font-medium">{studentData.hostelInfo.wardenContact}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Academic Information */}
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Book className="w-5 h-5 text-purple-600" />
                  Academic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Course</label>
                    <p className="font-medium">{studentData.academicInfo.course}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Semester</label>
                    <p className="font-medium">{studentData.academicInfo.semester}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">CGPA</label>
                    <p className="font-medium">{studentData.academicInfo.cgpa}</p>
                  </div>
                  <div className="md:col-span-3">
                    <label className="text-sm text-gray-600">Attendance</label>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${studentData.academicInfo.attendance}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{studentData.academicInfo.attendance}% Overall Attendance</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Fee Payment Tab */}
          {activeTab === "fees" && (
            <div className="space-y-6">
              {/* Fee Summary */}
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Fee Summary
                </h3>
                <div className="space-y-4">
                  {studentData.financialInfo.feeBreakup.map((fee: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{fee.type}</div>
                        <div className="text-sm text-gray-600">
                          Total: ₹{fee.amount.toLocaleString()} • Paid: ₹{fee.paid.toLocaleString()} • Pending: ₹{fee.pending.toLocaleString()}
                        </div>
                      </div>
                      <div className={`text-lg font-bold ${
                        fee.pending === 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        ₹{fee.pending.toLocaleString()}
                      </div>
                    </div>
                  ))}
                  <div className="border-t pt-4 flex justify-between items-center font-bold text-lg">
                    <span>Total Pending:</span>
                    <span className="text-red-600">₹{studentData.financialInfo.pendingAmount.toLocaleString()}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Due Date: {new Date(studentData.financialInfo.dueDate).toLocaleDateString()}
                  </div>
                  <button 
                    onClick={() => setShowPaymentModal(true)}
                    className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                    disabled={studentData.financialInfo.pendingAmount === 0}
                  >
                    {studentData.financialInfo.pendingAmount === 0 ? 'All Fees Paid' : 'Pay Now'}
                  </button>
                </div>
              </div>

              {/* Payment History */}
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-blue-600" />
                  Payment History
                </h3>
                <div className="space-y-3">
                  {studentData.financialInfo.paymentHistory.map((payment: any) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{payment.type}</div>
                        <div className="text-sm text-gray-600">
                          {new Date(payment.date).toLocaleDateString()} • {payment.receiptNo}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">₹{payment.amount.toLocaleString()}</div>
                        <StatusBadge status={payment.status} />
                      </div>
                      <button 
                        onClick={() => downloadReceipt(payment.receiptNo)}
                        className="ml-4 inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Receipt
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fines */}
              {studentData.financialInfo.fines.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-orange-600">
                    <AlertCircle className="w-5 h-5" />
                    Outstanding Fines
                  </h3>
                  <div className="space-y-3">
                    {studentData.financialInfo.fines.map((fine: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <div>
                          <div className="font-medium">{fine.type}</div>
                          <div className="text-sm text-orange-700">{fine.reason}</div>
                          <div className="text-xs text-orange-600">
                            {new Date(fine.date).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-orange-600">₹{fine.amount.toLocaleString()}</div>
                          <button className="text-sm text-orange-600 hover:text-orange-700">
                            Pay Fine
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Raise Issue Tab */}
          {activeTab === "issues" && (
            <div className="space-y-6">
              {/* Raise New Issue */}
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-orange-600" />
                  Raise New Issue
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Issue Type</label>
                    <select 
                      value={issueData.type}
                      onChange={(e) => setIssueData({ ...issueData, type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Select issue type</option>
                      <option value="Fee Related">Fee Related</option>
                      <option value="Hostel Maintenance">Hostel Maintenance</option>
                      <option value="Academic">Academic</option>
                      <option value="Library">Library</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea 
                      value={issueData.description}
                      onChange={(e) => setIssueData({ ...issueData, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      rows={4}
                      placeholder="Please describe your issue in detail..."
                    />
                  </div>
                  <button 
                    onClick={handleIssueSubmit}
                    className="w-full py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
                    disabled={!issueData.type || !issueData.description}
                  >
                    <Send className="w-5 h-5 inline mr-2" />
                    Submit Issue
                  </button>
                </div>
              </div>

              {/* Previous Issues */}
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  Previous Issues
                </h3>
                <div className="space-y-4">
                  {studentData.issues.map((issue: any) => (
                    <div key={issue.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{issue.type}</div>
                        <StatusBadge status={issue.status} />
                      </div>
                      <p className="text-gray-600 mb-2">{issue.description}</p>
                      <div className="text-sm text-gray-500 flex justify-between">
                        <span>Submitted: {new Date(issue.date).toLocaleDateString()}</span>
                        <span>ID: #{issue.id}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowPaymentModal(false)}>
            <div 
              className="bg-white rounded-2xl w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white rounded-t-2xl">
                <h2 className="text-xl font-bold">Make Payment</h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount to Pay (₹)</label>
                  <input
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="Enter amount"
                    max={studentData.financialInfo.pendingAmount}
                  />
                  <div className="text-sm text-gray-500 mt-1">
                    Maximum: ₹{studentData.financialInfo.pendingAmount.toLocaleString()}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="online">Online Payment</option>
                    <option value="card">Credit/Debit Card</option>
                    <option value="upi">UPI</option>
                    <option value="netbanking">Net Banking</option>
                  </select>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span>Pending Amount:</span>
                    <span className="font-medium">₹{studentData.financialInfo.pendingAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>Amount to Pay:</span>
                    <span className="font-medium">₹{paymentAmount || '0'}</span>
                  </div>
                  <div className="border-t mt-2 pt-2 flex justify-between font-bold">
                    <span>Remaining:</span>
                    <span>₹{(studentData.financialInfo.pendingAmount - (parseFloat(paymentAmount) || 0)).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t px-6 py-4 bg-gray-50 rounded-b-2xl flex justify-end space-x-3">
                <button 
                  onClick={() => setShowPaymentModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button 
                  onClick={handlePayment}
                  disabled={loading || !paymentAmount || parseFloat(paymentAmount) <= 0}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Proceed to Pay'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 flex flex-col items-center">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
              <div className="text-lg font-medium text-gray-900">Processing...</div>
            </div>
          </div>
        )}
      </div>
    );
  }