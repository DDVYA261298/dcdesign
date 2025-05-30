import { Metadata } from "next";
import Image from "next/image";
import TeamSection from "@/components/about/TeamSection";
import ValuesSection from "@/components/about/ValueSection";


export const metadata: Metadata = {
  title: "About Us | Interior Design Portfolio",
  description: "Learn about our interior design firm, our team, and our values",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <h1 className="mb-6 text-4xl font-bold text-gray-900">About Us</h1>
          <p className="mb-4 text-lg text-gray-700">
          At DC Designs, we specialize in creating aesthetic workspaces that are finely attuned to the unique requirements of each client. Our philosophy blends economy with design, and innovation with style, ensuring that every project exceeds creative and technical aspirations. With a commitment to thoughtful craftsmanship and meticulous execution, we transform ordinary spaces into extraordinary environments that are both functional and inspiring.
          </p>
          <p className="mb-4 text-lg text-gray-700">
          As a recognized Design-Build firm, DC Designs is known for its incessant creativity, discerning taste, and distinctive approach. We merge the organic with the geometric, the artistic with the practical, and the bold with the everyday to craft spaces that leave a lasting impression. Each project reflects our passion for originality and a keen eye for detail, resulting in designs that are truly one-of-a-kind.
          </p>
          <p className="mb-4 text-lg text-gray-700">
          Led by Interior Designer Mr. Manish Choudhary, our team brings together instinctive talent, technical expertise, and a deep dedication to quality. With extensive experience across commercial, residential, and hospitality projects, we approach every project with strategic thinking, proactive solution-seeking, and a commitment to delivering value. At DC Designs, we believe great design is not just about aesthetics—it's about creating meaningful spaces that enhance the way people live and work.
          </p>
        </div>
        <div className=
        "relative h-[400px] overflow-hidden rounded-lg shadow-lg">
          <Image
            src="https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg"
            alt="Our design studio"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      
      <ValuesSection />
      <TeamSection />
    </div>
  );
}