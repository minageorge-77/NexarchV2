import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";
import { z } from "zod";
import { Resend } from "resend";

// Initialize Resend (with fallback for build time evaluation)
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_for_build');

// Define Zod schema for validation
const contactSchema = z.object({
  fullName: z.string().min(2, "Full name is required").max(100, "Full name is too long"),
  email: z.string().email("Invalid email address"),
  phone: z.string().max(20, "Phone number is too long").optional(),
  clinicName: z.string().min(2, "Clinic name is required").max(100, "Clinic name is too long"),
  interestedService: z.string().max(100, "Service name is too long").optional(),
  message: z.string().max(2000, "Message is too long").optional(),
});

// Simple In-Memory Rate Limiting
const rateLimit = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3;

function isRateLimited(ip) {
  const now = Date.now();
  const userRecord = rateLimit.get(ip);
  
  if (!userRecord) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  
  if (now > userRecord.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  
  if (userRecord.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  
  userRecord.count += 1;
  return false;
}

export async function POST(req) {
  try {
    // 1. Rate Limiting (using IP if available, fallback to a global limiter or specific header)
    const ip = req.headers.get('x-forwarded-for') || 'anonymous-ip';
    if (isRateLimited(ip)) {
      return NextResponse.json({ success: false, message: "Too many requests. Please try again later." }, { status: 429 });
    }

    // 2. Parse and Validate Input
    const body = await req.json();
    
    // Prevent empty submissions by checking body keys
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ success: false, message: "Empty submission is not allowed." }, { status: 400 });
    }

    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      // Return the first validation error
      const errorMessage = validationResult.error.errors[0].message;
      return NextResponse.json({ success: false, message: errorMessage }, { status: 400 });
    }

    const validData = validationResult.data;

    // 3. Save to MongoDB
    await dbConnect();
    const newMessage = await ContactMessage.create({
      fullName: validData.fullName,
      email: validData.email,
      phone: validData.phone || "",
      clinicName: validData.clinicName,
      interestedService: validData.interestedService || "",
      message: validData.message || "",
    });

    // 4. Send Email via Resend
    if (process.env.RESEND_API_KEY && process.env.ADMIN_NOTIFICATION_EMAIL) {
      const emailHtml = `
        <h2>New Consultation Request - NexArch</h2>
        <p><strong>Name:</strong> ${validData.fullName}</p>
        <p><strong>Email:</strong> ${validData.email}</p>
        <p><strong>Phone:</strong> ${validData.phone || 'N/A'}</p>
        <p><strong>Clinic Name:</strong> ${validData.clinicName}</p>
        <p><strong>Interested Service:</strong> ${validData.interestedService || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${validData.message ? validData.message.replace(/\n/g, '<br/>') : 'N/A'}</p>
      `;

      try {
        await resend.emails.send({
          from: 'NexArch Notifications <onboarding@resend.dev>', // Use onboarding@resend.dev for testing without verified domain
          to: process.env.ADMIN_NOTIFICATION_EMAIL,
          subject: 'New Consultation Request - NexArch',
          html: emailHtml,
        });
      } catch (emailError) {
        console.error("Failed to send email via Resend:", emailError);
        // We do not fail the request if the email fails, since the DB save was successful.
      }
    } else {
      console.warn("Resend API key or Admin Notification Email missing. Email not sent.");
    }

    // 5. Return Success
    return NextResponse.json({ success: true, message: "Message sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Contact Form API Error:", error);
    return NextResponse.json({ success: false, message: "An unexpected error occurred on the server." }, { status: 500 });
  }
}
