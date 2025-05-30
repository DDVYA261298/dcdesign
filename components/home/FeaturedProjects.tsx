"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface Project {
  _id: string;
  title: string;
  description: string;
  images: string[];
}

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch("/api/projects?featured=true");
        const data = await res.json();
        if (Array.isArray(data)) {
          setProjects(data.slice(0, 3)); // Get only 3
        }
      } catch (err) {
        console.error("Failed to fetch featured projects:", err);
      }
    }

    fetchFeatured();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Featured Projects</h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            Discover our most impressive interior design transformations that showcase our expertise and creativity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project._id} className="overflow-hidden">
              <CardContent className="p-0">
                <Swiper spaceBetween={0} slidesPerView={1}>
                  {project.images.map((img, index) => (
                    <SwiperSlide key={index}>
                      <div className="aspect-video relative">
                        <Image
                          src={img}
                          alt={project.title}
                          layout="fill"
                          className="object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <Link href={`/projects/${project._id}`}>
                    <Button variant="outline" className="w-full">
                      View Project
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/projects">
            <Button size="lg">
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
