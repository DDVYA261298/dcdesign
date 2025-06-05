import path from "path";
import { v4 as uuid } from "uuid";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Project from "@/models/Project";
// import { uploadToS3 } from "@/lib/s3"; // ✅ S3 upload helper
import { unlink } from "fs/promises"; // still used for fallback local cleanup
import fs from "fs";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const data: Record<string, any> = {};
    const newImages: string[] = [];
    const newVideos: string[] = [];

    // Extract all form fields except images/videos
    for (const [key, value] of formData.entries()) {
      if (key !== "images" && key !== "videos") {
        data[key] = value;
      }
    }

    // These are URLs already uploaded
    const imageUrls = formData.getAll("images").map(item => item.toString());
    const videoUrls = formData.getAll("videos").map(item => item.toString());

    newImages.push(...imageUrls);
    newVideos.push(...videoUrls);

    await connectToDatabase();
    const existing = await Project.findById(params.id);
    if (!existing) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    data.images = [...(existing.images || []), ...newImages];
    data.videos = [...(existing.videos || []), ...newVideos];

    const updated = await Project.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json(updated, { status: 200 });

  } catch (err) {
    console.error("❌ PUT error:", err);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = context;
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();

  const project = await Project.findById(params.id);
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  // ⚠️ Optional cleanup: Remove old local files (for backward compatibility only)
  const mediaFiles = [...(project.images || []), ...(project.videos || [])];
  for (const fileUrl of mediaFiles) {
    if (fileUrl.startsWith("/uploads/")) {
      try {
        const fullPath = path.join(process.cwd(), "public", fileUrl);
        if (fs.existsSync(fullPath)) {
          await unlink(fullPath);
        }
      } catch (err) {
        console.warn(`Failed to delete local file: ${fileUrl}`, err);
      }
    }
    // ⚠️ If you want to delete from S3 as well, we can add that later
  }

  await project.deleteOne();

  return NextResponse.json({ success: true });
}
