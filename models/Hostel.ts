import mongoose, { Schema, model, models } from "mongoose";

const HostelSchema = new Schema(
  {
    hostelName: { type: String, required: true },
    roomNumber: { type: String, required: true },
    occupancy: { type: Number, required: true },
    currentVacancy: { type: Number, default: 0 },
    wardenName: { type: String },
    isAC: { type: Boolean, default: false },
    costPerMonth: { type: Number, required: true },
  },
  { timestamps: true }
);

export default models.Hostel || model("Hostel", HostelSchema);
