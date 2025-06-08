import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import 'swiper/css';
import 'swiper/css/pagination';

const projects = [
  { id: 1, image: '/images/port1.jpg', title: 'Dynamic Design' },
  { id: 2, image: '/images/port2.jpg', title: 'Modern Elegance' },
  { id: 3, image: '/images/port3.jpg', title: 'Cozy Living' },
];

export default function PortfolioCarousel() {
  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold">Fresh From Our Studio</h2>
      </div>
      <Swiper modules={[Pagination]} spaceBetween={30} slidesPerView={1} pagination={{ clickable: true }} loop>
        {projects.map((proj) => (
          <SwiperSlide key={proj.id} className="px-4">
            <div className="relative">
              <Image src={proj.image} alt={proj.title} width={800} height={500} className="rounded-lg shadow-lg mx-auto" />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 p-4 rounded">
                <h3 className="text-lg font-semibold">{proj.title}</h3>
                <Button size="sm" className="mt-2">Read More</Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="text-center mt-8">
        <Button size="lg">View All Projects</Button>
      </div>
    </section>
);
}