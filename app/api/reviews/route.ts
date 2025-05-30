import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Review from "@/models/Review";
import mongoose from "mongoose";
import cloudinary from "@/lib/cloudinary";


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

  const formData = await req.formData();

  const clientName = formData.get("clientName")?.toString() || "";
  const text = formData.get("text")?.toString() || "";
  const rating = parseInt(formData.get("rating")?.toString() || "0");
  const projectId = formData.get("project")?.toString() || "";
  const imageFile = formData.get("image") as File;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
  }

  let imageUrl = "";
  if (imageFile && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());

    imageUrl = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "reviews", resource_type: "image" },
        (err, result) => {
          if (err || !result) return reject(err);
          resolve(result.secure_url);
        }
      );
      stream.end(buffer);
    });
  }

  try {
    await connectToDatabase();
    const review = await Review.create({
      clientName,
      text,
      rating,
      image: imageUrl,
      project: projectId,
    });

    const Project = (await import("@/models/Project")).default;
    await Project.findByIdAndUpdate(projectId, { $push: { reviews: review._id } });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating review:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}
