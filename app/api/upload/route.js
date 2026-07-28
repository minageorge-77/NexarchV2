import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    // Validate type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ success: false, error: "Only image files are allowed" }, { status: 400 });
    }

    // Validate size (e.g. 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ success: false, error: "File exceeds 5MB size limit" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to Cloudinary using upload_stream
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "nexarch" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({
      success: true,
      data: {
        secure_url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      },
    }, { status: 201 });

  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json({ success: false, error: "Failed to upload image" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json({ success: false, error: "URL parameter is required" }, { status: 400 });
    }

    // Extract public_id from secure_url
    // Example url: https://res.cloudinary.com/demo/image/upload/v162817293/nexarch/sample_image.jpg
    // public_id would be 'nexarch/sample_image'
    const parts = url.split("/");
    const filenameWithExt = parts.pop();
    const folder = parts.pop();
    const publicId = `${folder}/${filenameWithExt.split(".")[0]}`;

    await cloudinary.uploader.destroy(publicId);

    return NextResponse.json({ success: true, message: "Image deleted" });
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete image" }, { status: 500 });
  }
}
