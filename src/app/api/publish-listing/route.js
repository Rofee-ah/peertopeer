import dbConnect from "@/lib/dbConnect";

import { NextResponse } from "next/server";
import { Listing } from "@/models/listing";

export async function POST(req) {
  try {
    const {
      title,
      category,
      subCategory,
      description,
      price,
      image,
      duration,
      email,
    } = await req.json();
    await dbConnect();
    const saveListing = new Listing({
      title: title,
      category: category,
      sub_category: subCategory,
      price: price,
      listing_duration: duration,
      description: description,
      image: image,
      email: email,
    });
    await saveListing.save();
    return NextResponse.json(
      {
        success: true,
        message: "Listing successfully published",
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
