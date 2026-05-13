import dbConnect from "@/lib/dbConnect";
import { Listing } from "@/models/listing";

import { NextResponse } from "next/server";

export async function PATCH(req) {
  await dbConnect();
  const { id, count } = await req.json();
  try {
    const updateListing = await Listing.findByIdAndUpdate(id, { count }, { new: true, runValidators: true });

    if (!updateListing) {
      return NextResponse.json(
        { message: "No Listing found" },
        { status: 404 },
        { success: false },
      );
    }

    return NextResponse.json({
      status: 201,
      data: updateListing,
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
