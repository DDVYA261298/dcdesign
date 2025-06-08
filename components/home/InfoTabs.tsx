'use client'

import { useState, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'

const tabs = [
  {
    name: 'History',
    content: (
      <>
        <p className="mb-4">
          At DCDESIGNS, we believe that your space should tell your story. Our team
          of creative and skilled designers is committed to transforming your vision
          into a reality, creating environments that reflect your personality,
          style, and functional needs.
        </p>
        <p>
          From conceptualization to execution, we manage every aspect of the design
          process with attention to detail, craftsmanship, and a keen eye for
          aesthetics. Our journey began over a decade ago with a small studio—and
          today we’ve completed hundreds of projects.
        </p>
      </>
    ),
  },
  {
    name: 'Mission',
    content: (
      <>
        <p className="mb-4">
          Our mission is to craft inspiring, functional, and personalized spaces
          that elevate the way our clients live, work, and experience their
          surroundings.
        </p>
        <p>
          We strive to build lasting relationships, delivering exceptional design
          solutions that blend creativity with practicality. Every project is
          executed with innovation, impeccable craftsmanship, and a focus on
          enhancing daily life.
        </p>
      </>
    ),
  },
  {
    name: 'Vision',
    content: (
      <>
        <p className="mb-4">
          We envision becoming a leader in transforming spaces through thoughtful,
          sustainable design. Our goal is to create environments that not only
          satisfy aesthetic and functional needs but also foster well-being and
          inspire creativity.
        </p>
        <p>
          In a world where every space reflects its occupant’s unique aspirations,
          we aspire to leave a lasting impression by shaping interiors that truly
          resonate.
        </p>
      </>
    ),
  },
]


const images = [
  '/images/project1/BALCONY.jpg',
  '/images/project1/BEDROOM.jpg',
  '/images/project1/BEDROOM_2.jpg',
]

export default function InfoTabsStacked() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setSelectedIndex(i => (i + 1) % tabs.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-8">
        {/* Tabs */}
        <div className="md:w-1/2">
          <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <Tab.List className="flex space-x-6 border-b border-gray-200 mb-8">
              {tabs.map(t => (
                <Tab
                  key={t.name}
                  className={({ selected }) =>
                    clsx(
                      'pb-2 text-lg font-medium',
                      selected ? 'text-gray-900 border-b-2 border-primary-600' : 'text-gray-600 hover:text-gray-900'
                    )
                  }
                >
                  {t.name}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="text-gray-700 space-y-4">
              {tabs.map(t => (
                <Tab.Panel key={t.name}>{t.content}</Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>

        {/* Stacked Images */}
        <div className="md:w-1/2 relative h-80">
          {images.map((src, idx) => {
            const delta = idx - selectedIndex
            const zIndex = idx === selectedIndex ? 30 : 20 - Math.abs(delta) * 5
            const offset = delta * 10   // smaller lateral shift
            const scale = idx === selectedIndex ? 1 : 0.95
            const opacity = idx === selectedIndex ? 1 : 0.9

            return (
              <img
                key={src}
                src={src}
                alt=""
                className="absolute top-0 left-0 w-full h-full object-cover rounded-lg transition-all duration-700 ease-in-out shadow-lg"
                style={{
                  transform: `translate(${offset}px, ${-offset}px) scale(${scale})`,
                  zIndex,
                  opacity,
                }}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
