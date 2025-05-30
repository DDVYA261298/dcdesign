import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Project from "@/models/Project";
import fs from "fs/promises";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const data: Record<string, any> = {};
  const newImages: string[] = [];
  const newVideos: string[] = [];

  for (const [key, value] of formData.entries()) {
    if (key !== "images" && key !== "videos") {
      data[key] = value;
    }
  }

  const imageFiles = formData.getAll("images") as File[];
  const videoFiles = formData.getAll("videos") as File[];

  const uploadDir = path.join(process.cwd(), "public", "uploads");

  for (const file of imageFiles) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${uuid()}-${file.name}`;
    await writeFile(path.join(uploadDir, filename), new Uint8Array(buffer));
    newImages.push(`/uploads/${filename}`);
  }

  for (const file of videoFiles) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${uuid()}-${file.name}`;
    await writeFile(path.join(uploadDir, filename), new Uint8Array(buffer));
    newVideos.push(`/uploads/${filename}`);
  }

  await connectToDatabase();
  const existing = await Project.findById(params.id);
  if (!existing) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  data.images = [...existing.images, ...newImages];
  data.videos = [...existing.videos, ...newVideos];

  const updated = await Project.findByIdAndUpdate(params.id, data, {
    new: true,
    runValidators: true,
  });

  return NextResponse.json(updated);
}
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();

  const project = await Project.findById(params.id);
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  // Optional: remove associated image/video files from "public/uploads"
  const mediaFiles = [...(project.images || []), ...(project.videos || [])];
  for (const filePath of mediaFiles) {
    try {
      const fullPath = path.join(process.cwd(), "public", filePath);
      await fs.unlink(fullPath); // Delete file if it exists
    } catch (err) {
      console.warn(`Failed to delete file: ${filePath}`, err);
      // Continue even if some files fail to delete
    }
  }

  await project.deleteOne();

  return NextResponse.json({ success: true });
}