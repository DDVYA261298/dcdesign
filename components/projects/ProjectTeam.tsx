"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface ProjectTeamProps {
  project: {
    employees: Array<{
      id: string;
      name: string;
      role: string;
      department:string;
      image: string;
    }>;
  };
}

export default function ProjectTeam({ project }: ProjectTeamProps) {
  return (
    <div className="mb-12">
      <h2 className="mb-6 text-2xl font-semibold">Project Team</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {project.employees.map((employee) => (
          <Card key={employee.id}>
            <CardContent className="flex items-center gap-4 p-6">
              <Avatar className="h-16 w-16">
                <AvatarImage src={employee.image} alt={employee.name} />
                <AvatarFallback>{employee.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{employee.name}</h3>
                <p className="text-sm text-gray-600">{employee.role}</p>
                <p className="text-sm text-gray-600">{employee.department}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}