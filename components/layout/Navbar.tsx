// components/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Base nav links
  const links = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/admin/login", label: "Admin" },
  ];

  // Toggle backdrop blur + background once user scrolls down
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "backdrop-blur-sm bg-white/60 shadow-md"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="inline-block mb-4">
          <Image
            src="/images/DC_Logo_converted.png"
            alt="DC Logo"
            width={70}
            height={70}
            className="object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {links.map((link) => (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-gray-900",
                    pathname === link.href ? "text-gray-900" : "text-gray-600"
                  )}
                >
                  <span className="relative">
                    {link.label}
                    {/* Animated underline on active link */}
                    <motion.span
                      layoutId="nav-underline"
                      className={cn(
                        "absolute left-0 right-0 bottom-[-2px] h-[2px] bg-gray-900",
                        pathname === link.href ? "block" : "hidden"
                      )}
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* “Get in Touch” button (desktop) */}
        <div className="hidden md:block">
          <Button
            className="transition-shadow hover:shadow-lg hover:scale-105"
            size="sm"
          >
            Get in Touch
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <AnimatePresence initial={false} mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile navigation panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 top-16 z-40 bg-white md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="container mx-auto p-4">
              <ul className="flex flex-col space-y-4">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "block py-2 text-lg font-medium transition-colors hover:text-gray-900",
                        pathname === link.href ? "text-gray-900" : "text-gray-600"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full transition-shadow hover:shadow-lg">
                      Get in Touch
                    </Button>
                  </Link>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
