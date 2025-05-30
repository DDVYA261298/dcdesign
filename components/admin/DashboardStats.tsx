"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Star, Users, FolderOpen } from "lucide-react";

export default function DashboardStats() {
  const [stats, setStats] = useState([
    { title: "Total Projects", value: "-", icon: FolderOpen, change: "" },
    { title: "Team Members", value: "-", icon: Users, change: "" },
    { title: "Client Reviews", value: "-", icon: Star, change: "" },
    { title: "Active Projects", value: "-", icon: Building2, change: "" },
  ]);

  useEffect(() => {
    async function fetchStats() {
      const res = await fetch("/api/dashboard/metrics");
      const data = await res.json();
      setStats([
        { title: "Total Projects", value: data.totalProjects, icon: FolderOpen, change: "" },
        { title: "Team Members", value: data.totalEmployees, icon: Users, change: "" },
        { title: "Client Reviews", value: data.totalReviews, icon: Star, change: "" },
        { title: "Active Projects", value: data.activeProjects, icon: Building2, change: "" },
      ]);
    }
    fetchStats();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardContent className="flex flex-row items-center p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
