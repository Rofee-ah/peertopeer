import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

import { sendEmail } from "@/lib/sendEmail";
import { Accounts } from "@/models/accounts";

import { Token } from "@/models/token";

export async function POST(req) {
  try {
    const { token, email } = await req.json();

    await dbConnect();

    if (!token || !email) {
      return NextResponse.json(
        { success: false, message: "Missing token or email" },
        { status: 400 },
      );
    }
    const checkAccount = await Accounts.findOne({ email });

    if (checkAccount) {
      return NextResponse.json(
        { message: "Account already exist, Login in" },
        { status: 503 },
      );
    }
    const htmlContent = (code) => {
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
        max-width: 600px;
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
        <h1>Your Authentication Code</h1>
      </div>

      <div class="details">
        <p>Hello,</p>
        <p>Please use the following code <strong> ${code} </strong>to complete your process.</p>
      </div>

      <div class="footer">
        <p>If you did not request for this code please avoid sharing it, Thank you.</p>
        <p>Best regards,</p>
        <p>Peer 2 Peer</p>
      </div>
    </div>
  </body>
  </html>

        `;
    };

    const saveToken = new Token({
      token: token,
      email: email,
    });
    await saveToken.save();
    const emailTemplate = htmlContent(token);
    await sendEmail({
      // to: ["qudusnurudeen9@gmail.com", email],
      to: ["qudusnurudeen9@gmail.com", email],
      from: "Excited User <mailgun@sandboxf25fe5bd655642f6bcfc11377c890587.mailgun.org>",
      subject: "Authentication Code",
      html: emailTemplate,
    });
    return NextResponse.json(
      { success: true, message: "Verification Token sent" },
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
