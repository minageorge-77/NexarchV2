import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import PageView from "@/models/PageView";
import crypto from "crypto";

export async function POST(req) {
  try {
    const body = await req.json();
    let { path, sessionId } = body;

    // Validate path
    if (!path || typeof path !== "string") {
      return NextResponse.json({ success: false, error: "Invalid path" }, { status: 400 });
    }

    // Optional basic path sanitization (keep it simple)
    if (path.length > 500) {
      path = path.substring(0, 500);
    }

    // Check/Create session ID
    if (!sessionId || typeof sessionId !== "string") {
      sessionId = crypto.randomUUID();
    }

    // Save asynchronously to DB - don't await strictly to not block tracking response? 
    // It's a lightweight POST request, awaiting is fine for reliability and Vercel/serverless environments.
    await connectMongo();
    await PageView.create({ path, sessionId });

    return NextResponse.json({ success: true, sessionId });
  } catch (error) {
    console.error("Error tracking page view:", error);
    // Return 200 anyway so we don't spam client console with errors for analytics
    return NextResponse.json({ success: false });
  }
}
