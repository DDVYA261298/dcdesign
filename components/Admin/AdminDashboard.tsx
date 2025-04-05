"use client";

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Home, LogOut, Upload, Users, FileText, Settings, PlusCircle, Trash2, Edit, Eye } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Sample Projects Data
const projectsData = [
  {
    id: '1',
    title: 'Modern Minimalist Apartment',
    client: 'John Smith',
    status: 'completed',
    date: '2023-10-15',
    image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Luxury Penthouse Suite',
    client: 'Sarah Johnson',
    status: 'completed',
    date: '2022-12-05',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=400&auto=format&fit=crop'
  }
]

export default function AdminDashboard() {
  const { toast } = useToast()

  const [projects, setProjects] = useState(projectsData)
  const [newProject, setNewProject] = useState({
    title: '',
    client: '',
    status: 'in-progress',
    description: '',
    image: ''
  })

  const [imageFile, setImageFile] = useState<File | null>(null)

  // Handle Project Input Changes
  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewProject(prev => ({ ...prev, [name]: value }))
  }

  // Handle Image Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const imageURL = URL.createObjectURL(file)
      setNewProject((prev) => ({ ...prev, image: imageURL }))
    }
  }

  // Handle Adding New Project
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const today = new Date().toISOString().split('T')[0];
  
      const projectData = {
        ...newProject,
        date: today,
        image: newProject.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop',
      };
  
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });
  
      if (!response.ok) throw new Error('Failed to add project');
  
      const result = await response.json();
  
      toast({
        title: "Project Added",
        description: "The new project has been saved to database!",
      });
  
      // After successful save, refresh the project list
      fetchProjects();
  
      // Clear form
      setNewProject({
        title: '',
        client: '',
        status: 'in-progress',
        description: '',
        image: '',
      });
      setImageFile(null);
  
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to add project",
      });
    }
  };
  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };
  
  // Call once on page load
  useEffect(() => {
    fetchProjects();
  }, []);
  
  // Delete Project
  const handleDeleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id))

    toast({
      title: "Project Deleted",
      description: "The project has been successfully deleted."
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <span className="text-xl font-bold text-gray-900 dark:text-white">DC Design Admin</span>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 dark:text-gray-300">Home</Link>
              <Link href="/login" className="text-gray-600 dark:text-gray-300">Logout</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="projects">
          <TabsList>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="add-project">Add New Project</TabsTrigger>
          </TabsList>

          {/* Projects List */}
          <TabsContent value="projects">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map(project => (
                <Card key={project.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
                  <div className="relative h-48">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Client: {project.client}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Date: {project.date}</p>
                    <div className="flex space-x-2 mt-3">
                      <Button size="sm" onClick={() => handleDeleteProject(project.id)}>
                        <Trash2 className="h-4 w-4" /> Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Add Project Form */}
          <TabsContent value="add-project">
            <form onSubmit={handleAddProject} className="space-y-4">
              <Input
                name="title"
                value={newProject.title}
                onChange={handleProjectChange}
                placeholder="Enter Project Title"
                required
              />

              <Input
                name="client"
                value={newProject.client}
                onChange={handleProjectChange}
                placeholder="Enter Client Name"
                required
              />

              <Textarea
                name="description"
                value={newProject.description}
                onChange={handleProjectChange}
                placeholder="Enter Project Description"
                required
              />

              <Select
                value={newProject.status}
                onValueChange={(value) => setNewProject((prev) => ({ ...prev, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>

              <Label>Upload Image</Label>
              <Input
                type="file"
                onChange={handleImageUpload}
                className="block w-full"
              />

              <Button type="submit" className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Project
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
