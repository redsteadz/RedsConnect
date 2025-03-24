import { Schema, model, models } from "mongoose";

// This is the schema that holds information about the session
export interface SessionType {
  // The two ppls within the session
  teacherId: string;
  studentId: string;
  // The date and time of the session
  dateTime: string;
  duration: number;
  // The status of the session
  status: "pending" | "accepted" | "rejected" | "completed";
  subject: string;
}

const sessionSchema = new Schema({
  teacherId: { type: Schema.Types.ObjectId, ref: "teacher" },
  studentId: { type: Schema.Types.ObjectId, ref: "student" },
  dateTime: Date,
  duration: Number,
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "completed"],
  },
  subject: String,
});

const sessionModel =
  models.session || model<SessionType>("session", sessionSchema);

export default sessionModel;
