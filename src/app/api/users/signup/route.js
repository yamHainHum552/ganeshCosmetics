export const dynamic = "force-dynamic";
import { connectToMongo } from "@/models/db";
import { Admin } from "@/models/userModel";
import { NextResponse } from "next/server";
const bcrypt = require("bcrypt");
// Signup

export async function POST(req, res) {
  try {
    await connectToMongo();
    const payload = await req.json();
    const { userName, password } = payload;
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const admin = new Admin({
      userName,
      password: hashedPassword,
    });
    await admin.save();
    return NextResponse.json({ result: admin });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
