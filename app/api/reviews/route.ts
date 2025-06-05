// /app/api/reviews/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase, Review, Project } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const projectId = url.searchParams.get("projectId");

    // 1) Ensure connection opened & schemas registered
    await connectToDatabase();

    // 2) Build query filter
    const query = projectId ? { projectId } : {};

    // 3) Use the Review model from lib/mongodb.ts
    const reviews = await Review.find(query)
      .sort({ createdAt: -1 })
      .populate("projectId", "title"); // populate via projectId reference

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  // Validate that body.project is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(body.project)) {
    return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
  }

  try {
    // 1) Connect and register models
    await connectToDatabase();

    // 2) Create a new Review using the central model
    const review = await Review.create({
      author: body.clientName,
      comment: body.text,
      rating: body.rating,
      projectId: new mongoose.Types.ObjectId(body.project),
    });

    // 3) (Optional) Push this review _id into the Project's reviews array
    await Project.findByIdAndUpdate(body.project, {
      $push: { reviews: review._id },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating review:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}
