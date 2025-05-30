// app/api/employees/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Employee from "@/models/Employee";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function GET(req: NextRequest) {
  await connectToDatabase();
  const employees = await Employee.find().sort({ createdAt: -1 });
  return NextResponse.json(employees);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const fields: Record<string, any> = {};

  for (const [key, value] of formData.entries()) {
    if (key !== "image") fields[key] = value;
  }

  const file = formData.get("image") as File;
  if (file && file.name) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${uuidv4()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await writeFile(`${uploadDir}/${filename}`, new Uint8Array(buffer));
    fields.image = `/uploads/${filename}`;
  }

  await connectToDatabase();
  const employee = new Employee(fields);
  await employee.save();

  return NextResponse.json(employee, { status: 201 });
}