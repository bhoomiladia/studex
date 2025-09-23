"use client";
import { useEffect, useState, useCallback } from "react";
import { Search, Filter, Book, User, Calendar, CheckCircle, XCircle, Plus, Edit, RotateCcw, Download, Eye, Loader2, BarChart3, Users, BookOpen, Clock } from "lucide-react";

export default function LibraryAdminDashboard() {
  const [books, setBooks] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("books");
  const [filters, setFilters] = useState({ status: "available", category: "", search: "" });
  const [loading, setLoading] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    totalCopies: 1,
    availableCopies: 1,
    publisher: "",
    publicationYear: new Date().getFullYear()
  });

  // Mock data - replace with actual API calls
  const fetchData = useCallback(async () => {
    setLoading(true);
    
    setTimeout(() => {
      // Mock books data
      const mockBooks = Array.from({ length: 15 }, (_, i) => ({
        _id: `book${i + 1}`,
        title: `Book Title ${i + 1}`,
        author: `Author ${(i % 5) + 1}`,
        isbn: `ISBN${1000 + i}`,
        category: ["Computer Science", "Mathematics", "Physics", "Literature", "Engineering"][i % 5],
        totalCopies: 3 + (i % 3),
        availableCopies: 1 + (i % 2),
        publisher: `Publisher ${(i % 3) + 1}`,
        publicationYear: 2020 + (i % 4),
        status: i % 4 === 0 ? "Issued" : "Available"
      }));
      setBooks(mockBooks);

      // Mock transactions data
      const mockTransactions = Array.from({ length: 10 }, (_, i) => ({
        _id: `trans${i + 1}`,
        bookTitle: `Book Title ${i + 1}`,
        studentName: `Student ${i + 1}`,
        studentRoll: `2023CS${1000 + i}`,
        type: i % 3 === 0 ? "Return" : "Issue",
        date: new Date(Date.now() - i * 86400000).toISOString(),
        dueDate: i % 3 === 0 ? null : new Date(Date.now() + (14 - i) * 86400000).toISOString(),
        status: i % 4 === 0 ? "Overdue" : i % 3 === 0 ? "Returned" : "Issued"
      }));
      setTransactions(mockTransactions);

      // Mock students data
      const mockStudents = Array.from({ length: 8 }, (_, i) => ({
        _id: `student${i + 1}`,
        name: `Student ${i + 1}`,
        rollNumber: `2023CS${1000 + i}`,
        department: ["CSE", "ECE", "MECH"][i % 3],
        year: (i % 4) + 1,
        booksIssued: i % 3,
        hasOverdue: i % 5 === 0
      }));
      setStudents(mockStudents);

      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleIssueBook = async (bookId: string, studentId: string) => {
    if (!selectedStudent) {
      alert("Please select a student first");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      alert(`Book "${selectedBook.title}" issued to ${selectedStudent.name}`);
      setShowIssueModal(false);
      setSelectedBook(null);
      setSelectedStudent(null);
      fetchData();
      setLoading(false);
    }, 1000);
  };

  const handleReturnBook = async (transactionId: string) => {
    const confirm = window.confirm("Mark this book as returned?");
    if (!confirm) return;

    setLoading(true);
    setTimeout(() => {
      alert("Book returned successfully!");
      fetchData();
      setLoading(false);
    }, 500);
  };

  const handleAddBook = async () => {
    if (!newBook.title || !newBook.author || !newBook.isbn) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      alert("Book added successfully!");
      setShowBookModal(false);
      setNewBook({
        title: "",
        author: "",
        isbn: "",
        category: "",
        totalCopies: 1,
        availableCopies: 1,
        publisher: "",
        publicationYear: new Date().getFullYear()
      });
      fetchData();
      setLoading(false);
    }, 1000);
  };

  const handleEditBook = async (book: any) => {
    setNewBook(book);
    setShowBookModal(true);
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const config = {
      Available: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      Issued: { color: "bg-blue-100 text-blue-800", icon: User },
      Overdue: { color: "bg-red-100 text-red-800", icon: XCircle },
      Returned: { color: "bg-gray-100 text-gray-800", icon: CheckCircle }
    };
    
    const { color, icon: Icon } = config[status as keyof typeof config] || config.Available;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </span>
    );
  };

  const CategoryBadge = ({ category }: { category: string }) => {
    const colors = [
      "bg-purple-100 text-purple-800",
      "bg-orange-100 text-orange-800",
      "bg-cyan-100 text-cyan-800",
      "bg-pink-100 text-pink-800",
      "bg-indigo-100 text-indigo-800"
    ];
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colors[category.length % colors.length]}`}>
        {category}
      </span>
    );
  };

  if (loading && books.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
          <div className="text-lg font-medium text-gray-900">Loading Library Dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <Book className="w-6 h-6 text-white" />
                </div>
                Library Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Manage books, transactions, and student queries</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="text-2xl font-bold text-blue-600">{books.length}</div>
                <div className="text-sm text-gray-500">Total Books</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="text-2xl font-bold text-green-600">
                  {books.reduce((acc, book) => acc + book.availableCopies, 0)}
                </div>
                <div className="text-sm text-gray-500">Available Copies</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="text-2xl font-bold text-orange-600">
                  {transactions.filter(t => t.status === "Overdue").length}
                </div>
                <div className="text-sm text-gray-500">Overdue Books</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Books Issued Today</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Issues</p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  {transactions.filter(t => t.status === "Issued").length}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue Books</p>
                <p className="text-2xl font-bold text-red-600 mt-1">
                  {transactions.filter(t => t.status === "Overdue").length}
                </p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-purple-600 mt-1">{students.length}</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border p-2 mb-6">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab("books")}
              className={`flex-1 py-3 px-4 rounded-lg text-center font-medium transition-all ${
                activeTab === "books"
                  ? "bg-blue-100 text-blue-700 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Book className="w-5 h-5 mx-auto mb-1" />
              Book Management
            </button>
            <button
              onClick={() => setActiveTab("transactions")}
              className={`flex-1 py-3 px-4 rounded-lg text-center font-medium transition-all ${
                activeTab === "transactions"
                  ? "bg-green-100 text-green-700 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <RotateCcw className="w-5 h-5 mx-auto mb-1" />
              Transactions
            </button>
            <button
              onClick={() => setActiveTab("students")}
              className={`flex-1 py-3 px-4 rounded-lg text-center font-medium transition-all ${
                activeTab === "students"
                  ? "bg-purple-100 text-purple-700 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Users className="w-5 h-5 mx-auto mb-1" />
              Student Management
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`flex-1 py-3 px-4 rounded-lg text-center font-medium transition-all ${
                activeTab === "analytics"
                  ? "bg-orange-100 text-orange-700 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <BarChart3 className="w-5 h-5 mx-auto mb-1" />
              Analytics
            </button>
          </div>
        </div>

        {/* Book Management Tab */}
        {activeTab === "books" && (
          <div className="space-y-6">
            {/* Filters and Actions */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Book Inventory</h3>
                <button 
                  onClick={() => setShowBookModal(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Book
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search books..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  />
                </div>
                
                <select 
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="available">Available</option>
                  <option value="issued">Issued</option>
                  <option value="all">All Books</option>
                </select>
                
                <select 
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Literature">Literature</option>
                  <option value="Engineering">Engineering</option>
                </select>
              </div>

              {/* Books Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                  <div key={book._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <CategoryBadge category={book.category} />
                      <StatusBadge status={book.status} />
                    </div>
                    
                    <h4 className="font-semibold text-lg mb-2 line-clamp-2">{book.title}</h4>
                    <p className="text-gray-600 text-sm mb-1">by {book.author}</p>
                    <p className="text-gray-500 text-xs mb-3">ISBN: {book.isbn}</p>
                    
                    <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                      <span>Total Copies: {book.totalCopies}</span>
                      <span>Available: {book.availableCopies}</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => {
                          setSelectedBook(book);
                          setShowIssueModal(true);
                        }}
                        disabled={book.availableCopies === 0}
                        className="flex-1 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 text-sm"
                      >
                        Issue Book
                      </button>
                      <button 
                        onClick={() => handleEditBook(book)}
                        className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === "transactions" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Book</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((transaction) => (
                      <tr key={transaction._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-medium">{transaction.bookTitle}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div>{transaction.studentName}</div>
                          <div className="text-sm text-gray-500">{transaction.studentRoll}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            transaction.type === "Issue" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                          }`}>
                            {transaction.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {new Date(transaction.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {transaction.dueDate ? new Date(transaction.dueDate).toLocaleDateString() : "-"}
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={transaction.status} />
                        </td>
                        <td className="px-6 py-4">
                          {transaction.type === "Issue" && transaction.status !== "Returned" && (
                            <button
                              onClick={() => handleReturnBook(transaction._id)}
                              className="inline-flex items-center px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Return
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Student Management Tab */}
        {activeTab === "students" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Student Records</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Year</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Books Issued</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students.map((student) => (
                      <tr key={student._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-gray-500">{student.rollNumber}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{student.department}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">Year {student.year}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {student.booksIssued} books
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {student.hasOverdue ? (
                            <StatusBadge status="Overdue" />
                          ) : (
                            <StatusBadge status="Clear" />
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <button className="inline-flex items-center px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4">Popular Categories</h3>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-gray-500">Chart: Book Categories Distribution</div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4">Monthly Issues</h3>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-gray-500">Chart: Monthly Issue Trends</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{books.length}</div>
                  <div className="text-sm text-gray-600">Total Books</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {transactions.filter(t => t.type === "Issue").length}
                  </div>
                  <div className="text-sm text-gray-600">Total Issues</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {transactions.filter(t => t.status === "Overdue").length}
                  </div>
                  <div className="text-sm text-gray-600">Overdue Books</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {new Set(transactions.map(t => t.studentRoll)).size}
                  </div>
                  <div className="text-sm text-gray-600">Active Students</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Book Modal */}
      {showBookModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white rounded-t-2xl">
              <h2 className="text-xl font-bold">
                {newBook._id ? "Edit Book" : "Add New Book"}
              </h2>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={newBook.title}
                  onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Book title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author *</label>
                <input
                  type="text"
                  value={newBook.author}
                  onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Author name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ISBN *</label>
                <input
                  type="text"
                  value={newBook.isbn}
                  onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="ISBN number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newBook.category}
                  onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select category</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Literature">Literature</option>
                  <option value="Engineering">Engineering</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Copies</label>
                <input
                  type="number"
                  value={newBook.totalCopies}
                  onChange={(e) => setNewBook({ ...newBook, totalCopies: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Available Copies</label>
                <input
                  type="number"
                  value={newBook.availableCopies}
                  onChange={(e) => setNewBook({ ...newBook, availableCopies: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="0"
                  max={newBook.totalCopies}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Publisher</label>
                <input
                  type="text"
                  value={newBook.publisher}
                  onChange={(e) => setNewBook({ ...newBook, publisher: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Publisher name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Publication Year</label>
                <input
                  type="number"
                  value={newBook.publicationYear}
                  onChange={(e) => setNewBook({ ...newBook, publicationYear: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="1900"
                  max={new Date().getFullYear()}
                />
              </div>
            </div>
            
            <div className="border-t px-6 py-4 bg-gray-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                onClick={() => {
                  setShowBookModal(false);
                  setNewBook({
                    title: "",
                    author: "",
                    isbn: "",
                    category: "",
                    totalCopies: 1,
                    availableCopies: 1,
                    publisher: "",
                    publicationYear: new Date().getFullYear()
                  });
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddBook}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {newBook._id ? "Update Book" : "Add Book"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Issue Book Modal */}
      {showIssueModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white rounded-t-2xl">
              <h2 className="text-xl font-bold">Issue Book</h2>
            </div>
            
            <div className="p-6 space-y-4">
              {selectedBook && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Selected Book</h4>
                  <p><strong>Title:</strong> {selectedBook.title}</p>
                  <p><strong>Author:</strong> {selectedBook.author}</p>
                  <p><strong>Available:</strong> {selectedBook.availableCopies} copies</p>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Student</label>
                <select
                  value={selectedStudent?._id || ""}
                  onChange={(e) => setSelectedStudent(students.find(s => s._id === e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Choose a student</option>
                  {students.map(student => (
                    <option key={student._id} value={student._id}>
                      {student.name} ({student.rollNumber})
                    </option>
                  ))}
                </select>
              </div>
              
              {selectedStudent && (
                <div className="bg-green-50 p-3 rounded-lg">
                  <p><strong>Student:</strong> {selectedStudent.name}</p>
                  <p><strong>Roll No:</strong> {selectedStudent.rollNumber}</p>
                  <p><strong>Department:</strong> {selectedStudent.department}</p>
                </div>
              )}
            </div>
            
            <div className="border-t px-6 py-4 bg-gray-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                onClick={() => {
                  setShowIssueModal(false);
                  setSelectedBook(null);
                  setSelectedStudent(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleIssueBook(selectedBook?._id, selectedStudent?._id)}
                disabled={!selectedStudent}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                Issue Book
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