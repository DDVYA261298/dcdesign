// components/home/ServicesSection.tsx
"use client";

import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Paintbrush, Layout, Sofa, Ruler } from "lucide-react";

const services = [
  {
    icon: Layout,
    title: "Space Planning",
    description:
      "Expert layout optimization to maximize your space's functionality and flow.",
  },
  {
    icon: Paintbrush,
    title: "Interior Design",
    description:
      "Complete design solutions that transform your space into a stunning environment.",
  },
  {
    icon: Sofa,
    title: "Furniture Selection",
    description:
      "Curated furniture choices that perfectly match your style and needs.",
  },
  {
    icon: Ruler,
    title: "Project Management",
    description:
      "End-to-end project coordination ensuring smooth execution and timely delivery.",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50 px-4 md:px-0">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold tracking-tight mb-4 text-gray-900"
        >
          Our Services
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          We offer comprehensive interior design services to bring your vision to
          life.
        </motion.p>
      </div>

      {/* Cards Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {services.map((service, idx) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Tilt
                tiltMaxAngleX={6}
                tiltMaxAngleY={6}
                perspective={1000}
                scale={1.02}
                transitionSpeed={250}
                className="rounded-lg"
              >
                <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                  <CardContent className="pt-8 pb-6 px-6 flex flex-col items-center text-center">
                    {/* Icon Container */}
                    <motion.div
                      whileHover={{ scale: 1.2, backgroundColor: "rgba(59,130,246,0.1)" }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="p-4 bg-primary/10 rounded-full mb-4"
                    >
                      <Icon className="h-8 w-8 text-primary" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              </Tilt>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
