import mongoose, { Schema, model, models } from "mongoose";

const BookSchema = new Schema(
  {
    bookCode: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    author: { type: String },
    totalQty: { type: Number, default: 0 },
    availableQty: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Book || model("Book", BookSchema);
