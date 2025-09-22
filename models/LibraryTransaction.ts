import mongoose, { Schema, model, models } from "mongoose";

const LibraryTransactionSchema = new Schema(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    bookCode: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    issuedAt: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    returnedAt: { type: Date },
    fineAmount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.LibraryTransaction ||
  model("LibraryTransaction", LibraryTransactionSchema);
