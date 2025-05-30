import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Project from "@/models/Project";
import Review from "@/models/Review";
import Employee from "@/models/Employee";

export async function GET(req: NextRequest) {
  await connectToDatabase();

  const [totalProjects, totalEmployees, totalReviews, activeProjects] = await Promise.all([
    Project.countDocuments(),
    Employee.countDocuments(),
    Review.countDocuments(),
    Project.countDocuments({ status: "ongoing" }),
  ]);

  return NextResponse.json({
    totalProjects,
    totalEmployees,
    totalReviews,
    activeProjects,
  });
}