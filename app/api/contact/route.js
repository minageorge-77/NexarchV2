import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    
    // In a real application, you would send an email using SendGrid/Nodemailer
    // or save the contact submission to the database here.
    console.log("New Consultation Request:", body);

    return NextResponse.json({ success: true, message: "Message sent successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
