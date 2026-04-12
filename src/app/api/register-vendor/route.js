import dbConnect from "@/lib/dbConnect";
import { Vendor } from "@/models/vendor";

import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();

  try {
    const {
      businessName,
      primary,
      description,
      department,
      logo,
      universityEmail,
    } = await req.json();

    const checkVendor = await Vendor.findOne({ email: universityEmail });

    if (checkVendor) {
      return NextResponse.json(
        { success: false, message: "A vendor with the email already exist" },
        { status: 404 },
      );
    }
    const registerVendor = new Vendor({
      businessName: businessName,
      focus: primary,
      email: universityEmail,
      logo: logo,
      description: description,
      department: department,
    });
    await registerVendor.save();
    return NextResponse.json(
      {
        success: true,
        message: "Vendor registration done successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("API Error", error);
    return NextResponse.json(
      { success: false, message: "Server error, try again" },
      { status: 500 },
    );
  }
}
