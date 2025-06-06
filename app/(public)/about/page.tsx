// app/about/page.tsx
import { Metadata } from "next";
import Image from "next/image";
import ValuesSection from "@/components/about/ValueSection";
import ProcessSection from "@/components/about/ProcessSection";
import TeamSection from "@/components/about/TeamSection";

export const metadata: Metadata = {
  title: "About Us | Interior Design Portfolio",
  description: "Learn about our interior design firm, our team, and our values",
};

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* Hero‐style Intro */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h1 className="mb-6 text-4xl font-bold text-gray-900">About Us</h1>
            <p className="mb-4 text-lg text-gray-700">
              At DC Designs, we specialize in creating aesthetic workspaces that 
              are finely attuned to your unique needs. Our philosophy blends 
              economy with design, and innovation with style—transforming 
              ordinary spaces into extraordinary environments.
            </p>
            <p className="mb-4 text-lg text-gray-700">
              Led by Interior Designer Mr. Manish Choudhary, our team merges 
              creativity and technical expertise to deliver value on every project. 
              We believe great design is not just about aesthetics—it's about 
              creating meaningful spaces that elevate how you live and work.
            </p>
          </div>

          <div className="relative h-[400px] overflow-hidden rounded-lg shadow-lg">
            <Image
              src="https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg"
              alt="Our design studio"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <ValuesSection />

      {/* Process Timeline */}
      <ProcessSection />

      {/* Team Profiles */}
      <TeamSection />
    </main>
  );
}
