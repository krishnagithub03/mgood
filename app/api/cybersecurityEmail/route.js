import { Resend } from "resend";
import { NextResponse } from "next/server";
import CybersecurityConfirmationEmail from "@/emails/cybersecurity-email"; 

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL = "mgoodhealthcare@gmail.com";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Received cybersecurity form data on server:", body);

    const { email, name } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: "MGood Cybersecurity <support@mgood.org>",
      to: [email, ADMIN_EMAIL],
      subject: `MGood Cybersecurity Inquiry from ${name || 'Customer'}`,
      react: CybersecurityConfirmationEmail({ ...body }),
    });

    return NextResponse.json({ message: "Email sent successfully!", data });

  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "An error occurred while sending the email." }, { status: 500 });
  }
}

