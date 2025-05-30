"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPin, User } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectDetailsProps {
  project: {
    title: string;
    description: string;
    status: string;
    client: string;
    location: string;
    completedDate?: string;
    images?: string[];
  };
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
    mode: "snap",
  });

  return (
    <motion.div
      className="mb-16"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          {project.title}
        </h1>
        <Badge
          variant={project.status === "completed" ? "default" : "secondary"}
          className="text-sm px-4 py-1 rounded-full bg-gradient-to-r from-green-400 to-teal-500 text-white shadow-md"
        >
          {project.status}
        </Badge>
      </div>

      {/* Image Slider */}
      {project.images && project.images.length > 0 && (
        <div
          ref={sliderRef}
          className="keen-slider rounded-xl overflow-hidden mb-10 shadow-xl border border-gray-200"
        >
          {project.images.map((img, index) => (
            <div key={index} className="keen-slider__slide">
              <img
                src={img}
                alt={`Project Image ${index + 1}`}
                className="w-full h-80 object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-800">
        {/* Overview */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">📋 Project Overview</h2>
          <p className="leading-relaxed text-gray-600">{project.description}</p>
        </div>

        {/* Metadata */}
        <div className="space-y-6">
          <div>
            <h3 className="flex items-center font-semibold text-lg mb-1">
              <User className="w-5 h-5 mr-2" /> Client
            </h3>
            <p className="text-gray-700">{project.client}</p>
          </div>

          <div>
            <h3 className="flex items-center font-semibold text-lg mb-1">
              <MapPin className="w-5 h-5 mr-2" /> Location
            </h3>
            <p className="text-gray-700">{project.location}</p>
          </div>

          {project.completedDate && (
            <div>
              <h3 className="flex items-center font-semibold text-lg mb-1">
                <CalendarIcon className="w-5 h-5 mr-2" /> Completion Date
              </h3>
              <p className="text-gray-700">
                {new Date(project.completedDate).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
