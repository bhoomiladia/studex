"use client"

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center mb-6">Student Dashboard</h1>

        {/* Student Details */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Student Details</h2>
          <p><span className="font-medium">Name:</span> John Doe</p>
          <p><span className="font-medium">Roll Number:</span> 123456</p>
          <p><span className="font-medium">College ID:</span> HIT2025CSE01</p>
          <p><span className="font-medium">Department:</span> CSE</p>
          <p><span className="font-medium">Course:</span> B.Tech</p>
          <p><span className="font-medium">Fees Status:</span> Paid</p>
        </div>

        {/* Hostel Details */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Hostel Details</h2>
          <p><span className="font-medium">Hostel Allotted:</span> Yes</p>
          <p><span className="font-medium">Room Number:</span> H-203</p>
          <p><span className="font-medium">Mess Preference:</span> Vegetarian</p>
        </div>

        {/* Library Details */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Library Details</h2>
          <p><span className="font-medium">Books Issued:</span> 3</p>
          <p><span className="font-medium">Pending Returns:</span> 1 (Data Structures by Seymour Lipschutz)</p>
        </div>
      </div>
    </div>
  )
}