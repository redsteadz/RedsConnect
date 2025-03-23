import { Schema , model, models } from 'mongoose';

export interface ReviewType {
  _id?: string;
  teacherId: {type: Schema.Types.ObjectId, ref: "teacher"};
  studentId: {type: Schema.Types.ObjectId, ref: "student"};
  rating: {type: number, min: 1, max: 5};
  review: string;
}
