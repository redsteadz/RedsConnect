import { Schema , model, models } from 'mongoose';

//### Tutors Schema 
//names 
//qualifications
//bio 
//subjects
//hourlyRate
//availability
//teachingPref

export interface TeacherType {
  name: string;
  email: string;
  password: string;
  qualifications: string[];
  bio: string;
  yoe: number;
  subjects: string[];
  hourlyRate: number;
  availability: ("online" | "in-person" | "both")[];
}

const teacherSchema = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  qualifications: [{ type: String, required: true }],
  bio: { type: String, required: true },
  yoe: { type: Number, required: true },
  subjects: [{ type: String, required: true }],
  hourlyRate: { type: Number, required: true },
  availability: [{ type: String, enum: ["online", "in-person", "both"], required: true }],
})

const teacherModel = models.teacher ?? model("teacher", teacherSchema);

export default teacherModel;
