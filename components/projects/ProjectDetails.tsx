"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

interface ProjectDetailsProps {
  project: {
    title: string;
    description: string;
    status: string;
    client: string;
    location: string;
    completedDate?: string;
    images?: string[];
    videos?: string[];
  };
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<number>(0);

  const openGallery = (index: number) => {
    setActiveImage(index);
    setIsOpen(true);
  };

  const displayedImages = project.images?.slice(0, 6) || [];

  return (
    <motion.div
      className="mb-16"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          {project.title}
        </h1>
        <span
          className={`text-sm px-4 py-1 rounded-full shadow-md text-white ${
            project.status === "completed"
              ? "bg-gradient-to-r from-green-400 to-teal-500"
              : "bg-gray-400"
          }`}
        >
          {project.status}
        </span>
      </div>

      {/* Fancy Collage Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {displayedImages.map((img, index) => (
          <motion.div
            key={index}
            onClick={() => openGallery(index)}
            className={`relative cursor-pointer overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:scale-105 ${
              index % 3 === 0 ? "row-span-2 col-span-2" : ""
            }`}
            whileHover={{ scale: 1.03 }}
          >
            <Image
              src={img}
              alt={`Project ${index + 1}`}
              width={800}
              height={600}
              layout="responsive"
              objectFit="cover"
              className="w-full h-auto object-cover rounded"
            />
          </motion.div>
        ))}
      </div>
      {project.videos && project.videos.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 mt-10">
          <h2 className="col-span-full text-2xl font-semibold text-gray-900">🎥 Project Videos</h2>
          {project.videos.map((video, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-lg">
              <div className="aspect-video">
                <iframe
                  src={video}
                  title={`Project Video ${index + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Popup */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">
          <Dialog.Panel className="relative max-w-4xl w-full">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-white bg-black/50 rounded-full p-2"
            >
              <X className="h-5 w-5" />
            </button>
            <Image
              src={project.images?.[activeImage] || ""}
              alt="Gallery"
              width={1000}
              height={700}
              className="rounded max-h-[80vh] mx-auto object-contain"
            />
            <div className="mt-4 text-center text-white">
              <button
                onClick={() =>
                  setActiveImage((activeImage - 1 + project.images!.length) % project.images!.length)
                }
                className="mr-4 text-lg hover:underline"
              >
                ← Previous
              </button>
              <button
                onClick={() => setActiveImage((activeImage + 1) % project.images!.length)}
                className="text-lg hover:underline"
              >
                Next →
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Info Section */}
     <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-800">
  {/* Overview Section */}
  <div>
    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
      <span className="text-blue-600">📋</span> Project Overview
    </h2>
    <p className="leading-relaxed text-gray-600 text-justify">
      {project.description}
    </p>
  </div>

  {/* Metadata Section */}
  <div className="bg-gray-50 border rounded-lg p-6 shadow-sm space-y-5">
    <div className="flex items-start gap-4">
      <span className="text-xl">👤</span>
      <div>
        <h3 className="font-semibold text-lg">Client</h3>
        <p className="text-gray-700">{project.client}</p>
      </div>
    </div>

    <div className="flex items-start gap-4">
      <span className="text-xl">📍</span>
      <div>
        <h3 className="font-semibold text-lg">Location</h3>
        <p className="text-gray-700">{project.location}</p>
      </div>
    </div>

    {project.completedDate && (
      <div className="flex items-start gap-4">
        <span className="text-xl">📆</span>
        <div>
          <h3 className="font-semibold text-lg">Completion Date</h3>
          <p className="text-gray-700">
            {new Date(project.completedDate).toLocaleDateString()}
          </p>
        </div>
      </div>
    )}
  </div>
</div>

    </motion.div>
  );
}
