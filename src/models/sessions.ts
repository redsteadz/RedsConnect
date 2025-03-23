import { Schema , model, models } from 'mongoose';

// This is the schema that holds information about the session  
export interface SessionType {
  // The two ppls within the session
  teacherId: {type: Schema.Types.ObjectId, ref: "teacher"};
  studentId: {type: Schema.Types.ObjectId, ref: "student"};
  // The date and time of the session
  dateTime: Date;
  duration: number;
  // The status of the session
  status: {type: string, enum: ["pending", "accepted", "rejected", "completed"]};
  subject: string;
}
