"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading projects...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
      {filtered.map((project, index) => (
        <motion.div
          key={project._id}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="overflow-hidden shadow-lg border hover:shadow-xl transition-shadow duration-300 group">
            <CardContent className="p-0 relative">
              <AspectRatio ratio={4 / 3}>
                <img
                  src={project.images[0] || "/default.jpg"}
                  alt={project.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </AspectRatio>
              {project.featured && (
                <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded shadow">
                  ⭐ Featured
                </span>
              )}
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-2 p-4">
              <Badge
                className={`capitalize ${
                  project.status === "completed"
                    ? "bg-green-500"
                    : "bg-blue-500"
                } text-white`}
              >
                {project.status}
              </Badge>
              <h3 className="text-lg font-bold">{project.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
              <Link href={`/projects/${project._id}`} className="w-full">
                <Button size="sm" variant="outline" className="w-full">
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
