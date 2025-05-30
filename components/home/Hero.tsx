"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
    <div className="relative h-screen">
      {/* Background Images */}
      {heroImages.map((image, index) => (
        <div
          key={image}
          className={cn(
            "absolute inset-0 bg-cover bg-center transition-opacity duration-1000",
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          )}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      
      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
            Transforming Spaces Into <br /> Beautiful Experiences
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-200">
            We create stunning interior designs that reflect your personality 
            and elevate your lifestyle. From concept to completion, we're with you every step.
          </p>
          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link href="/projects">
              <Button size="lg" className="min-w-[160px]">
                View Projects
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="min-w-[160px] bg-transparent text-white hover:bg-white hover:text-gray-900">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-8 rounded-full transition-all duration-300",
              index === currentImageIndex ? "bg-white" : "bg-white/50"
            )}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}