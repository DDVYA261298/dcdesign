// /app/api/reviews/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase, Review } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(params.id) ||
        !mongoose.Types.ObjectId.isValid(data.project)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await connectToDatabase();

    // Update only allowed fields
    const updatedReview = await Review.findByIdAndUpdate(
      params.id,
      {
        author: data.clientName,
        comment: data.text,
        rating: data.rating,
        projectId: new mongoose.Types.ObjectId(data.project),
      },
      { new: true, runValidators: true }
    );

    if (!updatedReview) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    return NextResponse.json(updatedReview);
  } catch (error) {
    console.error("❌ Error updating review:", error);
    return NextResponse.json(
      { error: "Failed to update review" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  await connectToDatabase();
  const deleted = await Review.findByIdAndDelete(params.id);

  if (!deleted) {
    return NextResponse.json({ error: "Review not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
