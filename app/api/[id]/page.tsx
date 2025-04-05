"use client";

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Calendar, MapPin, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

  type Project = {
    id: string;
    title: string;
    category: 'residential' | 'commercial';
    status: 'completed' | 'in-progress';
    description?: string;
    fullDescription?: string;
    images: string[];
    year: number;
    location: string;
    client?: string;
    services?: string[];
    timeline?: Record<string, string>;
  };
export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);



  
  useEffect(() => {
    const fetchProject = async () => {
      const res = await fetch(`/api/projects/${id}`);
      const data = await res.json();
      setProject(data);
    };

    if (id) fetchProject();
  }, [id]);

  if (!project) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
            <p className="mb-6">The project you're looking for doesn't exist or has been removed.</p>
            <Link href="/projects">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? project.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="pt-16">
        {/* Back Button */}
        <div className="bg-gray-50 dark:bg-gray-900 py-4">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/projects" className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </div>
        </div>

        {/* Project Header */}
        <section className="bg-white dark:bg-gray-950 py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h1>
                <div className="flex items-center flex-wrap gap-2 mb-2">
                  <Badge variant={project.status === 'completed' ? 'default' : 'outline'} className={project.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}>
                    {project.status === 'completed' ? 'Completed' : 'In Progress'}
                  </Badge>
                  <Badge variant="outline">{project.category === 'residential' ? 'Residential' : 'Commercial'}</Badge>
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm space-x-4">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {project.year}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {project.location}
                  </span>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <p className="text-gray-600 dark:text-gray-300">Client: <span className="font-medium">{project.client}</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* The rest of your sections (image gallery, project details, etc.) remain unchanged */}
        {/* They will now display dynamic project data fetched from the MongoDB API */}
      </div>

      <Footer />
    </main>
  );
}



// "use client"

// import { useState } from 'react'
// import { Navbar } from '@/components/navbar'
// import { Footer } from '@/components/footer'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
// import { ChevronLeft, ChevronRight, Calendar, MapPin, ArrowLeft } from 'lucide-react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { useParams } from 'next/navigation'

// // Sample project data (same as in projects/page.tsx)
// const projects = [
//   {
//     id: '1',
//     title: 'Modern Minimalist Apartment',
//     category: 'residential',
//     status: 'completed',
//     description: 'A clean, minimalist design for a downtown apartment that maximizes space and natural light.',
//     fullDescription: `This project involved the complete redesign of a 1,200 square foot apartment in downtown New York. The client, a young professional, wanted a clean, minimalist space that would maximize natural light and create an open, airy feel.

// We started by removing several non-load-bearing walls to open up the space, creating a seamless flow between the living room, dining area, and kitchen. Large windows were left unobstructed to maximize natural light, and we chose a neutral color palette of whites, light grays, and natural wood tones.

// Custom built-in storage solutions were designed to maintain the minimalist aesthetic while providing ample storage space. The furniture was carefully selected for its clean lines and functional design, with a focus on comfort and versatility.

// The end result is a serene, uncluttered space that feels much larger than its actual square footage, providing the perfect backdrop for urban living.`,
//     images: [
//       'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=1200&auto=format&fit=crop',
//       'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop',
//       'https://images.unsplash.com/photo-1600607687644-c7f34b5e8d97?q=80&w=1200&auto=format&fit=crop',
//       'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1200&auto=format&fit=crop'
//     ],
//     year: 2023,
//     location: 'New York, NY',
//     client: 'Private Residence',
//     services: ['Space Planning', 'Custom Furniture', 'Lighting Design', 'Material Selection']
//   },
//   {
//     id: '2',
//     title: 'Luxury Penthouse Suite',
//     category: 'residential',
//     status: 'completed',
//     description: 'A sophisticated penthouse design featuring custom furniture and panoramic city views.',
//     fullDescription: `This luxury penthouse project in Miami presented an exciting opportunity to create a sophisticated living space that takes full advantage of the panoramic ocean and city views.

// The 3,500 square foot space features an open floor plan with floor-to-ceiling windows that flood the space with natural light and showcase the stunning views. We selected a palette of soft neutrals with accents of deep blue to echo the ocean views, creating a sense of calm luxury throughout.

// Custom furniture pieces were designed specifically for the space, including a statement dining table made from a single slab of Italian marble and a modular sofa that can be reconfigured for different entertaining needs. The lighting design includes both architectural lighting to highlight key design features and decorative fixtures that serve as artistic focal points.

// The master suite includes a spa-like bathroom with a freestanding tub positioned to enjoy the city views, and a custom walk-in closet with specialized storage solutions. The outdoor terrace was designed as an extension of the living space, with comfortable seating areas, an outdoor kitchen, and a small plunge pool.`,
//     images: [
//       'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop',
//       'https://images.unsplash.com/photo-1600607687644-c7f34b5e8d97?q=80&w=1200&auto=format&fit=crop',
//       'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=1200&auto=format&fit=crop',
//       'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop'
//     ],
//     year: 2022,
//     location: 'Miami, FL',
//     client: 'Private Residence',
//     services: ['Space Planning', 'Custom Furniture', 'Lighting Design', 'Material Selection', 'Art Curation']
//   },
//   {
//     id: '3',
//     title: 'Creative Agency Office',
//     category: 'commercial',
//     status: 'completed',
//     description: 'A dynamic workspace designed to foster creativity and collaboration for a leading design agency.',
//     fullDescription: `This 5,000 square foot office space for a creative agency in San Francisco was designed to foster collaboration, creativity, and flexibility. The client wanted a space that would reflect their innovative brand identity while providing various work environments to support different tasks and working styles.

// The design concept centers around a large, open central area that serves as both a collaborative workspace and a venue for client presentations and company events. Surrounding this central space are a variety of work zones, including quiet focus areas, small meeting rooms for team collaboration, and phone booths for private calls.

// We incorporated biophilic design elements throughout, including a living wall in the reception area and abundant plant life throughout the space. Natural materials like wood and stone are balanced with industrial elements like exposed concrete and steel, creating a warm yet contemporary aesthetic.

// Technology integration was a key consideration, with seamless AV solutions in all meeting spaces and adaptable power and data access throughout. The lighting design includes both task lighting for focused work and ambient lighting to create a welcoming atmosphere.

// The result is a dynamic, flexible workspace that supports the agency's creative process and impresses clients while providing employees with a variety of environments to suit different tasks and preferences.`,
//     images: [
//       'https://images.unsplash.com/photo-1600494603989-9650cf6dad51?q=80&w=1200&auto=format&fit=crop',
//       'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
//       'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200&auto=format&fit=crop',
//       'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop'
//     ],
//     year: 2023,
//     location: 'San Francisco, CA',
//     client: 'Spark Creative Agency',
//     services: ['Space Planning', 'Furniture Selection', 'Lighting Design', 'Branding Integration', 'Technology Integration']
//   },
//   {
//     id: '4',
//     title: 'Boutique Hotel Lobby',
//     category: 'commercial',
//     status: 'completed',
//     description: 'An elegant hotel lobby that combines modern aesthetics with classic hospitality elements.',
//     fullDescription: `This boutique hotel lobby in Chicago was designed to create a memorable first impression for guests while efficiently handling the practical aspects of hotel operations. The client wanted a space that would feel both luxurious and welcoming, with nods to the building's historic architecture.

// The 2,500 square foot lobby was organized to create a clear flow from the entrance to the reception desk, with comfortable seating areas that encourage guests to linger. We preserved and restored original architectural details, including ornate moldings and a stunning terrazzo floor, while introducing contemporary elements that create a dialogue between old and new.

// The color palette draws from the building's historic features, with deep blues, rich browns, and accents of brass and bronze. Custom lighting fixtures were designed to highlight architectural details and create a warm, inviting atmosphere in the evening.

// The reception area was designed to be both functional for staff and welcoming for guests, with a custom desk that incorporates the latest technology while maintaining an elegant appearance. Adjacent to the lobby is a small bar area that transitions from serving coffee in the morning to cocktails in the evening, providing an additional amenity for guests.

// Furniture selections prioritize comfort and durability while maintaining a luxurious aesthetic, with a mix of classic and contemporary pieces that create a timeless feel. The result is a sophisticated space that honors the building's history while meeting the needs of modern travelers.`,
//     images: [
//       'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop',
//       'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
//       'https://images.unsplash.com/photo-1600494603989-9650cf6dad51?q=80&w=1200&auto=format&fit=crop',
//       'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop'
//     ],
//     year: 2022,
//     location: 'Chicago, IL',
//     client: 'The Parkview Hotel',
//     services: ['Space Planning', 'Custom Furniture', 'Lighting Design', 'Historic Preservation', 'Art Curation']
//   },
//   {
//     id: '5',
//     title: 'Contemporary Beach House',
//     category: 'residential',
//     status: 'in-progress',
//     description: 'A modern beach house that seamlessly blends indoor and outdoor living spaces.',
//     fullDescription: `This ongoing project involves the complete renovation of a 4,000 square foot beach house in Malibu. The clients, a family of four, wanted to create a contemporary home that would maximize the stunning ocean views while providing comfortable spaces for both family life and entertaining.

// The design concept centers around creating a seamless connection between indoor and outdoor spaces. We're replacing existing windows and doors with large sliding glass panels that can open completely, allowing the living areas to flow onto the expansive deck. The material palette draws inspiration from the natural surroundings, with weathered woods, natural stone, and a color scheme of sandy neutrals with accents of ocean blue.

// The open-plan living area is being designed to accommodate both intimate family gatherings and larger social events, with flexible furniture arrangements and built-in features that can adapt to different needs. The kitchen will feature a large island that serves as both a preparation space and casual dining area, with high-end appliances concealed behind custom cabinetry to maintain the clean aesthetic.

// Each bedroom is being designed as a retreat, with the primary suite featuring a private deck with ocean views and a spa-like bathroom. The children's rooms include custom built-in furniture that maximizes space and storage while reflecting their individual personalities.

// Sustainable design is a priority for this project, with energy-efficient systems, water-saving fixtures, and materials chosen for their environmental credentials as well as their aesthetic qualities. The landscaping plan focuses on drought-resistant native plants that will thrive in the coastal environment while requiring minimal maintenance.

// This project is currently in the construction phase, with completion expected in late 2024.`,
//     images: [
//       'https://images.unsplash.com/photo-1600607687644-c7f34b5e8d97?q=80&w=1200&auto=format&fit=crop',
//       'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=1200&auto=format&fit=crop',
//       'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop'
//     ],
//     year: 2024,
//     location: 'Malibu, CA',
//     client: 'Private Residence',
//     services: ['Architectural Design', 'Interior Design', 'Custom Furniture', 'Lighting Design', 'Landscape Design'],
//     timeline: {
//       design: 'Completed',
//       permits: 'Approved',
//       demolition: 'Completed',
//       framing: 'In Progress',
//       electrical: 'Scheduled',
//       plumbing: 'Scheduled',
//       finishes: 'Pending',
//       furnishing: 'Pending'
//     }
//   },
//   {
//     id: '6',
//     title: 'Urban Café Redesign',
//     category: 'commercial',
//     status: 'in-progress',
//     description: 'A cozy yet modern café space designed to create a welcoming atmosphere for customers.',
//     fullDescription: `This in-progress project involves the redesign of a 1,500 square foot café in downtown Seattle. The client, a successful local coffee roaster, wanted to update their flagship location to better reflect their brand identity and improve the customer experience.

// The design concept focuses on creating a warm, inviting space that encourages customers to linger while efficiently serving those on the go. We're creating distinct zones within the café: a quick-service area near the entrance, comfortable seating for those staying longer, and a small retail section featuring the client's coffee beans and merchandise.

// The material palette combines warm woods, textured tiles, and touches of the brand's signature teal color. Lighting is a key element of the design, with a mix of ambient, task, and accent lighting to create different moods throughout the day. Custom fixtures are being designed to highlight the coffee preparation area, turning the baristas' work into a visual feature.

// Acoustics are a major consideration, with sound-absorbing materials integrated into the design to create a comfortable noise level even during busy periods. The furniture plan includes a variety of seating options, from counter seating for solo visitors to larger tables for groups, with each piece selected for both comfort and durability.

// The service counter is being completely redesigned to improve workflow for staff while creating a more engaging experience for customers. Digital menu boards will allow for easy updates, and a new point-of-sale system will be seamlessly integrated into the counter design.

// This project is currently in the construction phase, with completion expected in mid-2024.`,
//     images: [
//       'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
//       'https://images.unsplash.com/photo-1600494603989-9650cf6dad51?q=80&w=1200&auto=format&fit=crop',
//       'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop'
//     ],
//     year: 2024,
//     location: 'Seattle, WA',
//     client: 'Cascade Coffee Roasters',
//     services: ['Space Planning', 'Custom Fixtures', 'Lighting Design', 'Branding Integration', 'Furniture Selection'],
//     timeline: {
//       design: 'Completed',
//       permits: 'Approved',
//       demolition: 'Completed',
//       construction: 'In Progress',
//       fixtures: 'In Production',
//       finishes: 'Scheduled',
//       furnishing: 'Pending'
//     }
//   }
// ];

// export default function ProjectDetailPage() {
//   const { id } = useParams()
//   const project = projects.find(p => p.id === id)
//   const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
//   if (!project) {
//     return (
//       <main className="min-h-screen flex flex-col">
//         <Navbar />
//         <div className="flex-grow flex items-center justify-center">
//           <div className="text-center">
//             <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
//             <p className="mb-6">The project you're looking for doesn't exist or has been removed.</p>
//             <Link href="/projects">
//               <Button>
//                 <ArrowLeft className="mr-2 h-4 w-4" />
//                 Back to Projects
//               </Button>
//             </Link>
//           </div>
//         </div>
//         <Footer />
//       </main>
//     )
//   }
  
//   const nextImage = () => {
//     setCurrentImageIndex((prevIndex) => 
//       prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
//     )
//   }
  
//   const prevImage = () => {
//     setCurrentImageIndex((prevIndex) => 
//       prevIndex === 0 ? project.images.length - 1 : prevIndex - 1
//     )
//   }
  
//   return (
//     <main className="min-h-screen flex flex-col">
//       <Navbar />
      
//       <div className="pt-16">
//         {/* Back Button */}
//         <div className="bg-gray-50 dark:bg-gray-900 py-4">
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             <Link href="/projects" className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
//               <ArrowLeft className="mr-2 h-4 w-4" />
//               Back to Projects
//             </Link>
//           </div>
//         </div>
        
//         {/* Project Header */}
//         <section className="bg-white dark:bg-gray-950 py-8">
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//               <div>
//                 <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h1>
//                 <div className="flex items-center flex-wrap gap-2 mb-2">
//                   <Badge variant={project.status === 'completed' ? 'default' : 'outline'} className={project.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}>
//                     {project.status === 'completed' ? 'Completed' : 'In Progress'}
//                   </Badge>
//                   <Badge variant="outline">{project.category === 'residential' ? 'Residential' : 'Commercial'}</Badge>
//                 </div>
//                 <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm space-x-4">
//                   <span className="flex items-center">
//                     <Calendar className="h-4 w-4 mr-1" />
//                     {project.year}
//                   </span>
//                   <span className="flex items-center">
//                     <MapPin className="h-4 w-4 mr-1" />
//                     {project.location}
//                   </span>
//                 </div>
//               </div>
//               <div className="mt-4 md:mt-0">
//                 <p className="text-gray-600 dark:text-gray-300">Client: <span className="font-medium">{project.client}</span></p>
//               </div>
//             </div>
//           </div>
//         </section>
        
//         {/* Image Gallery */}
//         <section className="bg-gray-50 dark:bg-gray-900 py-8">
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="relative overflow-hidden rounded-lg shadow-lg aspect-video">
//               <Image
//                 src={project.images[currentImageIndex]}
//                 alt={`${project.title} - Image ${currentImageIndex + 1}`}
//                 fill
//                 className="object-cover"
//               />
              
//               <button 
//                 onClick={prevImage}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
//                 aria-label="Previous image"
//               >
//                 <ChevronLeft className="h-6 w-6" />
//               </button>
              
//               <button 
//                 onClick={nextImage}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
//                 aria-label="Next image"
//               >
//                 <ChevronRight className="h-6 w-6" />
//               </button>
              
//               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
//                 {project.images.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentImageIndex(index)}
//                     className={`h-2 w-2 rounded-full transition-colors ${
//                       index === currentImageIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
//                     }`}
//                     aria-label={`Go to image ${index + 1}`}
//                   />
//                 ))}
//               </div>
//             </div>
            
//             <div className="grid grid-cols-4 gap-2 mt-2">
//               {project.images.map((image, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentImageIndex(index)}
//                   className={`relative aspect-video rounded-md overflow-hidden ${
//                     index === currentImageIndex ? 'ring-2 ring-primary' : ''
//                   }`}
//                 >
//                   <Image
//                     src={image}
//                     alt={`${project.title} - Thumbnail ${index + 1}`}
//                     fill
//                     className="object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>
//         </section>
        
//         {/* Project Details */}
//         <section className="bg-white dark:bg-gray-950 py-12">
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               <div className="lg:col-span-2">
//                 <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Project Overview</h2>
//                 <div className="prose dark:prose-invert max-w-none">
//                   {project.fullDescription.split('\n\n').map((paragraph, index) => (
//                     <p key={index} className="mb-4 text-gray-600 dark:text-gray-300">{paragraph}</p>
//                   ))}
//                 </div>
//               </div>
              
//               <div className="space-y-8">
//                 <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
//                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Services Provided</h3>
//                   <ul className="space-y-2">
//                     {project.services.map((service, index) => (
//                       <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
//                         <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
//                         {service}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
                
//                 {project.status === 'in-progress' && project.timeline && (
//                   <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Project Timeline</h3>
//                     <ul className="space-y-3">
//                       {Object.entries(project.timeline).map(([stage, status], index) => (
//                         <li key={index} className="flex justify-between items-center">
//                           <span className="text-gray-600 dark:text-gray-300 capitalize">{stage}</span>
//                           <Badge variant={
//                             status === 'Completed' ? 'default' : 
//                             status === 'In Progress' ? 'outline' : 
//                             'secondary'
//                           } className={
//                             status === 'Completed' ? 'bg-green-500' : 
//                             status === 'In Progress' ? 'bg-yellow-500 text-white' : 
//                             'bg-gray-200 dark:bg-gray-700'
//                           }>
//                             {status}
//                           </Badge>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
                
//                 <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
//                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Interested in a similar project?</h3>
//                   <p className="text-gray-600 dark:text-gray-300 mb-4">
//                     Contact us to discuss how we can help bring your vision to life.
//                   </p>
//                   <Link href="/contact">
//                     <Button className="w-full">Get in Touch</Button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
      
//       <Footer />
//     </main>
//   )
// }
