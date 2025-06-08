'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Project {
  _id: string
  category: string
}

interface Props {
  onSelectCategory: (category: string) => void
}

export default function ProjectsFilter({ onSelectCategory }: Props) {
  const [categories, setCategories] = useState<string[]>([])
  const [selected, setSelected] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then((data: Project[]) => {
        const cats = Array.from(new Set(data.map(p => p.category))).sort()
        setCategories(['All', ...cats])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <p className="text-center py-4 text-gray-500">Loading filters…</p>
  }

  return (
    <ul id="filters" className="filters flex flex-wrap justify-center gap-4 py-6">
      {categories.map(cat => {
        const slug = cat === 'All'
          ? '*'
          : `.${cat.replace(/\s+/g, '-').toLowerCase()}`
        const isActive = selected === cat

        return (
          <motion.li
            key={cat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelected(cat)
              onSelectCategory(cat)
            }}
            className={`
              cursor-pointer px-4 py-2 rounded
              transition-colors duration-200
              border-2
              ${isActive
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-700 hover:border-gray-900 hover:text-gray-900'}
            `}
          >
            <a href="#" data-filter={slug} className="text-sm font-medium uppercase tracking-wide">
              {cat}
            </a>
          </motion.li>
        )
      })}
    </ul>
  )
}
