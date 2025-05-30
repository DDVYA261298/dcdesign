"use client";

import { useState } from "react";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import ProjectsFilter from "@/components/projects/ProjectsFilter";

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold text-gray-900">Our Projects</h1>
      <ProjectsFilter onSelectCategory={setSelectedCategory} />
      <ProjectsGrid selectedCategory={selectedCategory} />
    </div>
  );
}
