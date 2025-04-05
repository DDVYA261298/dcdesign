import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydb';

if (!mongoose.connection.readyState) {
  mongoose.connect(MONGODB_URI);
}

// Define the Project schema
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

export const dynamic = 'force-dynamic';


// GET /api/projects
export async function GET() {
  try {
    const projects = await Project.find();
    return NextResponse.json(projects);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

// POST /api/projects
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newProject = new Project(body);
    await newProject.save();
    return NextResponse.json(newProject);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
