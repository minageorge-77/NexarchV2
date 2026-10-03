import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();
    
    // Explicitly destructure to prevent NoSQL operator injection
    const updateData = {};
    if (body.clientName !== undefined) updateData.clientName = body.clientName;
    if (body.clientTitle !== undefined) updateData.clientTitle = body.clientTitle;
    if (body.company !== undefined) updateData.company = body.company;
    if (body.imageUrl !== undefined) updateData.imageUrl = body.imageUrl;
    if (body.content !== undefined) updateData.content = body.content;
    if (body.rating !== undefined) updateData.rating = body.rating;
    if (body.featured !== undefined) updateData.featured = body.featured;
    if (body.order !== undefined) updateData.order = body.order;
    if (body.status !== undefined) updateData.status = body.status;

    const testimonial = await Testimonial.findByIdAndUpdate(params.id, { $set: updateData }, {
      new: true,
      runValidators: true,
    });
    if (!testimonial) {
      return NextResponse.json({ success: false, error: "Testimonial not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: testimonial });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const testimonial = await Testimonial.findByIdAndDelete(params.id);
    if (!testimonial) {
      return NextResponse.json({ success: false, error: "Testimonial not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
