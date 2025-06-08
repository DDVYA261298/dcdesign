// components/home/FeaturedProjects.tsx
"use client";

import { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";

interface Project {
  _id: string;
  title: string;
  description: string;
  images: string[];
}

function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="h-40 bg-gray-200" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
        <div className="h-6 bg-gray-200 rounded w-full mt-2" />
      </div>
    </div>
  );
}

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch("/api/projects?featured=true");
        const data = await res.json();
        if (Array.isArray(data)) setProjects(data.slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  return (
    <section className="py-16 bg-white px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        <motion.h2
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold"
        >
          Featured Projects
        </motion.h2>
        <motion.p
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-base text-gray-600 max-w-xl mx-auto"
        >
          Discover our most impressive interior design transformations.
        </motion.p>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {projects.map((project, idx) => (
            <motion.div
              key={project._id}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <Tilt
                tiltMaxAngleX={4}
                tiltMaxAngleY={4}
                perspective={800}
                scale={1.01}
                transitionSpeed={200}
                className="rounded-lg"
              >
                <Card className="overflow-hidden shadow-lg transition-shadow hover:shadow-2xl">
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-10 pointer-events-none" />
                      <Swiper
                        modules={[Pagination]}
                        spaceBetween={0}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3500, disableOnInteraction: false }}
                        loop
                      >
                        {project.images.map((img, i) => (
                          <SwiperSlide key={i}>
                            <div className="h-40 relative">
                              <Image
                                src={img}
                                alt={project.title}
                                fill
                                className="object-cover"
                                placeholder="blur"
                                blurDataURL="/images/placeholder-blur.png"
                              />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                    <div className="p-4 bg-white">
                      <h3 className="text-lg font-semibold mb-1 text-gray-900 line-clamp-2">
                        {project.title}
                      </h3>
                      <Link href={`/projects/${project._id}`}>
                        <motion.div
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Button
                            variant="outline"
                            className="w-full text-sm flex justify-center items-center"
                          >
                            View Project
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
                        </motion.div>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      )}

      <div className="mt-12 text-center">
        <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
          <Link href="/projects">
          <Button size="lg" className="shadow-lg hover:shadow-2xl">              View All Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
