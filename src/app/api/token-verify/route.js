import dbConnect from "@/lib/dbConnect";
import { Token } from "@/models/token";

import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  try {
    const latestEntry = await Token.findOne({ email }).sort({ _id: -1 }).exec();

    if (!latestEntry) {
      return NextResponse.json({ message: "No entry found" }, { status: 404 });
    }

    return NextResponse.json(latestEntry, { status: 200 });
  } catch (error) {
    console.error("API Error", error);
    return NextResponse.json(
      { success: false, message: "Server error, try again" },
      { status: 500 },
    );
  }
}
