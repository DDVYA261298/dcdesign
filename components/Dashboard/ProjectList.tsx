import ProjectCard from './ProjectCard';

interface Project {
  id: string;
  title: string;
  client: string;
  status: string;
  date: string;
  image: string;
}

interface Props {
  projects: Project[];
  handleDeleteProject: (id: string) => void;
  setNewProject: (project: Project) => void;
}

export default function ProjectList({ projects, handleDeleteProject, setNewProject }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          handleDeleteProject={handleDeleteProject}
          setNewProject={setNewProject}
        />
      ))}
    </div>
  );
}
