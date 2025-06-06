// components/home/TestimonialsSection.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

// Import Swiper components and modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Review {
  _id: string;
  clientName: string;
  text: string;
  rating: number;
  project?: {
    title: string;
  };
  imageUrl?: string;
}

// A simple skeleton card to show while loading
function TestimonialSkeleton() {
  return (
    <div className="animate-pulse space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-6">
      <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-1/3 mt-4"></div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/reviews");
        if (!res.ok) throw new Error(`API returned ${res.status}`);
        const data: Review[] = await res.json();
        console.log("Fetched reviews:", data);
        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          setError("Unexpected response format.");
          setReviews([]);
        }
      } catch (err: any) {
        console.error("Failed to fetch reviews:", err);
        setError(err.message || "Failed to fetch.");
        setReviews([]);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white px-4 md:px-0">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold tracking-tight mb-4 text-gray-900"
          >
            Client Testimonials
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Hear what our clients have to say about their experience working with us.
          </motion.p>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <TestimonialSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error Message */}
        {!loading && error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {/* No Reviews Message */}
        {!loading && !error && reviews.length === 0 && (
          <p className="text-center text-gray-500">No testimonials yet.</p>
        )}

        {/* Reviews Carousel / Grid */}
        {!loading && !error && reviews.length > 0 && (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            // Show navigation arrows on mobile/medium; hide on large
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              // 0px up to 1023px → 1 slide per view
              0: {
                slidesPerView: 1,
              },
              // 1024px and above → 3 slides per view
              1024: {
                slidesPerView: 3,
              },
            }}
            className="relative"
          >
            {reviews.map((review, idx) => (
              <SwiperSlide key={review._id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <Card className="rounded-lg border border-gray-200 bg-white shadow-lg transition-shadow hover:shadow-2xl">
                    <CardContent className="p-6 flex flex-col h-full">
                      {/* Star Rating */}
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.3, color: "#fbbf24" }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Star
                              className={`h-5 w-5 ${
                                i < review.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          </motion.div>
                        ))}
                      </div>

                      {/* Review Text */}
                      <p className="text-gray-700 mb-6 italic flex-grow leading-relaxed">
                        “{review.text}”
                      </p>

                      {/* Client & Project */}
                      <div>
                        <p className="font-semibold text-gray-900">
                          {review.clientName}
                        </p>
                        {review.project?.title && (
                          <p className="text-sm text-gray-500">
                            for <span className="font-medium">{review.project.title}</span>
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </SwiperSlide>
            ))}

            {/* Navigation buttons (only visible on <1024px by default styling) */}
            <button className="swiper-button-prev absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md hidden lg:block">
              <span className="sr-only">Previous</span>
              {/* You can swap these arrows for lucide-react icons if you prefer */}
              &#10094;
            </button>
            <button className="swiper-button-next absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md hidden lg:block">
              <span className="sr-only">Next</span>
              &#10095;
            </button>
          </Swiper>
        )}
      </div>
    </section>
  );
}
