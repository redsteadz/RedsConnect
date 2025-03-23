import { connect } from "@/db/db";
import stdModel from "@/models/student";
import { StudentType } from "@/models/student";
import teacherModel from "@/models/teacher";
import { TeacherType } from "@/models/teacher";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

await connect();

export async function POST(req: NextRequest) {
  try {
    const { email, password, type } = await req.json();
    let profile: StudentType | TeacherType | null = null;
    if (type === "student") {
      profile = await stdModel.findOne({ email });
    } else if (type === "teacher") {
      profile = await teacherModel.findOne({ email });
    }
    console.log(profile, type);
    if (profile) {
      // Compare the password from the request with the hashed password from the database
      const match = await bcrypt.compare(password, profile.password);
      if (!match) {
        return NextResponse.json(
          { message: "Invalid email or password" },
          { status: 401 },
        );
      }
      const token = jwt.sign(
        { id: profile._id, type },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" },
      );
      const resp: NextResponse = NextResponse.json(
        { message: "Profile found", profile, token },
        { status: 200 },
      );
      resp.cookies.set("token", token, { httpOnly: true, sameSite: "strict" });
      resp.cookies.set("type", type, { httpOnly: true, sameSite: "strict" });
      return resp;
    }
    return NextResponse.json({ message: "Profile not found" }, { status: 404 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
