"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";


export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

 

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

if (!session || session.user?.role !== "admin") {
  links.push({ href: "/admin/login", label: "Admin Login" });
}


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white shadow-md"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
      <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/DC_Logo_Signature_Grey.png"
                alt="DC Logo"
                width={70}
                height={70}
                className="object-contain"
              />
      </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-gray-900",
                    pathname === link.href
                      ? "text-gray-900"
                      : "text-gray-600"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact Button */}
        <div className="hidden md:block">
          <Link href="/contact">
            <Button>Get in Touch</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-white md:hidden">
          <nav className="container mx-auto p-4">
            <ul className="flex flex-col space-y-4">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block py-2 text-lg font-medium transition-colors hover:text-gray-900",
                      pathname === link.href
                        ? "text-gray-900"
                        : "text-gray-600"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button className="w-full">Get in Touch</Button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}