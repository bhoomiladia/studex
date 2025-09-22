import mongoose, { Schema, model, models } from "mongoose";

const StudentSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    dob: { type: Date },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    email: { type: String, unique: true },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    course: { type: String },
    department: { type: String },
    year: { type: Number },
    rollNumber: { type: String, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String },
    // Hostel relation
    hostel: { type: Boolean, default: false },
    hostelName: { type: Schema.Types.ObjectId, ref: "Hostel" },
    roomNumber: { type: String },
    messPreference: { type: String, enum: ["Veg", "Non-Veg", "Other"] },
    roomPreference: { type: String, enum: ["AC", "Non-AC"] },

    // Guardian / Emergency
    guardianName: { type: String },
    guardianPhone: { type: String },
    emergencyContact: { type: String },

    // Education
    previousSchool: { type: String },

    // Histories
    libraryHistory: [
      { type: Schema.Types.ObjectId, ref: "LibraryTransaction" },
    ],
    feesHistory: [{ type: Schema.Types.ObjectId, ref: "FeesHistory" }],
  },
  { timestamps: true }
);

export default models.Student || model("Student", StudentSchema);
