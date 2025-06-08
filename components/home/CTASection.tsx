// components/home/CTASection.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const words = [
  { text: '— Collaboration', delay: 0 },
  { text: "Let's Create Something Beautiful Together", delay: 0.5 },
]

export default function CTASection() {
  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/collab.jpg"
          alt="Beautiful interior"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
        {/* Animated text */}
        <div className="space-y-6 text-white">
          {words.map(({ text, delay }) => (
            <motion.h1
              key={text}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: () => ({
                  transition: { staggerChildren: 0.06, delayChildren: delay },
                }),
              }}
              className="text-4xl font-bold leading-tight"
            >
              {text.split('').map((char, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
          ))}
        </div>

        {/* Copy & button */}
        <div className="flex flex-col justify-center text-white">
          <h3 className="text-lg mb-6">
            Ready to transform your space? We’d love to hear from you!{' '}
            <u>Get in touch</u> today to schedule a consultation and start
            bringing your vision to life.
          </h3>
          <Link
            href="/contact"
            className="inline-block w-max px-6 py-3 border border-white rounded-md text-white font-medium transition hover:bg-white hover:text-black"
          >
            Get In Touch →
          </Link>
        </div>
      </div>
    </section>
  )
}
