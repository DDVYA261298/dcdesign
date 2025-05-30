"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-20 bg-primary">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Let's collaborate to create the perfect interior design that reflects your style and meets your needs.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="font-semibold">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}