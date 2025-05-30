// app/api/enquiries/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";

// GET all enquiries (optional: for admin)
// app/api/enquiries/route.ts
export async function GET() {
  await connectToDatabase();
  const enquiries = await Enquiry.find().sort({ createdAt: -1 });
  return NextResponse.json(enquiries);
}

// POST a new enquiry (used by the contact form)
// export async function POST(req: NextRequest) {
//   const data = await req.json();
//   await connectToDatabase();

//   const enquiry = await Enquiry.create({
//     name: data.name,
//     email: data.email,
//     message: data.message,
//     isRead: false,
//   });

//   return NextResponse.json(enquiry, { status: 201 });
// }