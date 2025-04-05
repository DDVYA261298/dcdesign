
"use client";

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Award, Users, Clock, Lightbulb } from 'lucide-react'

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">About DC Design</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                We create beautiful, functional spaces that reflect our clients' unique style and needs.
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-[500px] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop"
                  alt="DC Design studio"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    Founded in 2010 by Diana Chen, DC Design began as a small residential design studio with a passion for creating thoughtful, personalized spaces. Over the past decade, we've grown into a full-service interior design firm with a diverse portfolio of residential and commercial projects across the country.
                  </p>
                  <p>
                    Our approach combines aesthetic vision with practical functionality, ensuring that each space we design is not only beautiful but also perfectly suited to our clients' needs and lifestyle. We believe that great design should enhance daily life, creating environments that inspire, comfort, and delight.
                  </p>
                  <p>
                    What sets us apart is our commitment to collaboration. We view the design process as a partnership with our clients, listening carefully to their goals and preferences while guiding them with our expertise. This collaborative approach results in spaces that truly reflect the people who inhabit them.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Values</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                These core principles guide our approach to every project and client relationship.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Award,
                  title: 'Excellence',
                  description: 'We strive for excellence in every aspect of our work, from the initial concept to the final detail.'
                },
                {
                  icon: Users,
                  title: 'Collaboration',
                  description: 'We believe the best results come from true collaboration between our team and our clients.'
                },
                {
                  icon: Clock,
                  title: 'Timeliness',
                  description: 'We respect our clients time and work diligently to deliver projects on schedule and within budget.'
                },
                {
                  icon: Lightbulb,
                  title: 'Innovation',
                  description: 'We continuously explore new ideas, materials, and techniques to create unique, forward-thinking designs.'
                }
              ].map((value, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Meet the Team */}
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Team</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Our talented team brings diverse skills and perspectives to every project.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: 'Diana Chen',
                  role: 'Founder & Principal Designer',
                  bio: 'With over 15 years of experience in interior design, Diana leads the creative vision of DC Design. Her work has been featured in numerous design publications.',
                  image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'
                },
                {
                  name: 'Michael Rodriguez',
                  role: 'Senior Designer',
                  bio: 'Michael specializes in commercial spaces and brings a unique perspective informed by his background in architecture and urban planning.',
                  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop'
                },
                {
                  name: 'Sarah Johnson',
                  role: 'Interior Designer',
                  bio: 'Sarah is passion for sustainable design and expertise in material selection helps clients create beautiful spaces with minimal environmental impact.',
                  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop'
                },
                {
                  name: 'James Wilson',
                  role: 'Project Manager',
                  bio: 'James ensures that every project runs smoothly from concept to completion, coordinating with contractors and vendors to bring designs to life.',
                  image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop'
                },
                {
                  name: 'Emily Zhang',
                  role: 'Interior Designer',
                  bio: 'Emily specializes in residential design and has a talent for creating spaces that perfectly balance aesthetics and functionality.',
                  image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop'
                },
                {
                  name: 'David Park',
                  role: 'Design Assistant',
                  bio: 'David supports the design team with research, renderings, and material sourcing, bringing fresh ideas and technical expertise to each project.',
                  image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop'
                }
              ].map((member, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden shadow-md">
                  <div className="relative h-80">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Our Process */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Design Process</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                We follow a structured yet flexible process to ensure every project meets our clients' needs and exceeds their expectations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {[
                {
                  number: '01',
                  title: 'Consultation',
                  description: 'We begin with an in-depth consultation to understand your goals, preferences, budget, and timeline. This initial meeting helps us establish the foundation for a successful project.'
                },
                {
                  number: '02',
                  title: 'Concept Development',
                  description: 'Based on our consultation, we develop design concepts that align with your vision. This includes space planning, color schemes, material selections, and preliminary furniture layouts.'
                },
                {
                  number: '03',
                  title: 'Design Refinement',
                  description: 'We refine the design based on your feedback, creating detailed plans, elevations, and 3D renderings to help you visualize the final space before any work begins.'
                },
                {
                  number: '04',
                  title: 'Implementation',
                  description: 'Once the design is approved, we coordinate with contractors, vendors, and craftspeople to bring the vision to life, overseeing every detail of the implementation process.'
                }
              ].map((step, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex">
                  <div className="mr-6">
                    <div className="h-12 w-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {step.number}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Space?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Let's collaborate to create a space that's beautiful, functional, and uniquely yours.
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </main>
  )
}