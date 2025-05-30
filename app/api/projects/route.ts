import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import Project from "@/models/Project";


export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .lean(); // Optional but returns plain JSON instead of Mongoose objects

    return NextResponse.json(projects); // 👈 returns plain array
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const fields: Record<string, any> = {};
  const imageFiles = formData.getAll("images") as File[];
  const videoFiles = formData.getAll("videos") as File[];

  // Parse basic fields
  for (const [key, value] of formData.entries()) {
    if (key !== "images" && key !== "videos") {
      fields[key] = value;
    }
  }

  // Cloudinary Upload Helpers
  const uploadToCloudinary = async (file: File, resourceType: "image" | "video") => {
    const buffer = Buffer.from(await file.arrayBuffer());

    return await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: resourceType, folder: "dcdesign/projects" },
        (err: any, result: any) => {
          if (err) reject(err);
          else resolve(result?.secure_url);
        }
      ).end(buffer);
    });
  };

  // Upload images
  const imageUrls = await Promise.all(
    imageFiles.map((file) => uploadToCloudinary(file, "image"))
  );

  // Upload videos
  const videoUrls = await Promise.all(
    videoFiles.map((file) => uploadToCloudinary(file, "video"))
  );

  await connectToDatabase();

  const project = await Project.create({
    ...fields,
    featured: fields.featured === "true",
    status: fields.status || "ongoing",
    completedDate: fields.completedDate || null,
    images: imageUrls,
    videos: videoUrls,
  });

  return NextResponse.json(project, { status: 201 });
}