"use client";

import React, { useState } from "react";

type FormState = {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  course: string;
  department: string;
  year: string;
  rollNumber?: string;
  hostel: string;
  messPreference: string;
  guardianName: string;
  guardianPhone: string;
  emergencyContact: string;
  previousSchool: string;
};

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
  department: "",
  year: "",
  rollNumber: "",
  hostel: "",
  messPreference: "",
  guardianName: "",
  guardianPhone: "",
  emergencyContact: "",
  previousSchool: "",
};

export default function StudentFormPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const payload = { ...form };
      
      const res = await fetch("/api/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        console.log("Student saved:", data);
        setSubmitted(true);
      } else {
        setError(data.error || "Failed to save student");
        console.error("Failed to save student:", data);
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Network error:", err);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-semibold mb-4">College Admission / Student Form</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <section>
              <h2 className="text-lg font-medium mb-3">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input name="firstName" value={form.firstName} onChange={handleChange} required 
                    className="w-full border px-3 py-2 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input name="lastName" value={form.lastName} onChange={handleChange} required 
                    className="w-full border px-3 py-2 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input name="dob" type="date" value={form.dob} onChange={handleChange} 
                    className="w-full border px-3 py-2 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select name="gender" value={form.gender} onChange={handleChange} 
                    className="w-full border px-3 py-2 rounded-md">
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} 
                    className="w-full border px-3 py-2 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input name="phone" value={form.phone} onChange={handleChange} 
                    className="w-full border px-3 py-2 rounded-md" />
                </div>
              </div>
            </section>

            {/* Address Section */}
            <section>
              <h2 className="text-lg font-medium mb-3">Address Information</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea name="address" value={form.address} onChange={handleChange} rows={2} 
                  className="w-full border px-3 py-2 rounded-md" />
              </div>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <input name="city" placeholder="City" value={form.city} onChange={handleChange} 
                    className="w-full border px-3 py-2 rounded-md" />
                </div>
                <div>
                  <input name="state" placeholder="State" value={form.state} onChange={handleChange} 
                    className="w-full border px-3 py-2 rounded-md" />
                </div>
                <div>
                  <input name="postalCode" placeholder="Postal / ZIP" value={form.postalCode} onChange={handleChange} 
                    className="w-full border px-3 py-2 rounded-md" />
                </div>
              </div>
            </section>

            {/* Academic Information */}
            <section>
              <h2 className="text-lg font-medium mb-3">Academic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                  <select name="course" value={form.course} onChange={handleChange} 
                    className="w-full border px-3 py-2 rounded-md">
                    <option value="">Select</option>
                    <option value="B.Tech">B.Tech</option>
                    <option value="M.Tech">M.Tech</option>
                    <option value="MCA">MCA</option>
                  </select>
                </div>
                {form.course !== "MCA" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <select name="department" value={form.department} onChange={handleChange} 
                      className="w-full border px-3 py-2 rounded-md">
                      <option value="">Select</option>
                      <option value="CSE">CSE</option>
                      <option value="ECE">ECE</option>
                      <option value="ME">ME</option>
                      <option value="CE">CE</option>
                      <option value="IT">IT</option>
                    </select>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <select name="year" value={form.year} onChange={handleChange} 
                    className="w-full border px-3 py-2 rounded-md">
                    <option value="">Select Year</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>

                {form.year && form.year !== "1" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
                    <input type="text" name="rollNumber" value={form.rollNumber || ""} onChange={handleChange} 
                      placeholder="Enter Roll Number" className="w-full border px-3 py-2 rounded-md" />
                  </div>
                )}
              </div>
            </section>

            {/* Hostel Information */}
            <section>
              <h2 className="text-lg font-medium mb-3">Hostel Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hostel Requirement</label>
                  <select name="hostel" value={form.hostel} onChange={handleChange} 
                    className="w-full border px-3 py-2 rounded-md">
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                
                {form.hostel === "Yes" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mess Preference</label>
                    <select name="messPreference" value={form.messPreference} onChange={handleChange} 
                      className="w-full border px-3 py-2 rounded-md">
                      <option value="">Select</option>
                      <option value="Veg">Veg</option>
                      <option value="Non-Veg">Non-Veg</option>
                      <option value="Mixed">Mixed</option>
                    </select>
                  </div>
                )}
              </div>
            </section>

            {/* Guardian Information */}
            <section>
              <h2 className="text-lg font-medium mb-3">Guardian Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guardian Name</label>
                  <input name="guardianName" value={form.guardianName} onChange={handleChange} 
                    className="w-full border px-3 py-2 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guardian Phone</label>
                  <input name="guardianPhone" value={form.guardianPhone} onChange={handleChange} 
                    className="w-full border px-3 py-2 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                  <input name="emergencyContact" value={form.emergencyContact} onChange={handleChange} 
                    className="w-full border px-3 py-2 rounded-md" />
                </div>
              </div>
            </section>

            {/* Previous School */}
            <section>
              <h2 className="text-lg font-medium mb-3">Educational Background</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Previous School</label>
                <input name="previousSchool" value={form.previousSchool} onChange={handleChange} 
                  className="w-full border px-3 py-2 rounded-md" />
              </div>
            </section>

            <div className="flex justify-between items-center pt-4">
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Submit
              </button>
              <button type="button" onClick={() => setForm(initialState)} 
                className="px-4 py-2 border rounded-md hover:bg-gray-50">
                Reset
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Thank you!</h2>
            <p className="text-gray-600">Your form was submitted successfully.</p>
            <button onClick={() => { setSubmitted(false); setForm(initialState); }} 
              className="mt-4 px-4 py-2 border rounded-md hover:bg-gray-50">
              Fill another form
            </button>
          </div>
        )}
      </div>
    </main>
  );
}