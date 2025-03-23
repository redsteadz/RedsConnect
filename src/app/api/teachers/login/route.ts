import { connect } from "@/db/db";
import teacherModel from "@/models/teacher";
import { TeacherType } from "@/models/teacher";
import { NextRequest, NextResponse } from 'next/server'
import jwt from
  'jsonwebtoken'

await connect()

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    const teacher: TeacherType | null = await teacherModel.findOne({ email, password })
    if (teacher) {
      const token = jwt.sign({ id: teacher._id, type: "teacher" }, process.env.JWT_SECRET!, { expiresIn: '1h' })
      const resp: NextResponse = NextResponse.json({ message: "Teacher found", teacher, token }, { status: 200 })
      resp.cookies.set('token', token, { httpOnly: true, sameSite: 'strict' })
      return resp
    }
    return NextResponse.json({ message: "Teacher not found" }, { status: 404 })
  } catch (error) {
    console.log(error)
  }
}
