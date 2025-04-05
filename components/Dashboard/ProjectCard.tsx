import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Eye } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  client: string;
  status: string;
  date: string;
  description: string;  // ✅ Added 'description'
  image: string;
}

interface Props {
  project: Project;
  handleDeleteProject: (id: string) => void;
  setNewProject: (project: Project) => void;
}

export default function ProjectCard({ project, handleDeleteProject, setNewProject }: Props) {
  return (
    <Card>
      <CardContent>
        <h3 className="font-semibold">{project.title}</h3>
        <p>Client: {project.client}</p>
        <div className="flex space-x-2 mt-3">
          <Button size="sm" variant="outline" onClick={() => setNewProject(project)}>
            <Edit className="h-4 w-4 mr-1" /> Edit
          </Button>
          <Button size="sm" variant="outline">
            <Eye className="h-4 w-4 mr-1" /> View
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-red-500"
            onClick={() => handleDeleteProject(project.id)}
          >
            <Trash2 className="h-4 w-4" /> Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
