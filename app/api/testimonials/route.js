import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

export async function GET() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 }).limit(100);
    return NextResponse.json({ success: true, data: testimonials });
  } catch (error) {
    console.error("Testimonials GET Error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    
    // Explicitly destructure to prevent unexpected fields
    const newTestimonial = {
      clientName: body.clientName,
      clientTitle: body.clientTitle,
      company: body.company || "",
      imageUrl: body.imageUrl || "",
      content: body.content,
      rating: Number(body.rating) || 5,
      featured: Boolean(body.featured),
      order: Number(body.order) || 0,
      status: body.status || "draft",
    };

    const testimonial = await Testimonial.create(newTestimonial);
    return NextResponse.json({ success: true, data: testimonial }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create testimonial" }, { status: 400 });
  }
}
