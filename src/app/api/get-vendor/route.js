import dbConnect from "@/lib/dbConnect";
import { Vendor } from "@/models/vendor";

import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  try {
    const getVendor = await Vendor.findOne({ email }).sort({ _id: -1 }).exec();

    if (!getVendor) {
      return NextResponse.json({ message: "No vendor found" }, { status: 404 });
    }

    return NextResponse.json({ status: 200, data: getVendor, success: true });
  } catch (error) {
    console.error("API Error", error);
    return NextResponse.json(
      { success: false, message: "Server error, try again" },
      { status: 500 },
    );
  }
}
