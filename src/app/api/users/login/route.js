import { connectToMongo } from "@/models/db";
import { Admin } from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req, res) {
  try {
    await connectToMongo();
    const payload = await req.json();
    const { userName, password } = payload;
    const admin = await Admin.findOne({ userName });
    if (!admin) {
      return NextResponse.json({
        result: "Admin doesn't exists",
        success: false,
      });
    }

    if (!(await bcrypt.compare(password, admin.password))) {
      return NextResponse.json({ result: "Invalid Password", success: false });
    }
    // create token data
    const tokenData = {
      id: admin._id,
      userName: admin.userName,
    };
    const token = await jwt.sign(tokenData, process.env.MY_TOKEN, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successfully",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value || "";
    if (!token) {
      return NextResponse.json({ result: "No User Found", success: false });
    }
    const verifedToken = await jwt.verify(token, process.env.MY_TOKEN);
    const user = await Admin.findOne({ _id: verifedToken.id });

    return NextResponse.json({ result: "User Found", success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
