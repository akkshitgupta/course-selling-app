import { connectDB } from "../../../dbConfig/dbConfig";
import USER from "../../../models/userModel";
import { NextResponse } from "next/server";

connectDB();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { f_name, l_name, email, username, password } = reqBody;

    // check if user exists
    const user = await USER.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    const newUser = new USER({
      f_name,
      l_name,
      email,
      username,
      password,
    });

    const saved = await newUser.save();
    console.log(saved);

    return NextResponse.json({
      saved,
      message: "User created successfully",
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}