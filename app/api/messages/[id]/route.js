import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";

export async function PATCH(req, { params }) {
  try {
    await dbConnect();
    const { status } = await req.json();
    const message = await ContactMessage.findByIdAndUpdate(
      params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!message) return NextResponse.json({ success: false, message: "Message not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: message }, { status: 200 });
  } catch (error) {
    console.error("Update Message Error:", error);
    return NextResponse.json({ success: false, message: "Failed to update message" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const message = await ContactMessage.findByIdAndDelete(params.id);
    if (!message) return NextResponse.json({ success: false, message: "Message not found" }, { status: 404 });
    return NextResponse.json({ success: true, message: "Deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Delete Message Error:", error);
    return NextResponse.json({ success: false, message: "Failed to delete message" }, { status: 500 });
  }
}
