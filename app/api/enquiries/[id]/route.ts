import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const result = await Enquiry.findByIdAndDelete(params.id);

    if (!result) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Enquiry deleted" }, { status: 200 });
  } catch (error) {
    console.error("Delete enquiry error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}