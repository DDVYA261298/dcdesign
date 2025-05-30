// // app/api/contact/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { connectToDatabase } from "@/lib/mongodb";
// import Contact from "@/models/Contact";

// export async function GET() {
//   try {
//     await connectToDatabase();
//     const Contact = (await import("@/models/Contact")).default;
//     const messages = await Contact.find().sort({ createdAt: -1 });
//     return NextResponse.json(messages);
//   } catch (error) {
//     console.error("❌ Error fetching contact:", error);
//     return NextResponse.json({ error: "Failed to load enquiries" }, { status: 500 });
//   }
// }


// export async function POST(req: NextRequest) {
//   try {
//     const { name, email, message } = await req.json();

//     if (!name || !email || !message) {
//       return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//     }

//     await connectToDatabase();
//     await Contact.create({ name, email, message });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("❌ Contact POST error:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }
// app/api/contact/route.ts

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry"; // make sure this is correct

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectToDatabase();

    const enquiry = await Enquiry.create({
      name: body.name,
      email: body.email,
      message: body.message,
      isRead: false,
    });

    return NextResponse.json({ success: true, enquiry });
  } catch (error) {
    console.error("Failed to save enquiry:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}