import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();
    
    // Explicitly destructure to prevent NoSQL operator injection
    const updateData = {};
    if (body.title !== undefined) updateData.title = body.title;
    if (body.slug !== undefined) updateData.slug = body.slug;
    if (body.shortDescription !== undefined) updateData.shortDescription = body.shortDescription;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.icon !== undefined) updateData.icon = body.icon;
    if (body.imageUrl !== undefined) updateData.imageUrl = body.imageUrl;
    if (body.features !== undefined) updateData.features = body.features;
    if (body.order !== undefined) updateData.order = body.order;
    if (body.status !== undefined) updateData.status = body.status;

    const service = await Service.findByIdAndUpdate(params.id, { $set: updateData }, {
      new: true,
      runValidators: true,
    });
    if (!service) {
      return NextResponse.json({ success: false, error: "Service not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: service });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const service = await Service.findByIdAndDelete(params.id);
    if (!service) {
      return NextResponse.json({ success: false, error: "Service not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
