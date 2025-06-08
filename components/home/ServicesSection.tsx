// components/home/ServicesSection.tsx
import React from 'react'
import { BiGridAlt }     from 'react-icons/bi'
import { FaPaintBrush }  from 'react-icons/fa'
import { FiZap }         from 'react-icons/fi'
import { GiSofa }        from 'react-icons/gi'
import { GiPaintRoller } from 'react-icons/gi'
import { GiWoodCabin }   from 'react-icons/gi'

type Service = {
  title: string
  description: string
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
}

const services: Service[] = [
  {
    title: 'Space Planning',
    description: 'Optimizing layout for function, comfort, and aesthetic visual flow.',
    Icon: BiGridAlt,
  },
  {
    title: 'Color Consultation',
    description: 'Choosing harmonious palettes that reflect mood, space, and personality.',
    Icon: FaPaintBrush,
  },
  {
    title: 'Lighting Design',
    description: 'Enhancing ambiance and functionality with strategic lighting placements.',
    Icon: FiZap,
  },
  {
    title: 'Furniture Selection',
    description: 'Picking stylish, functional pieces to match space and purpose.',
    Icon: GiSofa,
  },
  {
    title: 'Wall Treatments',
    description: 'Applying paint, wallpaper, or textures for visual interest enhancement.',
    Icon: GiPaintRoller,
  },
  {
    title: 'Flooring Design',
    description: 'Selecting materials for style, durability, and room-specific performance.',
    Icon: GiWoodCabin,
  },
]

export default function ServicesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(({ title, description, Icon }) => (
            <div
              key={title}
              className="p-6 bg-white rounded-lg shadow-lg flex items-start space-x-4"
            >
              <Icon className="text-primary text-4xl flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
