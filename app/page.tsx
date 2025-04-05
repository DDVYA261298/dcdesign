import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
            alt="Modern interior design"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Transforming Spaces Into Extraordinary Experiences
            </h1>
            <p className="text-xl text-white/90 mb-8">
              DC Design creates beautiful, functional spaces that reflect your unique style and needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/projects">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                  View Our Work
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  Get In Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We offer comprehensive design solutions tailored to your specific needs and preferences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Residential Design',
                description: 'Transform your home into a beautiful, functional space that reflects your personality and lifestyle.',
                image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=800&auto=format&fit=crop'
              },
              {
                title: 'Commercial Design',
                description: 'Create inspiring workspaces that enhance productivity, impress clients, and embody your brand identity.',
                image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800&auto=format&fit=crop'
              },
              {
                title: 'Consultation',
                description: 'Get expert advice on color schemes, furniture selection, layout optimization, and more.',
                image: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=800&auto=format&fit=crop'
              }
            ].map((service, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="relative h-60">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
                  <Link href="/contact" className="inline-flex items-center text-gray-900 dark:text-white font-medium hover:underline">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Projects */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Projects</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore some of our recent work and see how we've helped clients transform their spaces.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Modern Minimalist Apartment',
                category: 'Residential',
                image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=800&auto=format&fit=crop'
              },
              {
                title: 'Luxury Penthouse Suite',
                category: 'Residential',
                image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop'
              },
              {
                title: 'Creative Agency Office',
                category: 'Commercial',
                image: 'https://images.unsplash.com/photo-1600494603989-9650cf6dad51?q=80&w=800&auto=format&fit=crop'
              },
              {
                title: 'Boutique Hotel Lobby',
                category: 'Commercial',
                image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop'
              },
              {
                title: 'Contemporary Beach House',
                category: 'Residential',
                image: 'https://images.unsplash.com/photo-1600607687644-c7f34b5e8d97?q=80&w=800&auto=format&fit=crop'
              },
              {
                title: 'Urban Café Redesign',
                category: 'Commercial',
                image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop'
              }
            ].map((project, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg shadow-md">
                <div className="relative h-80">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block px-3 py-1 bg-white/90 text-gray-900 text-xs font-medium rounded-full mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/projects">
              <Button size="lg">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about working with DC Design.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Homeowner',
                quote: 'Working with DC Design was an absolute pleasure. They transformed our outdated living space into a modern, functional home that perfectly reflects our style.',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
              },
              {
                name: 'Michael Chen',
                role: 'Restaurant Owner',
                quote: 'The team at DC Design understood our vision perfectly and created a dining space that has received countless compliments from our customers.',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
              },
              {
                name: 'Emily Rodriguez',
                role: 'CEO, Creative Agency',
                quote: 'Our office redesign by DC Design has significantly improved team morale and productivity. The space is beautiful, functional, and perfectly aligned with our brand.',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop'
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Space?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's collaborate to create a space that's beautiful, functional, and uniquely yours.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                  Get Started
                </Button>
              </Link>
              <Link href="/projects">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  Explore Our Work
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}