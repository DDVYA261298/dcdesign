// components/home/CTASection.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="relative bg-gradient-to-r from-gray-100 to-gray-50 text-gray-900 overflow-hidden">
      {/* Decorative Wave at the top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-16"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1200 0L0 0 892.25 114.72 1200 0z"
            fill="currentColor"
            className="text-gray-200"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-tight"
          >
            Ready to Transform Your Space?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-base sm:text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto"
          >
            Let’s collaborate to create the perfect interior design that reflects your style and meets your needs.
          </motion.p>

          <motion.div
            whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(0,0,0,0.1)" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="inline-block"
          >
            <Link href="/contact">
              <Button
                size="lg"
                variant="secondary"
                className="
                  font-semibold 
                  bg-gray-900 
                  text-white 
                  hover:bg-gray-800 
                  border-transparent 
                  group
                "
              >
                <span className="flex items-center">
                  Get Started Today
                  <motion.span
                    className="ml-2"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ArrowRight className="h-5 w-5 text-white group-hover:text-gray-200" />
                  </motion.span>
                </span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Slight gradient overlay at the bottom for smoother transition */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />
    </section>
  );
}
