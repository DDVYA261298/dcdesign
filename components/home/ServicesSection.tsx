"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Paintbrush, Layout, Sofa, Ruler } from "lucide-react";

const services = [
  {
    icon: Layout,
    title: "Space Planning",
    description: "Expert layout optimization to maximize your space's functionality and flow."
  },
  {
    icon: Paintbrush,
    title: "Interior Design",
    description: "Complete design solutions that transform your space into a stunning environment."
  },
  {
    icon: Sofa,
    title: "Furniture Selection",
    description: "Curated furniture choices that perfectly match your style and needs."
  },
  {
    icon: Ruler,
    title: "Project Management",
    description: "End-to-end project coordination ensuring smooth execution and timely delivery."
  }
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We offer comprehensive interior design services to bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center p-6">
                  <div className="p-3 bg-primary/10 rounded-full mb-4">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}