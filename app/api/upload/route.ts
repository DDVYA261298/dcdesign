// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Save file temporarily
    const buffer = Buffer.from(await file.arrayBuffer());
    const tempFilename = `${randomUUID()}-${file.name}`;
    const tempPath = path.join("/tmp", tempFilename);
    await writeFile(tempPath, new Uint8Array(buffer));

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(tempPath, {
      folder: "portfolio_uploads",
    });

    return NextResponse.json({ url: result.secure_url }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
