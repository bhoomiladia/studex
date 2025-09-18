import mongoose, { Schema, model, models } from "mongoose";

const LibrarySchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: "Student" },
  bookCode: String,
  issuedAt: { type: Date, default: Date.now },
  returnedAt: Date,
});

export default models.Library || model("Library", LibrarySchema);
