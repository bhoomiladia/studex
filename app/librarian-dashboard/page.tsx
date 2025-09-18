"use client"

import React, { useState } from "react"

interface IssuedBook {
  studentName: string
  studentRoll: string
  department: string
  bookCode: string
  status: "Issued" | "Returned"
}

export default function LibrarianDashboard() {
  const [studentRoll, setStudentRoll] = useState("")
  const [bookCode, setBookCode] = useState("")
  const [action, setAction] = useState<"Issue" | "Return">("Issue")
  const [issuedBooks, setIssuedBooks] = useState<IssuedBook[]>([
    { studentName: "Alice", studentRoll: "HITCSE25001", department: "CSE", bookCode: "B101", status: "Issued" },
    { studentName: "Bob", studentRoll: "HITMCA25001", department: "MCA", bookCode: "B102", status: "Issued" },
  ])

  // Example student database (in real app, fetch from backend)
  const studentDB = [
    { name: "Alice", roll: "HITCSE25001", department: "CSE" },
    { name: "Bob", roll: "HITMCA25001", department: "MCA" },
    { name: "Charlie", roll: "HITECE24012", department: "ECE" },
  ]

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const student = studentDB.find(s => s.roll === studentRoll)
    if (!student) {
      alert("Student roll number not found")
      return
    }

    if (action === "Issue") {
      setIssuedBooks(prev => [...prev, { studentName: student.name, studentRoll, department: student.department, bookCode, status: "Issued" }])
    } else {
      // Mark as returned
      setIssuedBooks(prev =>
        prev.map(b =>
          b.studentRoll === studentRoll && b.bookCode === bookCode
            ? { ...b, status: "Returned" }
            : b
        )
      )
    }

    setStudentRoll("")
    setBookCode("")
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-md p-8 space-y-8">
        <h1 className="text-2xl font-semibold mb-4">Librarian Dashboard</h1>

        {/* Issue/Return Form */}
        <section className="border rounded-lg p-4 space-y-4">
          <h2 className="text-xl font-medium mb-2">Issue / Return Book</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input
              type="text"
              placeholder="Student Roll"
              value={studentRoll}
              onChange={(e) => setStudentRoll(e.target.value)}
              className="rounded-md border px-3 py-2"
            />
            <input
              type="text"
              placeholder="Book Code"
              value={bookCode}
              onChange={(e) => setBookCode(e.target.value)}
              className="rounded-md border px-3 py-2"
            />
            <select
              value={action}
              onChange={(e) => setAction(e.target.value as "Issue" | "Return")}
              className="rounded-md border px-3 py-2"
            >
              <option value="Issue">Issue</option>
              <option value="Return">Return</option>
            </select>
            <button type="submit" className="rounded-md bg-blue-600 text-white px-4 py-2">Submit</button>
          </form>
        </section>

        {/* Issued Books List */}
        <section>
          <h2 className="text-xl font-medium mb-3">Issued Books List</h2>
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">Student Name</th>
                <th className="border px-2 py-1">Roll</th>
                <th className="border px-2 py-1">Department</th>
                <th className="border px-2 py-1">Book Code</th>
                <th className="border px-2 py-1">Status</th>
              </tr>
            </thead>
            <tbody>
              {issuedBooks.map((b, idx) => (
                <tr key={idx} className={b.status === "Returned" ? "bg-gray-200" : ""}>
                  <td className="border px-2 py-1">{b.studentName}</td>
                  <td className="border px-2 py-1">{b.studentRoll}</td>
                  <td className="border px-2 py-1">{b.department}</td>
                  <td className="border px-2 py-1">{b.bookCode}</td>
                  <td className="border px-2 py-1">{b.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  )
}
