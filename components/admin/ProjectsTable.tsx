"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus } from "lucide-react";
import AddEditProjectModal from "./AddEditProjectModal";

interface Project {
  _id: string;
  title: string;
  client: string;
  location: string;
  date: string;
  status: string;
  category: string; 
  description?: string;
}

export default function ProjectsTable() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
  
      // If response is not ok, read text to diagnose
      if (!res.ok) {
        const errorText = await res.text();
        console.error("❌ Failed to fetch projects:", res.status, errorText);
        setProjects([]); // fallback
        return;
      }
  
      // Check content-type to make sure it's JSON
      const contentType = res.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        console.error("❌ Invalid response format (not JSON)");
        setProjects([]);
        return;
      }
  
      const result = await res.json();
      if (Array.isArray(result)) {
        setProjects(result);
      } else if (Array.isArray(result.projects)) {
        setProjects(result.projects);
      } else {
        console.error("Unexpected response format:", result);
        setProjects([]);
      }
    } catch (error) {
      console.error("❌ Network error:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };
  

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) fetchProjects();
  };

  const openCreateModal = () => {
    setMode("create");
    setSelectedProject(null);
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setMode("edit");
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Button onClick={openCreateModal} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Project
        </Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Client</th>
                <th className="px-4 py-2 text-left">Location</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id} className="border-t">
                  <td className="px-4 py-2">{project.title}</td>
                  <td className="px-4 py-2">{project.client}</td>
                  <td className="px-4 py-2">{project.location}</td>
                  <td className="px-4 py-2">{project.date}</td>
                  <td className="px-4 py-2">{project.status}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => openEditModal(project)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(project._id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddEditProjectModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        initialData={selectedProject}
        onSuccess={fetchProjects}
      />
    </div>
  );
}
