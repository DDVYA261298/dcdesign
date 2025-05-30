import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const updated = await Enquiry.findByIdAndUpdate(
      params.id,
      { isRead: true },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Marked as read" }, { status: 200 });
  } catch (error) {
    console.error("Mark as read error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}