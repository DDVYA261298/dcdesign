import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { uploadToS3 } from "@/lib/s3";
import Project from "@/models/Project";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const projects = await Project.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("❌ Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log("Received POST");

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const client = formData.get("client") as string;
    const location = formData.get("location") as string;
    const status = formData.get("status") as string;
    const completedDate = formData.get("completedDate") as string;
    const featured = formData.get("featured") === "true";
    const category = formData.get("category") as string;

    const imageFiles = formData.getAll("images") as File[];
    const videoFiles = formData.getAll("videos") as File[];

    if (!title || !description || !client || !location || !category || imageFiles.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const imageUrls = await Promise.all(
      imageFiles.map(file =>
        uploadToS3(file, "dcdesign/projects/images", file.type)
      )
    );

    const videoUrls = await Promise.all(
      videoFiles.map(file =>
        uploadToS3(file, "dcdesign/projects/videos", file.type)
      )
    );

    await connectToDatabase();

    const newProject = await Project.create({
      title,
      description,
      client,
      location,
      status: status || "ongoing",
      completedDate: completedDate || null,
      featured,
      category,
      images: imageUrls,
      videos: videoUrls,
      createdAt: new Date(),
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("POST /api/projects failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
