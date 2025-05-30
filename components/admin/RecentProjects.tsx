"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Project {
  _id: string;
  title: string;
  client: string;
  status: string;
}

export default function RecentProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchRecent() {
      const res = await fetch("/api/projects?limit=3");
      const data = await res.json();
      setProjects(data);
    }
    fetchRecent();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project) => (
            <Link key={project._id} href={`/admin/projects/${project._id}`}>
              <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition">
                <div className="space-y-1">
                  <p className="font-medium">{project.title}</p>
                  <p className="text-sm text-muted-foreground">{project.client}</p>
                </div>
                <Badge variant="secondary">{project.status}</Badge>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
