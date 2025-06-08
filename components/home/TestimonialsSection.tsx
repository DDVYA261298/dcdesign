'use client'

import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'

interface Review {
  _id: string
  text: string
  author: string
  rating?: number
}

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch('/api/reviews')
        if (!res.ok) throw new Error(`API error ${res.status}`)
        const data: Review[] = await res.json()
        setReviews(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [])

  if (loading) {
    return <p className="text-center py-10">Loading testimonials…</p>
  }

  return (
    <section className="py-20 bg-gray-100 px-4">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900">
          Client Testimonials
        </h2>
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={24}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          bulletClass:
            'h-2 w-2 bg-gray-400 opacity-50 rounded-full mx-1 transition-opacity',
          bulletActiveClass: 'opacity-100 bg-primary-600',
        }}
        breakpoints={{
          640: { slidesPerView: 1.5, centeredSlides: true },
          1024: { slidesPerView: 3, centeredSlides: false }
        }}
        className="py-8"
      >
        {reviews.map((rev) => (
          <SwiperSlide key={rev._id} className="px-2">
            <Card className="bg-white shadow-lg rounded-lg border border-gray-200">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="flex space-x-1 mb-4">
                  {[...Array(rev.rating ?? 5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="italic text-gray-700 mb-6 text-center">
                  “{rev.text}”
                </p>
                <p className="font-semibold text-gray-900">— {rev.author}</p>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
