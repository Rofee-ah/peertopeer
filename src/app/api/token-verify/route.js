import dbConnect from "@/lib/dbConnect";
import { Token } from "@/models/token";

import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  try {
    const latestEntries = await Token.find({ email })
      .sort({ _id: -1 })
      .limit(2)
      .exec();

    if (latestEntries.length < 2) {
      return NextResponse.json({ message: "No entry found" }, { status: 404 });
    }

    const data = latestEntries.map((entry) => entry.token)
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("API Error", error);
    return NextResponse.json(
      { success: false, message: "Server error, try again" },
      { status: 500 },
    );
  }
}
