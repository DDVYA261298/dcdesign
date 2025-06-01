import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="https://dcdesign-media.s3.ap-south-1.amazonaws.com/branding/DC_Logo_Signature_Grey.png"
                alt="DC Logo"
                width={100}
                height={50}
                className="object-contain"
              />
            </Link>
            <p className="mb-4 text-gray-600">
              Transforming spaces into beautiful, functional environments that reflect your unique style and needs.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/dc_designs/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/dcdesigns1987" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/manish-choudhary-39731126/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://in.pinterest.com/dcdesigns1987/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 4.99 3.657 9.126 8.438 10.055-.117-.854-.223-2.164.046-3.096.244-.837 1.567-5.335 1.567-5.335s-.398-.796-.398-1.975c0-1.85 1.073-3.232 2.407-3.232 1.135 0 1.682.852 1.682 1.873 0 1.14-.727 2.844-1.1 4.428-.312 1.322.663 2.399 1.966 2.399 2.359 0 4.163-2.486 4.163-6.074 0-3.178-2.285-5.403-5.547-5.403-3.779 0-6.003 2.837-6.003 5.772 0 1.141.439 2.365.988 3.029a.398.398 0 0 1 .091.381c-.1.418-.322 1.322-.367 1.505-.057.238-.187.29-.434.176-1.62-.755-2.632-3.124-2.632-5.03 0-4.099 2.978-7.856 8.59-7.856 4.508 0 8.014 3.21 8.014 7.494 0 4.477-2.824 8.084-6.748 8.084-1.318 0-2.557-.685-2.98-1.49l-.81 3.086c-.293 1.115-1.088 2.51-1.621 3.362C9.292 23.84 10.62 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-600 hover:text-gray-900">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-600" />
                <span className="text-gray-600">
                  05, Ground Floor, V K Tower, Evershine City, Vasai East,<br /> Vasai-Virar, Maharashtra 401208, India
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-600" />
                <span className="text-gray-600">+91 8105049653</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-600" />
                <span className="text-gray-600">https://dcdesigns.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} DC Design. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
