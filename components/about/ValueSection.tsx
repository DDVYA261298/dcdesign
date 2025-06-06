// components/about/ValuesSection.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Handshake, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We push creative boundaries to deliver fresh, unique designs.",
  },
  {
    icon: Handshake,
    title: "Collaboration",
    description: "We partner closely with clients, ensuring your vision guides every decision.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description: "We uphold transparency, quality, and ethical practices in all we do.",
  },
];

export default function ValuesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900"
          >
            Our Core Values
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
            >
              <Card className="border-none shadow-lg hover:shadow-2xl transition-shadow">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <div className="p-4 bg-primary/10 rounded-full mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
