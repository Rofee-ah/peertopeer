import dbConnect from "@/lib/dbConnect";
import { Listing } from "@/models/listing";

import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  try {
    const getListing = await Listing.find();

    // const filteredListing =
    //   getListing && getListing.filter((item) => item.email === email);

    if (!getListing) {
      return NextResponse.json(
        { message: "No Listing found" },
        { status: 404 },
        { success: false },
      );
    }

    return NextResponse.json({
      status: 201,
      data: getListing,
      success: true,
    });
  } catch (error) {
    console.error("API Error", error);
    return NextResponse.json(
      { success: false, message: "Server error, try again" },
      { status: 500 },
    );
  }
}
