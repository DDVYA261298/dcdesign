'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface Project {
  _id: string;
  title: string;
  description: string;
  images: string[];
  client: string;
  location: string;
  status: string;
  featured: boolean;
  category: string;
}

interface Props {
  selectedCategory: string
}

export default function ProjectsGrid({ selectedCategory }: Props) {
  const [projects, setProjects] = useState<Project[]>([])
  const [filtered, setFiltered] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then((data: Project[]) => setProjects(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    setFiltered(
      selectedCategory === 'All'
        ? projects
        : projects.filter(p => p.category === selectedCategory)
    )
  }, [selectedCategory, projects])

  if (loading) {
    return <p className="text-center py-10 text-gray-500">Loading projects…</p>
  }

  return (
    <div className="blog-grid-wrap">
      <div className="blog-stream blog-grid masonry grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project, i) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className={`portfolio type-portfolio portfolio-category-${project.category
              .replace(/\s+/g, '-')
              .toLowerCase()}`}
          >
            <div className="hentry-wrap group relative overflow-hidden rounded-lg">
              <Link
                href={`/projects/${project._id}`}
                className="block w-full h-full"
              >
                <div className="w-full aspect-w-1 aspect-h-1">
                  <img
                    src={project.images[0] || '/default.jpg'}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h2 className="text-xl font-semibold text-white">
                      {project.title}
                    </h2>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
