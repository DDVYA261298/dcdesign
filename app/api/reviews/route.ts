import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Review from "@/models/Review";
import mongoose from "mongoose";


export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const projectId = url.searchParams.get("projectId");
    
    await connectToDatabase();
    
    const query = projectId ? { project: projectId } : {};
    
    const reviews = await Review.find(query)
      .sort({ createdAt: -1 })
      .populate("project", "title");
    
    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

// export async function POST(req: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions);
    
//     if (!session) {
//       return NextResponse.json(
//         { error: "Unauthorized" },
//         { status: 401 }
//       );
//     }
    
//     const data = await req.json();
//     await connectToDatabase();
    
//     const review = new Review(data);
//     await review.save();
    
//     // Update the project to include this review
//     const Project = (await import("@/models/Project")).default;
//     await Project.findByIdAndUpdate(
//       data.project,
//       { $push: { reviews: review._id } }
//     );
    
//     return NextResponse.json(review, { status: 201 });
//   } catch (error) {
//     console.error("Error creating review:", error);
//     return NextResponse.json(
//       { error: "Failed to create review" },
//       { status: 500 }
//     );
//   }
// }


export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  if (!mongoose.Types.ObjectId.isValid(body.project)) {
    return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const review = await Review.create({
      clientName: body.clientName,
      text: body.text,
      rating: body.rating,
      project: body.project,
    });

    // Optional: update the project with this review ID
    const Project = (await import("@/models/Project")).default;
    await Project.findByIdAndUpdate(body.project, { $push: { reviews: review._id } });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating review:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}