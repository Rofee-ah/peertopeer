import dbConnect from "@/lib/dbConnect";

import { NextResponse } from "next/server";
import { Accounts } from "@/models/accounts";

export async function POST(req) {
  try {
    const { firstName, lastName, verified, password, email } = await req.json();
    await dbConnect();
    const saveAccount = new Accounts({
      firstName: firstName,
      lastName: lastName,
      email: email,
      verified: verified,
      password: password,
    });
    await saveAccount.save();
    return NextResponse.json(
      {
        success: true,
        message: "Account successfully created",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error, try again" },
      { status: 500 },
    );
  }
}
