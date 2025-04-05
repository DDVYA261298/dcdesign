import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

// Sample project data
const projects = [
  {
    id: '1',
    title: 'Modern Minimalist Apartment',
    category: 'residential',
    status: 'completed',
    description: 'A clean, minimalist design for a downtown apartment that maximizes space and natural light.',
    images: [
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7f34b5e8d97?q=80&w=800&auto=format&fit=crop'
    ],
    year: 2023,
    location: 'New York, NY'
  },
  {
    id: '2',
    title: 'Luxury Penthouse Suite',
    category: 'residential',
    status: 'completed',
    description: 'A sophisticated penthouse design featuring custom furniture and panoramic city views.',
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7f34b5e8d97?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=800&auto=format&fit=crop'
    ],
    year: 2022,
    location: 'Miami, FL'
  },
  {
    id: '3',
    title: 'Creative Agency Office',
    category: 'commercial',
    status: 'completed',
    description: 'A dynamic workspace designed to foster creativity and collaboration for a leading design agency.',
    images: [
      'https://images.unsplash.com/photo-1600494603989-9650cf6dad51?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800&auto=format&fit=crop'
    ],
    year: 2023,
    location: 'San Francisco, CA'
  },
  {
    id: '4',
    title: 'Boutique Hotel Lobby',
    category: 'commercial',
    status: 'completed',
    description: 'An elegant hotel lobby that combines modern aesthetics with classic hospitality elements.',
    images: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600494603989-9650cf6dad51?q=80&w=800&auto=format&fit=crop'
    ],
    year: 2022,
    location: 'Chicago, IL'
  },
  {
    id: '5',
    title: 'Contemporary Beach House',
    category: 'residential',
    status: 'in-progress',
    description: 'A modern beach house that seamlessly blends indoor and outdoor living spaces.',
    images: [
      'https://images.unsplash.com/photo-1600607687644-c7f34b5e8d97?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop'
    ],
    year: 2024,
    location: 'Malibu, CA'
  },
  {
    id: '6',
    title: 'Urban Café Redesign',
    category: 'commercial',
    status: 'in-progress',
    description: 'A cozy yet modern café space designed to create a welcoming atmosphere for customers.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600494603989-9650cf6dad51?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop'
    ],
    year: 2024,
    location: 'Seattle, WA'
  }
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Our Projects</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Explore our portfolio of residential and commercial interior design projects.
              </p>
            </div>
          </div>
        </section>
        
        {/* Projects Gallery */}
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList>
                  <TabsTrigger value="all">All Projects</TabsTrigger>
                  <TabsTrigger value="residential">Residential</TabsTrigger>
                  <TabsTrigger value="commercial">Commercial</TabsTrigger>
                  <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="residential" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects
                    .filter(project => project.category === 'residential')
                    .map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="commercial" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects
                    .filter(project => project.category === 'commercial')
                    .map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="in-progress" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects
                    .filter(project => project.status === 'in-progress')
                    .map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
      
      <Footer />
    </main>
  )
}

function ProjectCard({ project }: { project: any }) {
  return (
    <div className="group bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={project.images[0]}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {project.status === 'in-progress' && (
          <div className="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            In Progress
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{project.title}</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">{project.year}</span>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">{project.location}</p>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{project.description}</p>
        <Link href={`/projects/${project.id}`} className="inline-flex items-center text-gray-900 dark:text-white font-medium hover:underline">
          View Details <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}