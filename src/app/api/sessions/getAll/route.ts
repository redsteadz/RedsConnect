import { NextRequest, NextResponse } from "next/server";
import sessionModel, { SessionType } from "@/models/sessions";
import { getDatafromJWT } from "@/util/getDatafromJWT";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value || "";
    const type = req.cookies.get("type")?.value || "";
    if (!token) {
      return NextResponse.redirect("/login");
    }
    const stdID = getDatafromJWT(token).id;
    const sessions: SessionType[] = await sessionModel.find({
      studentId: stdID,
    }).populate("teacherId", "-password -email");
    return NextResponse.json(
      { message: "Sessions found", sessions },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
