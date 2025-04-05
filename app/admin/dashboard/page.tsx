// "use client";
// import { useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Textarea } from '@/components/ui/textarea'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
// import { useToast } from '@/hooks/use-toast'
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
// import { Home, LogOut, Upload, Users, FileText, Settings, PlusCircle, Trash2, Edit, Eye } from 'lucide-react'
// import Link from 'next/link'
// import Image from 'next/image'
// import { Navbar } from '@/components/navbar'

// // Sample data for dashboard
// const projectStats = [
//   { name: 'Jan', projects: 4 },
//   { name: 'Feb', projects: 3 },
//   { name: 'Mar', projects: 5 },
//   { name: 'Apr', projects: 7 },
//   { name: 'May', projects: 2 },
//   { name: 'Jun', projects: 6 },
//   { name: 'Jul', projects: 8 },
//   { name: 'Aug', projects: 9 },
//   { name: 'Sep', projects: 5 },
//   { name: 'Oct', projects: 4 },
//   { name: 'Nov', projects: 6 },
//   { name: 'Dec', projects: 7 },
// ]

// const projectsData = [
//   {
//     id: '1',
//     title: 'Modern Minimalist Apartment',
//     client: 'John Smith',
//     status: 'completed',
//     date: '2023-10-15',
//     image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=400&auto=format&fit=crop'
//   },
//   {
//     id: '2',
//     title: 'Luxury Penthouse Suite',
//     client: 'Sarah Johnson',
//     status: 'completed',
//     date: '2022-12-05',
//     image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=400&auto=format&fit=crop'
//   },
//   {
//     id: '3',
//     title: 'Creative Agency Office',
//     client: 'Spark Creative',
//     status: 'completed',
//     date: '2023-08-22',
//     image: 'https://images.unsplash.com/photo-1600494603989-9650cf6dad51?q=80&w=400&auto=format&fit=crop'
//   },
//   {
//     id: '4',
//     title: 'Boutique Hotel Lobby',
//     client: 'The Parkview Hotel',
//     status: 'completed',
//     date: '2022-11-30',
//     image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=400&auto=format&fit=crop'
//   },
//   {
//     id: '5',
//     title: 'Contemporary Beach House',
//     client: 'Michael Chen',
//     status: 'in-progress',
//     date: '2024-02-10',
//     image: 'https://images.unsplash.com/photo-1600607687644-c7f34b5e8d97?q=80&w=400&auto=format&fit=crop'
//   },
//   {
//     id: '6',
//     title: 'Urban Café Redesign',
//     client: 'Cascade Coffee Roasters',
//     status: 'in-progress',
//     date: '2024-01-15',
//     image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop'
//   }
// ]

// const inquiriesData = [
//   {
//     id: '1',
//     name: 'Emily Rodriguez',
//     email: 'emily@example.com',
//     phone: '(555) 123-4567',
//     message: 'I am interested in redesigning my living room and dining area. Would love to schedule a consultation.',
//     date: '2024-03-15',
//     status: 'new'
//   },
//   {
//     id: '2',
//     name: 'David Wilson',
//     email: 'david@example.com',
//     phone: '(555) 987-6543',
//     message: 'We are opening a new restaurant and need interior design services. Please contact me to discuss the project.',
//     date: '2024-03-12',
//     status: 'responded'
//   },
//   {
//     id: '3',
//     name: 'Sophia Martinez',
//     email: 'sophia@example.com',
//     phone: '(555) 456-7890',
//     message: 'I recently purchased a condo and would like to discuss a complete renovation. What is your availability in the coming weeks?',
//     date: '2024-03-10',
//     status: 'new'
//   },
//   {
//     id: '4',
//     name: 'James Thompson',
//     email: 'james@example.com',
//     phone: '(555) 234-5678',
//     message: 'Our office needs a refresh. We are looking for a design that improves workflow and reflects our brand better.',
//     date: '2024-03-08',
//     status: 'responded'
//   }
// ]

// export default function AdminDashboard() {
//   const { toast } = useToast()
//   const [projects, setProjects] = useState(projectsData)
//   const [inquiries, setInquiries] = useState(inquiriesData)
//   const [newProject, setNewProject] = useState({
//     title: '',
//     client: '',
//     status: 'in-progress',
//     description: '',
//     image: ''
//   })
  
//   const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setNewProject(prev => ({ ...prev, [name]: value }))
//   }
  
//   const handleStatusChange = (value: string) => {
//     setNewProject(prev => ({ ...prev, status: value }))
//   }
  
//   const handleAddProject = (e: React.FormEvent) => {
//     e.preventDefault()
    
//     const newId = (projects.length + 1).toString()
//     const today = new Date().toISOString().split('T')[0]
    
//     const projectToAdd = {
//       id: newId,
//       title: newProject.title,
//       client: newProject.client,
//       status: newProject.status,
//       date: today,
//       image: newProject.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop'
//     }
    
//     setProjects(prev => [...prev, projectToAdd])
    
//     setNewProject({
//       title: '',
//       client: '',
//       status: 'in-progress',
//       description: '',
//       image: ''
//     })
    
//     toast({
//       title: "Project Added",
//       description: "The new project has been successfully added.",
//     })
//   }
  
//   const handleDeleteProject = (id: string) => {
//     setProjects(prev => prev.filter(project => project.id !== id))
    
//     toast({
//       title: "Project Deleted",
//       description: "The project has been successfully deleted.",
//     })
//   }
  
//   const handleMarkAsResponded = (id: string) => {
//     setInquiries(prev => 
//       prev.map(inquiry => 
//         inquiry.id === id ? { ...inquiry, status: 'responded' } : inquiry
//       )
//     )
    
//     toast({
//       title: "Inquiry Updated",
//       description: "The inquiry has been marked as responded.",
//     })
//   }
  
//   const handleDeleteInquiry = (id: string) => {
//     setInquiries(prev => prev.filter(inquiry => inquiry.id !== id))
    
//     toast({
//       title: "Inquiry Deleted",
//       description: "The inquiry has been successfully deleted.",
//     })
//   }
  
//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
//       {/* Admin Header */}
     
//       <header className="bg-white dark:bg-gray-900 shadow-sm">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center">
//               <span className="text-xl font-bold text-gray-900 dark:text-white">DC Design Admin</span>
//             </div>
            
//             <div className="flex items-center space-x-4">
//               <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
//                 <Home className="h-5 w-5" />
//               </Link>
//               <Link href="/login" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
//                 <LogOut className="h-5 w-5" />
//               </Link>
//             </div>
//           </div>
//         </div>
//       </header>
      
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           {/* Sidebar */}
//           <div className="md:col-span-1">
//             <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4">
//               <div className="flex flex-col space-y-1">
//                 <Button variant="ghost" className="justify-start">
//                   <Home className="mr-2 h-4 w-4" />
//                   Dashboard
//                 </Button>
//                 <Button variant="ghost" className="justify-start">
//                   <FileText className="mr-2 h-4 w-4" />
//                   Projects
//                 </Button>
//                 <Button variant="ghost" className="justify-start">
//                   <Users className="mr-2 h-4 w-4" />
//                   Inquiries
//                 </Button>
//                 <Button variant="ghost" className="justify-start">
//                   <Upload className="mr-2 h-4 w-4" />
//                   Media
//                 </Button>
//                 <Button variant="ghost" className="justify-start">
//                   <Settings className="mr-2 h-4 w-4" />
//                   Settings
//                 </Button>
//               </div>
//             </div>
//           </div>
          
//           {/* Main Content */}
//           <div className="md:col-span-3">
//             <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Admin Dashboard</h1>
            
//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//               <Card>
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Projects</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">{projects.length}</div>
//                 </CardContent>
//               </Card>
              
//               <Card>
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Projects</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">{projects.filter(p => p.status === 'in-progress').length}</div>
//                 </CardContent>
//               </Card>
              
//               <Card>
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">New Inquiries</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">{inquiries.filter(i => i.status === 'new').length}</div>
//                 </CardContent>
//               </Card>
              
//               <Card>
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed Projects</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">{projects.filter(p => p.status === 'completed').length}</div>
//                 </CardContent>
//               </Card>
//             </div>
            
//             {/* Chart */}
//             <Card className="mb-6">
//               <CardHeader>
//                 <CardTitle>Projects Overview</CardTitle>
//                 <CardDescription>Monthly projects for the current year</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-[300px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <BarChart data={projectStats}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <Tooltip />
//                       <Bar dataKey="projects" fill="hsl(var(--chart-1))" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>
            
//             {/* Tabs for Projects and Inquiries */}
//             <Tabs defaultValue="projects">
//               <TabsList className="mb-4">
//                 <TabsTrigger value="projects">Projects</TabsTrigger>
//                 <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
//                 <TabsTrigger value="add-project">Add New Project</TabsTrigger>
//               </TabsList>
              
//               {/* Projects Tab */}
//               <TabsContent value="projects">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Manage Projects</CardTitle>
//                     <CardDescription>View and manage all your interior design projects</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       {projects.map(project => (
//                         <div key={project.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
//                           <div className="relative h-48">
//                             <Image
//                               src={project.image}
//                               alt={project.title}
//                               fill
//                               className="object-cover"
//                             />
//                             <div className="absolute top-2 right-2">
//                               <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                                 project.status === 'completed' 
//                                   ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
//                                   : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
//                               }`}>
//                                 {project.status === 'completed' ? 'Completed' : 'In Progress'}
//                               </span>
//                             </div>
//                           </div>
//                           <div className="p-4">
//                             <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{project.title}</h3>
//                             <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Client: {project.client}</p>
//                             <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Date: {new Date(project.date).toLocaleDateString()}</p>
//                             <div className="flex space-x-2">
//                               <Button size="sm" variant="outline">
//                                 <Edit className="h-4 w-4 mr-1" />
//                                 Edit
//                               </Button>
//                               <Button size="sm" variant="outline">
//                                 <Eye className="h-4 w-4 mr-1" />
//                                 View
//                               </Button>
//                               <Button 
//                                 size="sm" 
//                                 variant="outline" 
//                                 className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
//                                 onClick={() => handleDeleteProject(project.id)}
//                               >
//                                 <Trash2 className="h-4 w-4" />
//                               </Button>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
              
//               {/* Inquiries Tab */}
//               <TabsContent value="inquiries">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Customer Inquiries</CardTitle>
//                     <CardDescription>Manage and respond to customer inquiries</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       {inquiries.map(inquiry => (
//                         <div key={inquiry.id} className={`bg-gray-50 dark:bg-gray-800 rounded-lg p-4 ${
//                           inquiry.status === 'new' ? 'border-l-4 border-primary' : ''
//                         }`}>
//                           <div className="flex justify-between items-start mb-2">
//                             <div>
//                               <h3 className="font-semibold text-gray-900 dark:text-white">{inquiry.name}</h3>
//                               <p className="text-sm text-gray-500 dark:text-gray-400">
//                                 {inquiry.email} • {inquiry.phone}
//                               </p>
//                             </div>
//                             <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                               inquiry.status === 'new' 
//                                 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
//                                 : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
//                             }`}>
//                               {inquiry.status === 'new' ? 'New' : 'Responded'}
//                             </span>
//                           </div>
//                           <p className="text-gray-600 dark:text-gray-300 mb-3">{inquiry.message}</p>
//                           <div className="flex justify-between items-center">
//                             <p className="text-sm text-gray-500 dark:text-gray-400">
//                               Received: {new Date(inquiry.date).toLocaleDateString()}
//                             </p>
//                             <div className="flex space-x-2">
//                               {inquiry.status === 'new' && (
//                                 <Button 
//                                   size="sm" 
//                                   variant="outline"
//                                   onClick={() => handleMarkAsResponded(inquiry.id)}
//                                 >
//                                   Mark as Responded
//                                 </Button>
//                               )}
//                               <Button 
//                                 size="sm" 
//                                 variant="outline" 
//                                 className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
//                                 onClick={() => handleDeleteInquiry(inquiry.id)}
//                               >
//                                 <Trash2 className="h-4 w-4" />
//                               </Button>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
              
//               {/* Add Project Tab */}
//               <TabsContent value="add-project">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Add New Project</CardTitle>
//                     <CardDescription>Create a new project in your portfolio</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <form onSubmit={handleAddProject} className="space-y-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="title">Project Title</Label>
//                         <Input
//                           id="title"
//                           name="title"
//                           value={newProject.title}
//                           onChange={handleProjectChange}
//                           placeholder="Enter project title"
//                           required
//                         />
//                       </div>
                      
//                       <div className="space-y-2">
//                         <Label htmlFor="client">Client Name</Label>
//                         <Input
//                           id="client"
//                           name="client"
//                           value={newProject.client}
//                           onChange={handleProjectChange}
//                           placeholder="Enter client name"
//                           required
//                         />
//                       </div>
                      
//                       <div className="space-y-2">
//                         <Label htmlFor="status">Project Status</Label>
//                         <Select value={newProject.status} onValueChange={handleStatusChange}>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select status" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="in-progress">In Progress</SelectItem>
//                             <SelectItem value="completed">Completed</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </div>
                      
//                       <div className="space-y-2">
//                         <Label htmlFor="description">Project Description</Label>
//                         <Textarea
//                           id="description"
//                           name="description"
//                           value={newProject.description}
//                           onChange={handleProjectChange}
//                           placeholder="Enter project description"
//                           rows={4}
//                           required
//                         />
//                       </div>
                      
//                       <div className="space-y-2">
//                         <Label htmlFor="image">Image URL</Label>
//                         <Input
//                           id="image"
//                           name="image"
//                           value={newProject.image}
//                           onChange={handleProjectChange}
//                           placeholder="Enter image URL (or leave blank for default)"
//                         />
//                       </div>
                      
//                       <Button type="submit" className="w-full">
//                         <PlusCircle className="mr-2 h-4 w-4" />
//                         Add Project
//                       </Button>
//                     </form>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//             </Tabs>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import Dashboard from './dashboard';

export default function DashboardPage() {
  return <Dashboard />;
}
