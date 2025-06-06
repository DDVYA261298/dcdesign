// components/about/ProcessSection.tsx
"use client";

import { motion } from "framer-motion";

const steps = [
  { title: "Consultation", description: "We discuss your needs & vision." },
  { title: "Concept",      description: "We develop an initial design concept." },
  { title: "Planning",     description: "We finalize drawings, materials & budget." },
  { title: "Execution",    description: "We bring the design to life on time." },
  { title: "Delivery",     description: "We polish the space & hand over." },
];

export default function ProcessSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900"
          >
            Our Process
          </motion.h2>
          <p className="mt-2 text-gray-600 max-w-xl mx-auto">
            A straightforward, milestone-driven journey from idea to reality.
          </p>
        </div>

        {/* Stones Only (no connecting line) */}
        <div className="flex justify-between items-start">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="flex-1 flex flex-col items-center px-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: idx * 0.2, duration: 1 }}
            >
              {/* Stone (circle) */}
              <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                {idx + 1}
              </div>

              {/* Title & Description */}
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
