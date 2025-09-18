import mongoose, { Schema, model, models } from "mongoose";

const StudentSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: String,
  gender: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  postalCode: String,
  course: String,
  department: String,
  year: String,
  rollNumber: String,
  hostel: { type: Boolean, default: false },
  messPreference: String,
  guardianName: String,
  guardianPhone: String,
  emergencyContact: String,
  previousSchool: String,
}, {
  timestamps: true
});

export default models.Student || model("Student", StudentSchema);