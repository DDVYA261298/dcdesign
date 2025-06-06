import { Metadata } from "next";
// import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export const metadata: Metadata = {
  title: "Contact Us | Interior Design Portfolio",
  description: "Get in touch with our interior design team",
};

export default function ContactPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-8 text-4xl font-bold text-gray-900 text-center md:text-left">
          Contact Us
        </h1>
        <ContactInfo />
      </div>
    </main>
  );
}