"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Review {
  _id: string;
  clientName: string;
  text: string;
  rating: number;
  project?: {
    title: string;
  };
}

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("/api/reviews");
        const data = await res.json();
        if (Array.isArray(data)) {
          setReviews(data);
        }
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

  if (loading) return <p className="text-center py-8">Loading testimonials...</p>;

  return (
    <section className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Client Testimonials</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear what our clients have to say about their experience working with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <Card key={review._id} className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">"{review.text}"</p>
                <div>
                  <p className="font-semibold">{review.clientName}</p>
                  <p className="text-sm text-gray-500">
                    {review.project?.title ? `for ${review.project.title}` : ""}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
