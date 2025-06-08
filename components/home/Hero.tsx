// components/home/Hero.tsx
"use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";

// const heroImages = [
//   "/images/project1/ENTRANCE.jpg",
//   "/images/project1/entire.jpg",
//   "/images/project1/LIVING_ROOM_.jpg",
// ];

// export default function Hero() {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) =>
//         prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="relative h-screen w-full overflow-hidden">
//       {/* Background Images */}
//       {heroImages.map((image, index) => (
//         <div
//           key={image}
//           className={cn(
//             "absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-out",
//             index === currentImageIndex ? "opacity-100" : "opacity-0"
//           )}
//           style={{
//             backgroundImage: `url(${image})`,
//             transform:
//               index === currentImageIndex
//                 ? "scale(1.05)"
//                 : "scale(1)",
//             transition: "transform 1s ease-out",
//           }}
//         />
//       ))}

//       {/* Dark + Gradient Overlay */}
//       <div className="absolute inset-0 bg-black bg-opacity-60" />
//       <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

//       {/* Content (Centered) */}
//       <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
//         <motion.h1
//           key={currentImageIndex} // re-trigger animation on slide change
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl drop-shadow-lg"
//         >
//           Transforming Spaces Into <br /> Beautiful Experiences
//         </motion.h1>
//         <motion.p
//           key={currentImageIndex + "-sub"}
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2, duration: 0.8 }}
//           className="mx-auto mb-8 max-w-2xl text-lg text-gray-200 drop-shadow-sm"
//         >
//           We create stunning interior designs that reflect your personality
//           and elevate your lifestyle. From concept to completion, we're with you every step.
//         </motion.p>
//         <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
//           <motion.div
//             whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.3)" }}
//             transition={{ type: "spring", stiffness: 300 }}
//           >
//             <Link href="/projects">
//               <Button size="lg" className="min-w-[160px] bg-primary text-white">
//                 View Projects
//               </Button>
//             </Link>
//           </motion.div>
//           <motion.div
//             whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.3)" }}
//             transition={{ type: "spring", stiffness: 300 }}
//           >
//             <Link href="/contact">
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="min-w-[160px] border-white text-black hover:bg-white hover:text-gray-900"
//               >
//                 Contact Us
//               </Button>
//             </Link>
//           </motion.div>
//         </div>
//       </div>

//       {/* Indicators */}
//       <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
//         {heroImages.map((_, index) => (
//           <button
//             key={index}
//             className={cn(
//               "h-2 w-8 rounded-full transition-colors duration-300",
//               index === currentImageIndex ? "bg-white" : "bg-white/50"
//             )}
//             onClick={() => setCurrentImageIndex(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const slides = [
  {
    subtitle: 'Furniture Selection',
    title: 'Design Perfection',
    description: 'Welcome to Interique, where exceptional design meets innovative solutions. We specialize in creating spaces that are both beautiful and functional, reflecting your individuality and style.',
    buttonText: 'View Portfolio',
    buttonLink: '/portfolio',
    imageUrl: '/images/project1/ENTRANCE.jpg',
  },
  {
    subtitle: 'Space Planning',
    title: 'Unique Creations',
    description: 'At Interique, we specialize in designing spaces that inspire and elevate your everyday life. Let’s create something extraordinary together with style and purpose.',
    buttonText: 'About Us',
    buttonLink: '/about',
    imageUrl: '/images/project1/entire.jpg',
  },
  {
    subtitle: 'Lighting Solutions',
    title: 'Elegant Living',
    description: 'Welcome to Interique Interior Design, where creativity meets functionality. We transform spaces into personalized masterpieces that reflect your unique style, vision, and lifestyle.',
    buttonText: 'Latest News',
    buttonLink: '/news',
    imageUrl: '/images/project1/LIVING_ROOM_.jpg',
  },
  {
    subtitle: 'Color Harmony',
    title: 'Functional Beauty',
    description: 'Welcome to Interique, where your vision comes to life through innovative design solutions. Together, we’ll create beautiful, functional spaces that reflect your unique personality.',
    buttonText: 'Our Services',
    buttonLink: '/services',
    imageUrl: '/images/project1/BEDROOM.jpg',
  },
];

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
    <Swiper
  modules={[Autoplay, Pagination, Navigation]}
  autoplay={{ delay: 5000, disableOnInteraction: false }}
  pagination={{ clickable: true }}
  navigation
  loop
  className="h-full"
>
  {slides.map((slide, idx) => (
    <SwiperSlide
      key={idx}
      className="relative h-full overflow-hidden"  // ← overflow-hidden here
    >
      {/* animated background layer */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-kenburns"
        style={{ backgroundImage: `url(${slide.imageUrl})` }}
      />

      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* content */}
      <div className="relative z-10 flex flex-col items-start justify-center h-full px-6 md:px-16 lg:px-32 text-white max-w-2xl">
        <h4 className="text-sm uppercase tracking-widest mb-2">
          {slide.subtitle}
        </h4>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {slide.title}
        </h1>
        <p className="mb-6">{slide.description}</p>
        <a
          href={slide.buttonLink}
          className="inline-block px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition"
        >
          {slide.buttonText}
        </a>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

    </section>
  );
}