import mongoose, { Schema, model, models } from "mongoose";

const FeesHistorySchema = new Schema(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    feeType: {
      type: String,
      enum: ["Hostel", "Tuition", "Mess", "Fine", "Other"],
      required: true,
    },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Paid", "Pending", "Overdue"],
      default: "Pending",
    },
    paymentDate: { type: Date },
    dueDate: { type: Date, required: true },
    remarks: { type: String },
  },
  { timestamps: true }
);

export default models.FeesHistory || model("FeesHistory", FeesHistorySchema);
