// app/api/employees/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Employee from "@/models/Employee";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const employee = await Employee.findById(params.id);
  if (!employee) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(employee);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const updates: any = {};

  for (const [key, value] of formData.entries()) {
    if (key !== "image") updates[key] = value;
  }

  const file = formData.get("image") as File;
  if (file && file.size > 0) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${uuidv4()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await writeFile(`${uploadDir}/${filename}`, new Uint8Array(buffer));
    updates.image = `/uploads/${filename}`;
  }

  await connectToDatabase();
  const updated = await Employee.findByIdAndUpdate(params.id, updates, {
    new: true,
    runValidators: true,
  });

  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();
  const deleted = await Employee.findByIdAndDelete(params.id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}