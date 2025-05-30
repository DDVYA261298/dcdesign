"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface ProjectReviewsProps {
  project: {
    reviews: Array<{
      id: string;
      clientName: string;
      text: string;
      rating: number;
    }>;
  };
}

export default function ProjectReviews({ project }: ProjectReviewsProps) {
  return (
    <div className="mb-12">
      <h2 className="mb-6 text-2xl font-semibold">Client Reviews</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {project.reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="mb-4 flex">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="mb-4 text-gray-600">{review.text}</p>
              <p className="font-semibold">{review.clientName}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}