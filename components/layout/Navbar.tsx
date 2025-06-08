// components/Navbar.tsx
"use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Menu, X } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useSession } from "next-auth/react";
// import Image from "next/image";

// export default function Navbar() {
//   const pathname = usePathname();
//   const { data: session } = useSession();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   // List of links
//   const links = [
//     { href: "/", label: "Home" },
//     { href: "/projects", label: "Projects" },
//     { href: "/about", label: "About" },
//     { href: "/contact", label: "Contact" },
//   ];
//   if (!session || session.user?.role !== "admin") {
//     links.push({ href: "/admin/login", label: "Admin Login" });
//   }

//   // Handle scroll to toggle “backdrop blur + bg change”
//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <header
//       className={cn(
//         "fixed top-0 z-50 w-full transition-all duration-300",
//         isScrolled
//           ? "backdrop-blur-sm bg-white/60 shadow-md"
//           : "bg-transparent"
//       )}
//     >
//       <div className="container mx-auto flex h-16 items-center justify-between px-4">
//         {/* Logo */}
//         <Link href="/" className="inline-block mb-4">
//           <Image
//             src="/images/DC_Logo_converted.png"
//             alt="DC Logo"
//             width={70}
//             height={70}
//             className="object-contain"
//           />
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:block">
//           <ul className="flex space-x-8">
//             {links.map((link) => (
//               <li key={link.href} className="relative">
//                 <Link
//                   href={link.href}
//                   className={cn(
//                     "text-sm font-medium transition-colors hover:text-gray-900",
//                     pathname === link.href
//                       ? "text-gray-900"
//                       : "text-gray-600"
//                   )}
//                 >
//                   <span className="relative">
//                     {link.label}
//                     {/* Animated underline */}
//                     <motion.span
//                       layoutId="nav-underline"
//                       className={cn(
//                         "absolute left-0 right-0 bottom-[-2px] h-[2px] bg-gray-900",
//                         pathname === link.href ? "block" : "hidden"
//                       )}
//                     />
//                   </span>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>

//         {/* Contact Button (Desktop) */}
//         <div className="hidden md:block">
//           <Button
//             className="transition-shadow hover:shadow-lg hover:scale-105"
//             size="sm"
//           >
//             Get in Touch
//           </Button>
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden z-50"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           aria-label={isMenuOpen ? "Close menu" : "Open menu"}
//         >
         
//         </button>
//       </div>

//       {/* Mobile Navigation */}
//       <AnimatePresence>
//         {isMenuOpen && (
//           <motion.div
//             className="fixed inset-0 top-16 z-40 bg-white md:hidden"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.2 }}
//           >
//             <nav className="container mx-auto p-4">
//               <ul className="flex flex-col space-y-4">
//                 {links.map((link) => (
//                   <li key={link.href}>
//                     <Link
//                       href={link.href}
//                       className={cn(
//                         "block py-2 text-lg font-medium transition-colors hover:text-gray-900",
//                         pathname === link.href
//                           ? "text-gray-900"
//                           : "text-gray-600"
//                       )}
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       {link.label}
//                     </Link>
//                   </li>
//                 ))}
//                 <li>
//                   <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
//                     <Button className="w-full transition-shadow hover:shadow-lg">
//                       Get in Touch
//                     </Button>
//                   </Link>
//                 </li>
//               </ul>
//             </nav>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// }


import { useState } from 'react'
import Link from 'next/link'
import { Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { title: 'Home', href: '/' },
    { title: 'About Us', href: '/about' },
    { title: 'Services', href: '/services' },
    { title: 'Portfolio', href: '/projects' },
    { title: 'News', href: '/news' },
    { title: 'Contact', href: '/contact' },
  ]

  return (
     <header className="fixed inset-x-0 top-0 z-50 bg-white/20 backdrop-blur-md transition-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold tracking-wide text-black-900"
            >
              DCDESIGNS
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="p-2 rounded-md text-gray-700 hover:text-black-900 focus:outline-none"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-gray-900 uppercase tracking-wide text-sm"
              >
                {item.title}
              </Link>
            ))}

            {/* Big Admin Button */}
            <Link
              href="/admin/login"
              className="ml-6 px-6 py-3 bg-black text-white text-base font-semibold rounded-md hover:bg-gray-800 transition"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <Transition
        show={isOpen}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-2"
      >
        <nav className="lg:hidden bg-white/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                {item.title}
              </Link>
            ))}
            <Link
              href="/admin/login"
              onClick={() => setIsOpen(false)}
              className="block mt-2 px-3 py-2 rounded-md bg-black text-white text-base font-medium text-center"
            >
              Admin Login
            </Link>
          </div>
        </nav>
      </Transition>
    </header>
  )
}