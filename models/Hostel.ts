import mongoose, { Schema, model, models } from "mongoose";

const HostelSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: "Student" },
  hostelName: String,
  roomNumber: String,
});

export default models.Hostel || model("Hostel", HostelSchema);
