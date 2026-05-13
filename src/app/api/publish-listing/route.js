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
      seller,
      location,
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
      location: location,
      seller: seller,
      email: email,
      status: "active",
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

export async function PUT(req) {
  try {
    const { _id, title, sub_category, description, price, image, listing_duration, location, status, seller } = await req.json();
    await dbConnect();
    const existingListing = await Listing.findByIdAndUpdate(_id, {
      title: title,
      sub_category: sub_category,
      description: description,
      price: price,
      image: image,
      listing_duration: listing_duration,
      location: location,
      seller: seller,
      status: status || "active",
    }, { new: true, runValidators: true });

    if (!existingListing) {
      return NextResponse.json(
        { success: false, message: "Listing not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Listing updated successfully", existingListing },
      { status: 200 },
    );
  } catch (error) {
    console.error("API PUT Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error, try again" },
      { status: 500 },
    );
  }
}

export async function DELETE(req) {
  try {
    const { _id } = await req.json();
    await dbConnect();
    const existingListing = await Listing.findByIdAndDelete(_id);
    if (!existingListing) {
      return NextResponse.json(
        { success: false, message: "Listing not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { success: true, message: "Listing deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("API DELETE Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error, try again" },
      { status: 500 },
    );
  }
}
