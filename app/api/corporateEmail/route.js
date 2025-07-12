import { Resend } from "resend";
import { NextResponse } from "next/server";
import CorporateBookingConfirmationEmail from "@/emails/email"; 

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL="mgoodhealthcare@gmail.com"

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Received form data on server:", body);

    const { email, companyName } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

 
    const data = await resend.emails.send({
  
      from: "MGood Corporate <support@mgood.org>",
      
    
      to: [email,ADMIN_EMAIL],
      
      subject: `MGood Health Plan Booking for ${companyName}`,
      

      react: CorporateBookingConfirmationEmail({ ...body }),
    });


    return NextResponse.json({ message: "Email sent successfully!", data });

  } catch (error) {

    console.error("Error sending email:", error);
    return NextResponse.json({ error: "An error occurred while sending the email." }, { status: 500 });
  }
}