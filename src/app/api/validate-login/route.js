import { NextResponse } from "next/server";

import { Accounts } from "@/models/accounts";
import dbConnect from "@/lib/dbConnect";

export async function POST(req) {
  try {
    await dbConnect();

    const { email, password: userPassword } = await req.json();
    const checkAccount = await Accounts.findOne({ email });
    if (!checkAccount) {
      return NextResponse.json(
        { success: false, message: "user not found" },
        { status: 404 },
      );
    }
    if (userPassword !== checkAccount.password) {
      return NextResponse.json(
        {
          success: false,
          message: "incorrect user password",
        },
        { status: 503 },
      );
    }
    const { $__, $isNew, ...data } = checkAccount;
    const { createdAt, password, __v, _id, ...rest } = data;
    return NextResponse.json(
      {
        success: true,
        data: rest,
        message: "Login successfull",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("API Error", error);
    return NextResponse.json(
      {
        success: false,
        message: "server error, try again",
      },
      { status: 500 },
    );
  }
}
