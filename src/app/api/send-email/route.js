import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

import { sendEmail } from "@/lib/sendEmail";
import { Accounts } from "@/models/accounts";


export async function POST(req) {
  try {
    const { listing, name, email, message, seller_email, seller_name } = await req.json();

    await dbConnect();

    const checkAccount = await Accounts.findOne({ email: seller_email });

    if (!checkAccount) {
      return NextResponse.json(
        { message: "Seller Account not found" },
        { status: 403 },
      );
    }
    const htmlContent = (listing, name, email, message, seller_name) => {
      return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Verification Token</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
      }
      .container {
        max-width: 1000px;
        margin: 20px auto;
        padding: 20px;
        border: 1px solid #eee;
        border-radius: 5px;
      }
      .header {
        text-align: center;
        margin-bottom: 20px;
      }
      .header h1 {
        color: #555;
        margin: 0;
      }
      .details {
        margin-bottom: 20px;
      }
      .details p {
        margin: 0 0 10px 0;
      }
      .details strong {
        display: inline-block;
        width: 100px;
      }
      .footer {
        font-size: 0.9em;
        color: #777;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>${listing} Purchase Request </h1>
      </div>

      <div class="details">
        <p>Hello ${seller_name},</p>
        <p><strong>${name}</strong> wants to purchase <strong>${listing}</strong>.</p>
        <p><strong>Student Mail</strong> ${email}.</p>
        <p><strong>Message</strong> ${message}.</p>
      </div>

      <div class="footer">
        <p>If you wish to proceed with the purchase, please contact the buyer at ${email}.</p>
        <p>Best regards,</p>
        <p>Peer 2 Peer</p>
      </div>
    </div>
  </body>
  </html>

        `;
    };

    const emailTemplate = htmlContent(listing, name, email, message, seller_name);
    await sendEmail({
      // to: ["qudusnurudeen9@gmail.com", email],
      to: ["qudusnurudeen9@gmail.com", seller_email],
      from: "Excited User <mailgun@sandboxf25fe5bd655642f6bcfc11377c890587.mailgun.org>",
      subject: `${listing} Purchase Request from ${name}`,
      html: emailTemplate,
    });
    return NextResponse.json(
      { success: true, message: "Purchase Request sent" },
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
