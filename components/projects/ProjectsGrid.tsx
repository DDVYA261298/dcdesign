"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import Link from "next/link"; // ✅ Add this at the top
import { Button } from "@/components/ui/button"; // ✅ this line fixes the error

interface Project {
  _id: string;
  title: string;
  description: string;
  images: string[];
  client: string;
  location: string;
  status: string;
  featured: boolean;
  category: string;
}

interface ProjectsGridProps {
  selectedCategory: string;
}

export default function ProjectsGrid({ selectedCategory }: ProjectsGridProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtered, setFiltered] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFiltered(projects);
    } else {
      setFiltered(projects.filter((p) => p.category === selectedCategory));
    }
  }, [selectedCategory, projects]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {filtered.map((project) => (
        <Card key={project._id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <CardContent className="p-0">
            <AspectRatio ratio={4 / 3}>
              <img
                src={project.images[0] || "/default.jpg"}
                alt={project.title}
                className="object-cover w-full h-full"
              />
            </AspectRatio>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2 p-4">
          
             <Badge variant="secondary">{project.status}</Badge>
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="text-sm text-gray-600">{project.description}</p>
              <Link href={`/projects/${project._id}`}>
                <Button className="mt-2" size="sm" variant="outline">
                  View Project
                </Button>
              </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
