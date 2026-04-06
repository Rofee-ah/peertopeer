/* eslint-disable @typescript-eslint/no-explicit-any */
import mailgun from "mailgun-js";

const mailgunClient = mailgun({
  apiKey: process.env.NEXT_PUBLIC_MAILGUN_API_KEY,
  domain: process.env.NEXT_PUBLIC_MAILGUN_DOMAIN,
});

export const sendEmail = async ({ to, from, subject, html, attachment }) => {
  const emailData = {
    from,
    to,
    subject,
    html,
    attachment,
  };

  try {
    const result = await mailgunClient.messages().send(emailData);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
