import mongoose, { Schema, model, models } from "mongoose";

const AdminSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    phone: { type: String },
    employeeId: { type: String, unique: true, required: true },
    role: {
      type: String,
      enum: ["StudentAdmin", "HostelAdmin", "FinanceAdmin", "LibraryAdmin"],
      required: true,
    },
  },
  { timestamps: true }
);

export default models.Admin || model("Admin", AdminSchema);
