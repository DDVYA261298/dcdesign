"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProjectDetailsProps {
  project: {
    title: string;
    description: string;
    status: "completed" | "in progress" | string;
    client: string;
    location: string;
    completedDate?: string;
    images?: string[];
    videos?: string[];
  };
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const images = project.images ?? [];
  const previewImages = images.slice(0, 6);

  return (
    <div className="container mx-auto px-6 py-12 space-y-16">
      {/* Title & Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <h1 className="text-5xl font-extrabold text-gray-900">
          {project.title}
        </h1>
        <Badge
          className={`px-5 py-1 ${
            project.status === "completed"
              ? "bg-gradient-to-r from-green-400 to-teal-500 text-white"
              : "bg-gray-400 text-white"
          }`}
        >
          {project.status.toUpperCase()}
        </Badge>
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-3xl text-lg text-gray-700"
      >
        {project.description}
      </motion.p>

      {/* Image Grid */}
      {previewImages.length > 0 && (
        <>
          <h2 className="text-3xl font-semibold text-gray-900">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {previewImages.map((src, idx) => (
              <motion.div
                key={src}
                onClick={() => {
                  setActiveImage(idx);
                  setIsOpen(true);
                }}
                className={`relative overflow-hidden rounded-2xl shadow-lg cursor-pointer ${
                  idx === 0 ? "sm:col-span-2 sm:row-span-2" : ""
                } transition-transform`}
                whileHover={{ scale: 1.03 }}
              >
                <Image
                  src={src}
                  alt={`Project image ${idx + 1}`}
                  width={800}
                  height={600}
                  className="object-cover w-full h-60"
                />
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* Videos */}
      {project.videos?.length ? (
        <div>
          <h2 className="mt-12 text-3xl font-semibold text-gray-900 flex items-center gap-2">
            🎥 Videos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {project.videos!.map((url, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-video">
                    <iframe
                      src={url}
                      title={`Video ${i + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : null}

      {/* Lightbox */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
      >
        <Dialog.Panel className="relative w-full max-w-4xl">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white"
          >
            <X size={20} />
          </button>
          <div className="relative">
            <Image
              src={images[activeImage]}
              alt={`Lightbox ${activeImage + 1}`}
              width={1200}
              height={800}
              className="object-contain rounded-lg"
            />
            <button
              onClick={() =>
                setActiveImage((activeImage - 1 + images.length) % images.length)
              }
              className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-r-lg"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => setActiveImage((activeImage + 1) % images.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-l-lg"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>

      {/* Overview & Metadata */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h3 className="text-2xl font-semibold flex items-center gap-2">
            📋 Overview
          </h3>
          <p className="text-gray-600 leading-relaxed">{project.description}</p>
        </motion.div>

        {/* Info Cards */}
        <div className="space-y-6">
          {[
            { icon: "👤", label: "Client", value: project.client },
            { icon: "📍", label: "Location", value: project.location },
            project.completedDate && {
              icon: "📆",
              label: "Completed",
              value: new Date(project.completedDate).toLocaleDateString(),
            },
          ]
            .filter(
              (item): item is { icon: string; label: string; value: string } =>
                Boolean(item)
            )
            .map(({ icon, label, value }) => (
              <Card key={label}>
                <CardContent className="flex items-center gap-4">
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <h4 className="font-medium">{label}</h4>
                    <p className="text-gray-700">{value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h4 className="text-2xl font-semibold mb-4">
            Interested in partnering on your next project?
          </h4>
          <Button size="lg">Get In Touch</Button>
        </motion.div>
      </div>
    </div>
  );
}
