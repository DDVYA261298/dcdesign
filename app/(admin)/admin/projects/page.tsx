import { Metadata } from "next";
import Link from "next/link";
import ProjectsTable from "@/components/admin/ProjectsTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "Manage Projects | Admin",
  description: "Manage your portfolio projects",
};

export default function AdminProjects() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        {/* <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
        <Link href="/admin/projects/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>Add Project</span>
          </Button>
        </Link> */}
      </div>
      
      <ProjectsTable />
    </div>
  );
}