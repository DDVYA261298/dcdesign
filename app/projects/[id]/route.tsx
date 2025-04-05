import { connectToDB } from '@/server/lib/mongodb';
import { Project } from '@/server/models/project';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
      await connectToDB();
      const projects = await Project.find();
      return NextResponse.json(projects);
    } catch (error) {
      console.error(error);
      return new NextResponse("Failed to fetch projects", { status: 500 });
    }
  }
  
  export async function POST(req: Request) {
    try {
      await connectToDB();
      const data = await req.json();
      const project = new Project(data);
      await project.save();
      return NextResponse.json({ message: 'Project added successfully' }, { status: 201 });
    } catch (error) {
      console.error(error);
      return new NextResponse("Failed to add project", { status: 500 });
    }
  }