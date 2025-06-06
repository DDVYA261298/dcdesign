// app/api/reviews/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Review from "@/models/Review";

// export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
//   const session = await getServerSession(authOptions);
//   if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const body = await req.json();
//   await connectToDatabase();

//   const updated = await Review.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
//   if (!updated) return NextResponse.json({ error: "Review not found" }, { status: 404 });

//   return NextResponse.json(updated);
// }


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
    await connectToDatabase();

    // ✅ Ensure project is a valid ObjectId
    const updatedReview = await Review.findByIdAndUpdate(
      params.id,
      {
        clientName: data.clientName,
        text: data.text,
        rating: data.rating,
        project: new mongoose.Types.ObjectId(data.project),
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


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();
  const deleted = await Review.findByIdAndDelete(params.id);

  if (!deleted) return NextResponse.json({ error: "Review not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}