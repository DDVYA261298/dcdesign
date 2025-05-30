// components/projects/ProjectMedia.tsx
"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProjectMediaProps {
  project: {
    images: string[];
    videos: string[];
  };
}

export default function ProjectMedia({ project }: ProjectMediaProps) {
  const { images, videos } = project;

  if ((!images || images.length === 0) && (!videos || videos.length === 0)) return null;

  return (
    <div className="mb-12">
      {(images && images.length > 0) && (
        <>
          <h2 className="mb-6 text-2xl font-semibold">Project Gallery</h2>
          <Carousel>
            <CarouselContent>
              {images.map((src, index) => (
                <CarouselItem key={index} className="flex items-center justify-center">
                  <Image
                    src={src}
                    alt={`Project image ${index + 1}`}
                    width={900}
                    height={600}
                    className="rounded-lg object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </>
      )}

      {(videos && videos.length > 0) && (
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-semibold">Project Videos</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {videos.map((video, index) => (
              <div key={index} className="overflow-hidden rounded-lg">
                <div className="aspect-video">
                  <iframe
                    src={video}
                    title={`Project video ${index + 1}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
