import dbConnect from "@/lib/dbConnect";

import { NextResponse } from "next/server";
import { Accounts } from "@/models/accounts";

export async function PUT(req) {
  try {
    const { _id } = await req.json();

    await dbConnect();
    const updateAccount = await Accounts.findByIdAndUpdate(
      _id,
      { $set: { isVendor: true } },
      { new: true, runValidators: true },
    );
    await updateAccount.save();
    return NextResponse.json(
      {
        success: true,
        data: updateAccount,
        message: "Account updated successfully",
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
