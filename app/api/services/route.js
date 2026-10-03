import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";

export async function GET() {
  try {
    await connectDB();
    const services = await Service.find({}).sort({ createdAt: -1 }).limit(100);
    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    console.error("Services GET Error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // Explicitly destructure
    const newService = {
      title: body.title,
      slug: body.slug,
      shortDescription: body.shortDescription,
      description: body.description,
      icon: body.icon || "",
      imageUrl: body.imageUrl || "",
      features: Array.isArray(body.features) ? body.features : [],
      order: Number(body.order) || 0,
      status: body.status || "draft",
    };

    const service = await Service.create(newService);
    return NextResponse.json({ success: true, data: service }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create service" }, { status: 400 });
  }
}
