"use client"

import React, { useState } from "react"

interface Student {
  name: string
  roll: string
  course: string
  department: string
  hostel: "Yes" | "No"
  messPreference?: "Veg" | "Non-Veg" | "Mixed"
}

interface HostelAllotment {
  studentName: string
  roll: string
  hostelName: string
  roomNumber: string
  messPreference?: "Veg" | "Non-Veg" | "Mixed"
}

export default function HostelDashboard() {
  // Example student list (would come from backend in real app)
  const [students] = useState<Student[]>([
    { name: "Alice", roll: "HITCSE25001", course: "B.Tech", department: "CSE", hostel: "Yes", messPreference: "Veg" },
    { name: "Bob", roll: "HITMCA25001", course: "MCA", department: "MCA", hostel: "No" },
    { name: "Charlie", roll: "HITECE24012", course: "B.Tech", department: "ECE", hostel: "Yes", messPreference: "Mixed" },
  ])

  const [selectedStudentRoll, setSelectedStudentRoll] = useState("")
  const [hostelName, setHostelName] = useState("")
  const [roomNumber, setRoomNumber] = useState("")
  const [allotments, setAllotments] = useState<HostelAllotment[]>([])

  const eligibleStudents = students.filter(s => s.hostel === "Yes")

  function handleAllotment(e: React.FormEvent) {
    e.preventDefault()
    const student = eligibleStudents.find(s => s.roll === selectedStudentRoll)
    if (!student) {
      alert("Select a valid student")
      return
    }
    setAllotments(prev => [
      ...prev,
      { studentName: student.name, roll: student.roll, hostelName, roomNumber, messPreference: student.messPreference },
    ])
    setSelectedStudentRoll("")
    setHostelName("")
    setRoomNumber("")
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-md p-8 space-y-8">
        <h1 className="text-2xl font-semibold mb-4">Hostel Dashboard</h1>

        {/* Hostel Allotment Form */}
        <section className="border rounded-lg p-4 space-y-4">
          <h2 className="text-xl font-medium mb-2">Allot Hostel</h2>
          <form onSubmit={handleAllotment} className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <select
              value={selectedStudentRoll}
              onChange={(e) => setSelectedStudentRoll(e.target.value)}
              className="rounded-md border px-3 py-2"
            >
              <option value="">Select Student</option>
              {eligibleStudents.map(s => (
                <option key={s.roll} value={s.roll}>
                  {s.name} ({s.roll}) - {s.messPreference} mess
                </option>
              ))}
            </select>

            <select
              value={hostelName}
              onChange={(e) => setHostelName(e.target.value)}
              className="rounded-md border px-3 py-2"
            >
              <option value="">Select Hostel</option>
              <option value="Hostel A">Hostel A</option>
              <option value="Hostel B">Hostel B</option>
              <option value="Hostel C">Hostel C</option>
            </select>

            <input
              type="text"
              placeholder="Room Number"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              className="rounded-md border px-3 py-2"
            />

            <button type="submit" className="rounded-md bg-blue-600 text-white px-4 py-2">Allot</button>
          </form>
        </section>

        {/* Hostel Allotments List */}
        <section>
          <h2 className="text-xl font-medium mb-3">Allotments</h2>
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">Student Name</th>
                <th className="border px-2 py-1">Roll</th>
                <th className="border px-2 py-1">Hostel</th>
                <th className="border px-2 py-1">Room No.</th>
                <th className="border px-2 py-1">Mess Preference</th>
              </tr>
            </thead>
            <tbody>
              {allotments.map((a, idx) => (
                <tr key={idx}>
                  <td className="border px-2 py-1">{a.studentName}</td>
                  <td className="border px-2 py-1">{a.roll}</td>
                  <td className="border px-2 py-1">{a.hostelName}</td>
                  <td className="border px-2 py-1">{a.roomNumber}</td>
                  <td className="border px-2 py-1">{a.messPreference || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  )
}
