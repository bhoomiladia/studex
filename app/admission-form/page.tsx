"use client"

import React, { useState } from "react"

type FormState = {
  firstName: string
  lastName: string
  dob: string
  gender: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  postalCode: string
  course: string
  year: string
  rollNumber: string
  collegeId: string
  guardianName: string
  guardianPhone: string
  emergencyContact: string
  previousSchool: string
}

const initialState: FormState = {
  firstName: "",
  lastName: "",
  dob: "",
  gender: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  course: "",
  year: "",
  rollNumber: "",
  collegeId: "",
  guardianName: "",
  guardianPhone: "",
  emergencyContact: "",
  previousSchool: "",
}

export default function StudentFormPage() {
  const [form, setForm] = useState<FormState>(initialState)
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // very basic submission handling - replace with API call as needed
    console.log("Submitting form:", form)
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-semibold mb-4">College Admission / Student Information Form</h1>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First name</label>
                <input name="firstName" value={form.firstName} onChange={handleChange} className="w-full rounded-md border px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last name</label>
                <input name="lastName" value={form.lastName} onChange={handleChange} className="w-full rounded-md border px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Date of birth</label>
                <input name="dob" type="date" value={form.dob} onChange={handleChange} className="w-full rounded-md border px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Gender</label>
                <select name="gender" value={form.gender} onChange={handleChange} className="w-full rounded-md border px-3 py-2">
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full rounded-md border px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input name="phone" value={form.phone} onChange={handleChange} className="w-full rounded-md border px-3 py-2" />
              </div>
            </section>

            <section>
              <label className="block text-sm font-medium mb-1">Address</label>
              <textarea name="address" value={form.address} onChange={handleChange} rows={2} className="w-full rounded-md border px-3 py-2" />

              <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="rounded-md border px-3 py-2" />
                <input name="state" placeholder="State" value={form.state} onChange={handleChange} className="rounded-md border px-3 py-2" />
                <input name="postalCode" placeholder="Postal / ZIP" value={form.postalCode} onChange={handleChange} className="rounded-md border px-3 py-2" />
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Course / Program</label>
                <input name="course" value={form.course} onChange={handleChange} className="w-full rounded-md border px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Year / Semester</label>
                <input name="year" value={form.year} onChange={handleChange} className="w-full rounded-md border px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Roll number / Reg. no.</label>
                <input name="rollNumber" value={form.rollNumber} onChange={handleChange} className="w-full rounded-md border px-3 py-2" />
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">College ID (if any)</label>
                <input name="collegeId" value={form.collegeId} onChange={handleChange} className="w-full rounded-md border px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Previous school / College</label>
                <input name="previousSchool" value={form.previousSchool} onChange={handleChange} className="w-full rounded-md border px-3 py-2" />
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Parent / Guardian name</label>
                <input name="guardianName" value={form.guardianName} onChange={handleChange} className="w-full rounded-md border px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Guardian phone</label>
                <input name="guardianPhone" value={form.guardianPhone} onChange={handleChange} className="w-full rounded-md border px-3 py-2" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Emergency contact</label>
                <input name="emergencyContact" value={form.emergencyContact} onChange={handleChange} className="w-full rounded-md border px-3 py-2" />
              </div>
            </section>

            <div className="flex items-center justify-between">
              <button type="submit" className="rounded-md bg-blue-600 text-white px-4 py-2">Submit</button>
              <button type="button" onClick={() => setForm(initialState)} className="text-sm text-gray-600">Reset</button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-medium mb-2">Thank you!</h2>
            <p className="text-sm text-gray-600">Your form was submitted. Check console for output (replace with API call in real app).</p>
            <button onClick={() => { setSubmitted(false); setForm(initialState); }} className="mt-4 rounded-md border px-4 py-2">Fill another</button>
          </div>
        )}
      </div>
    </main>
  )
}
