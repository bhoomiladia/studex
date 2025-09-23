"use client";
import { useEffect, useState, useCallback } from "react";
import { Search, Filter, ChevronUp, ChevronDown, Eye, Home, UserPlus, UserMinus, Building, Bed, Wifi, Users, Loader2, CheckCircle, XCircle, Edit, Plus } from "lucide-react";

export default function HostelAdminDashboard() {
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [hostels, setHostels] = useState<any[]>([]);
  const [filters, setFilters] = useState({ status: "unalloted", hostel: "", roomType: "", gender: "" });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("students");
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [newRoom, setNewRoom] = useState({ hostelName: "", roomNumber: "", roomType: "", capacity: 2, amenities: [] });

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
        gender: i % 2 === 0 ? "Male" : "Female",
        roomPreference: i % 2 === 0 ? "AC" : "Non-AC",
        messPreference: i % 2 === 0 ? "Veg" : "Non-Veg",
        status: filters.status === "alloted" ? "alloted" : "unalloted",
        hostel: filters.status === "alloted" ? {
          hostelName: i % 2 === 0 ? "Boys Hostel A" : "Girls Hostel B",
          roomNumber: `20${i + 1}`,
          roomType: i % 2 === 0 ? "AC" : "Non-AC"
        } : null
      }));
      setStudents(mockStudents);
      setTotal(50);
      setLoading(false);
    }, 1000);
  }, [filters, page, sortBy, order]);

  const fetchHostels = useCallback(async () => {
    setLoading(true);
    // Simulated API call
    setTimeout(() => {
      const mockHostels = [
        {
          _id: "1",
          name: "Boys Hostel A",
          type: "AC",
          gender: "Male",
          totalRooms: 50,
          occupied: 35,
          available: 15,
          warden: "Dr. Sharma",
          contact: "9876543210"
        },
        {
          _id: "2",
          name: "Girls Hostel B",
          type: "Non-AC",
          gender: "Female",
          totalRooms: 40,
          occupied: 30,
          available: 10,
          warden: "Dr. Patel",
          contact: "9876543211"
        }
      ];
      setHostels(mockHostels);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAllotHostel = async (studentId: string, hostelData: any) => {
    const confirm1 = confirm(`Allot ${hostelData.hostelName}, Room ${hostelData.roomNumber} to this student?`);
    if (!confirm1) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      fetchStudents();
      setLoading(false);
    }, 500);
  };

  const handleVacateHostel = async (studentId: string) => {
    const confirm1 = confirm("Are you sure you want to vacate this student from hostel?");
    if (!confirm1) return;
    const confirm2 = confirm("This action cannot be undone. Proceed to vacate?");
    if (!confirm2) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      fetchStudents();
      setLoading(false);
    }, 500);
  };

  const handleChangeRoom = async (studentId: string, newRoomData: any) => {
    const confirm1 = confirm(`Change room to ${newRoomData.hostelName}, Room ${newRoomData.roomNumber}?`);
    if (!confirm1) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      fetchStudents();
      setLoading(false);
    }, 500);
  };

  const handleAddRoom = async () => {
    // Validate room data
    if (!newRoom.hostelName || !newRoom.roomNumber || !newRoom.roomType) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setShowRoomModal(false);
      setNewRoom({ hostelName: "", roomNumber: "", roomType: "", capacity: 2, amenities: [] });
      fetchHostels();
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
          gender: "Male",
          phone: "9876543210"
        },
        hostel: {
          hostelName: "Boys Hostel A",
          roomNumber: "201",
          roomType: "AC",
          allotmentDate: new Date().toISOString()
        },
        issues: [
          { _id: "1", type: "Maintenance", description: "AC not working", status: "Pending", date: new Date().toISOString() },
          { _id: "2", type: "Cleaning", description: "Room needs cleaning", status: "Resolved", date: new Date(Date.now() - 86400000).toISOString() }
        ]
      });
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (activeTab === "students") {
      fetchStudents();
    } else {
      fetchHostels();
    }
  }, [activeTab, fetchStudents, fetchHostels]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedStudent(null);
        setShowRoomModal(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const StatusBadge = ({ status }: { status: string }) => (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
      status === "alloted" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
    }`}>
      {status === "alloted" ? (
        <>
          <CheckCircle className="w-4 h-4 mr-1" />
          Alloted
        </>
      ) : (
        <>
          <UserPlus className="w-4 h-4 mr-1" />
          Unalloted
        </>
      )}
    </span>
  );

  const GenderBadge = ({ gender }: { gender: string }) => (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
      gender === "Male" ? "bg-blue-100 text-blue-800" : "bg-pink-100 text-pink-800"
    }`}>
      {gender}
    </span>
  );

  const RoomTypeBadge = ({ type }: { type: string }) => (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
      type === "AC" ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800"
    }`}>
      <Bed className="w-3 h-3 mr-1" />
      {type}
    </span>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              Hostel Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2">Manage hostel allocations, rooms, and student issues</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <div className="text-2xl font-bold text-green-600">{total}</div>
              <div className="text-sm text-gray-500">Total Students</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <div className="text-2xl font-bold text-blue-600">{hostels.reduce((acc, h) => acc + h.available, 0)}</div>
              <div className="text-sm text-gray-500">Available Rooms</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border p-2 mb-6">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab("students")}
              className={`flex-1 py-3 px-4 rounded-lg text-center font-medium transition-all ${
                activeTab === "students"
                  ? "bg-blue-100 text-blue-700 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Users className="w-5 h-5 mx-auto mb-1" />
              Student Management
            </button>
            <button
              onClick={() => setActiveTab("hostels")}
              className={`flex-1 py-3 px-4 rounded-lg text-center font-medium transition-all ${
                activeTab === "hostels"
                  ? "bg-green-100 text-green-700 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Building className="w-5 h-5 mx-auto mb-1" />
              Hostel Overview
            </button>
            <button
              onClick={() => setActiveTab("rooms")}
              className={`flex-1 py-3 px-4 rounded-lg text-center font-medium transition-all ${
                activeTab === "rooms"
                  ? "bg-purple-100 text-purple-700 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Bed className="w-5 h-5 mx-auto mb-1" />
              Room Management
            </button>
          </div>
        </div>

        {/* Student Management Tab */}
        {activeTab === "students" && (
          <>
            {/* Filters Card */}
            <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Student Filters</h2>
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
                  <option value="unalloted">Unalloted Students</option>
                  <option value="alloted">Alloted Students</option>
                  <option value="">All Students</option>
                </select>
                
                <select 
                  onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Genders</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                
                <select 
                  onChange={(e) => setFilters({ ...filters, roomType: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Room Types</option>
                  <option value="AC">AC Rooms</option>
                  <option value="Non-AC">Non-AC Rooms</option>
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
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preferences</th>
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
                          <GenderBadge gender={student.gender} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="space-y-1">
                            <RoomTypeBadge type={student.roomPreference} />
                            <span className="text-xs text-gray-500 block">Mess: {student.messPreference}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={student.status} />
                          {student.hostel && (
                            <div className="text-xs text-gray-500 mt-1">
                              {student.hostel.hostelName}, Room {student.hostel.roomNumber}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          {student.status === "unalloted" ? (
                            <button 
                              onClick={() => handleAllotHostel(student._id, { hostelName: "Boys Hostel A", roomNumber: "201" })}
                              className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                              <UserPlus className="w-4 h-4 mr-1" />
                              Allot Hostel
                            </button>
                          ) : (
                            <>
                              <button 
                                onClick={() => handleChangeRoom(student._id, { hostelName: "Boys Hostel B", roomNumber: "301" })}
                                className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                Change Room
                              </button>
                              <button 
                                onClick={() => handleVacateHostel(student._id)}
                                className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                              >
                                <UserMinus className="w-4 h-4 mr-1" />
                                Vacate
                              </button>
                            </>
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
          </>
        )}

        {/* Hostel Overview Tab */}
        {activeTab === "hostels" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hostels.map((hostel) => (
              <div key={hostel._id} className="bg-white rounded-2xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{hostel.name}</h3>
                  <RoomTypeBadge type={hostel.type} />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Gender:</span>
                    <GenderBadge gender={hostel.gender} />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Rooms:</span>
                    <span className="font-medium">{hostel.totalRooms}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Occupied:</span>
                    <span className="font-medium text-orange-600">{hostel.occupied}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Available:</span>
                    <span className="font-medium text-green-600">{hostel.available}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Warden:</span>
                    <span className="font-medium">{hostel.warden}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Contact:</span>
                    <span className="font-medium">{hostel.contact}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${(hostel.occupied / hostel.totalRooms) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1 text-center">
                    Occupancy: {Math.round((hostel.occupied / hostel.totalRooms) * 100)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Room Management Tab */}
        {activeTab === "rooms" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Room Management</h2>
              <button 
                onClick={() => setShowRoomModal(true)}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Room
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sample Room Cards */}
              {[1, 2, 3, 4, 5, 6].map((room) => (
                <div key={room} className="bg-white rounded-2xl shadow-sm border p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold">Room 20{room}</h3>
                    <RoomTypeBadge type={room % 2 === 0 ? "AC" : "Non-AC"} />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hostel:</span>
                      <span className="font-medium">Boys Hostel A</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capacity:</span>
                      <span className="font-medium">2 Students</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Occupied:</span>
                      <span className="font-medium">{room % 3 === 0 ? "2" : "1"}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`font-medium ${room % 3 === 0 ? "text-red-600" : "text-green-600"}`}>
                        {room % 3 === 0 ? "Full" : "Available"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      Edit Details
                    </button>
                    <button className="flex-1 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm">
                      View Occupants
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center">
            <Loader2 className="w-8 h-8 text-green-600 animate-spin mb-4" />
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
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedStudent.student.name}</h2>
                  <p className="text-green-100">{selectedStudent.student.rollNumber} • {selectedStudent.student.department}</p>
                </div>
                <button onClick={() => setSelectedStudent(null)} className="text-white hover:text-green-200">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                      <label className="text-sm text-gray-600">Gender</label>
                      <GenderBadge gender={selectedStudent.student.gender} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Hostel Information</h3>
                  {selectedStudent.hostel ? (
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="font-medium">{selectedStudent.hostel.hostelName}</p>
                      <p className="text-green-600">Room {selectedStudent.hostel.roomNumber} • {selectedStudent.hostel.roomType}</p>
                      <p className="text-sm text-gray-600">Allotted on: {new Date(selectedStudent.hostel.allotmentDate).toLocaleDateString()}</p>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 rounded-lg p-4 text-yellow-800">
                      No hostel allotted
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Recent Issues</h3>
                  {selectedStudent.issues.length > 0 ? (
                    selectedStudent.issues.map((issue: any) => (
                      <div key={issue._id} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{issue.type}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            issue.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {issue.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{issue.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{new Date(issue.date).toLocaleDateString()}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 text-center py-4">No issues reported</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Room Modal */}
      {showRoomModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowRoomModal(false)}>
          <div 
            className="bg-white rounded-2xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white rounded-t-2xl">
              <h2 className="text-xl font-bold">Add New Room</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hostel Name</label>
                <input
                  type="text"
                  value={newRoom.hostelName}
                  onChange={(e) => setNewRoom({ ...newRoom, hostelName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter hostel name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
                <input
                  type="text"
                  value={newRoom.roomNumber}
                  onChange={(e) => setNewRoom({ ...newRoom, roomNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter room number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                <select
                  value={newRoom.roomType}
                  onChange={(e) => setNewRoom({ ...newRoom, roomType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select room type</option>
                  <option value="AC">AC</option>
                  <option value="Non-AC">Non-AC</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                <input
                  type="number"
                  value={newRoom.capacity}
                  onChange={(e) => setNewRoom({ ...newRoom, capacity: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="1"
                  max="4"
                />
              </div>
            </div>
            
            <div className="border-t px-6 py-4 bg-gray-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                onClick={() => setShowRoomModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddRoom}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Add Room
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}