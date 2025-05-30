import { Metadata } from "next";
import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import Project from "@/models/Project";
import ProjectDetails from "@/components/projects/ProjectDetails";
import ProjectImages from "@/components/projects/ProjectImages";
import ProjectTeam from "@/components/projects/ProjectTeam";
import ProjectReviews from "@/components/projects/ProjectReviews";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  await connectToDatabase();
  const project = await Project.findById(params.id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Interior Design Portfolio`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  await connectToDatabase();

  const project = await Project.findById(params.id)
    .populate("employees")
    .populate("reviews");

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <ProjectDetails project={JSON.parse(JSON.stringify(project))} />
      <ProjectImages project={JSON.parse(JSON.stringify(project))} />
      <ProjectTeam project={JSON.parse(JSON.stringify(project))} />
      <ProjectReviews project={JSON.parse(JSON.stringify(project))} />
    </div>
  );
}
