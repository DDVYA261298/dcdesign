// components/home/Hero.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const heroImages = [
  "/images/project1/ENTRANCE.jpg",
  "/images/project1/entire.jpg",
  "/images/project1/LIVING_ROOM_.jpg",
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Images */}
      {heroImages.map((image, index) => (
        <div
          key={image}
          className={cn(
            "absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-out",
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          )}
          style={{
            backgroundImage: `url(${image})`,
            transform:
              index === currentImageIndex
                ? "scale(1.05)"
                : "scale(1)",
            transition: "transform 1s ease-out",
          }}
        />
      ))}

      {/* Dark + Gradient Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Content (Centered) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
        <motion.h1
          key={currentImageIndex} // re-trigger animation on slide change
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl drop-shadow-lg"
        >
          Transforming Spaces Into <br /> Beautiful Experiences
        </motion.h1>
        <motion.p
          key={currentImageIndex + "-sub"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mx-auto mb-8 max-w-2xl text-lg text-gray-200 drop-shadow-sm"
        >
          We create stunning interior designs that reflect your personality
          and elevate your lifestyle. From concept to completion, we're with you every step.
        </motion.p>
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.3)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link href="/projects">
              <Button size="lg" className="min-w-[160px] bg-primary text-white">
                View Projects
              </Button>
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.3)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="min-w-[160px] border-white text-black hover:bg-white hover:text-gray-900"
              >
                Contact Us
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-8 rounded-full transition-colors duration-300",
              index === currentImageIndex ? "bg-white" : "bg-white/50"
            )}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
