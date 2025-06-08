// // components/Footer.tsx
// "use client";

// // import Link from "next/link";
// // import Image from "next/image";
// // import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, Linkedin, Star } from "lucide-react";
// // import { motion } from "framer-motion";

// // export default function Footer() {
// //   return (
// //     <motion.footer
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.6 }}
// //       className="bg-gray-200 pt-12"
// //     >
// //       <div className="container mx-auto px-4">
// //         <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
// //           {/* Company Info */}
// //           <div>
// //             <Link href="/" className="inline-block mb-4">
// //               <Image
// //                 src="/images/DC Logo Signature(Grey)_converted.png"
// //                 alt="DC Logo"
// //                 width={100}
// //                 height={50}
// //                 className="object-contain"
// //               />
// //             </Link>
// //             <p className="mb-4 text-gray-600">
// //               Transforming spaces into beautiful, functional environments that reflect your unique style and needs.
// //             </p>
// //             <div className="flex space-x-4">
// //               {[Instagram, Facebook, Linkedin, Twitter].map((Icon, idx) => (
// //                 <motion.a
// //                   key={idx}
// //                   href={
// //                     Icon === Instagram
// //                       ? "https://www.instagram.com/dc_designs/"
// //                       : Icon === Facebook
// //                       ? "https://www.facebook.com/dcdesigns1987"
// //                       : Icon === Linkedin
// //                       ? "https://www.linkedin.com/in/manish-choudhary-39731126/"
// //                       : "https://twitter.com/"
// //                   }
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   whileHover={{ scale: 1.2, color: "#1d4ed8" }}
// //                   className="text-gray-500 transition-colors duration-200"
// //                 >
// //                   <Icon className="h-5 w-5" />
// //                 </motion.a>
// //               ))}
// //               {/* Pinterest custom SVG (hoverable) */}
// //               <motion.a
// //                 href="https://in.pinterest.com/dcdesigns1987/"
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 whileHover={{ scale: 1.2, color: "#e60023" }}
// //                 className="text-gray-500 transition-colors duration-200"
// //               >
// //                 <svg
// //                   xmlns="http://www.w3.org/2000/svg"
// //                   fill="currentColor"
// //                   viewBox="0 0 24 24"
// //                   className="h-5 w-5"
// //                 >
// //                   <path d="M12 0C5.373 0 0 5.373 0 … (rest of path) …" />
// //                 </svg>
// //               </motion.a>
// //             </div>
// //           </div>

// //           {/* Quick Links */}
// //           <div>
// //             <h3 className="mb-4 text-lg font-bold text-gray-900">Quick Links</h3>
// //             <ul className="space-y-2">
// //               {[
// //                 { href: "/", label: "Home" },
// //                 { href: "/projects", label: "Projects" },
// //                 { href: "/about", label: "About" },
// //                 { href: "/contact", label: "Contact" },
// //               ].map((link) => (
// //                 <li key={link.href}>
// //                   <Link
// //                     href={link.href}
// //                     className="text-gray-600 transition-colors hover:text-gray-900 hover:underline"
// //                   >
// //                     {link.label}
// //                   </Link>
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>

// //           {/* Contact Info */}
// //           <div>
// //             <h3 className="mb-4 text-lg font-bold text-gray-900">Contact Us</h3>
// //             <ul className="space-y-3">
// //               <li className="flex items-start space-x-3">
// //                 <MapPin className="h-5 w-5 text-gray-600" />
// //                 <span className="text-gray-600">
// //                   05, Ground Floor, V K Tower, Evershine City, Vasai East, <br />
// //                   Vasai-Virar, Maharashtra 401208, India
// //                 </span>
// //               </li>
// //               <li className="flex items-center space-x-3">
// //                 <Phone className="h-5 w-5 text-gray-600" />
// //                 <span className="text-gray-600">+91 8105049653</span>
// //               </li>
// //               <li className="flex items-center space-x-3">
// //                 <Mail className="h-5 w-5 text-gray-600" />
// //                 <span className="text-gray-600">contact@dcdesigns.in</span>
// //               </li>
// //             </ul>
// //           </div>

// //           {/* (Optional) Extra Column or Testimonials Quote */}
// //           <div>
// //             <h3 className="mb-4 text-lg font-bold text-gray-900">Why Choose Us?</h3>
// //             <p className="text-gray-600 mb-4 italic">
// //               “Our clients rave about the way we blend functionality with stunning aesthetics.
// //               We don’t just design rooms—we create experiences.”  
// //             </p>
// //             <div className="flex space-x-2">
// //               <Star className="h-5 w-5 text-yellow-400" />
// //               <Star className="h-5 w-5 text-yellow-400" />
// //               <Star className="h-5 w-5 text-yellow-400" />
// //               <Star className="h-5 w-5 text-yellow-400" />
// //               <Star className="h-5 w-5 text-yellow-400" />
// //             </div>
// //           </div>
// //         </div>

// //         <div className="mt-12 border-t border-gray-300 pt-8 text-center">
// //           <p className="text-sm text-gray-600">
// //             &copy; {new Date().getFullYear()} DC Design. All rights reserved.
// //           </p>
// //         </div>
// //       </div>
// //     </motion.footer>
// //   );
// // }

// import Link from 'next/link';
// import Image from 'next/image';
// import { Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';

// export default function Footer() {
//   return (
//     <footer className="bg-gray-200 py-12">
//       <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
//         <div>
//           <Link href="/">
//             <Image src="/images/logo.png" width={140} height={60} alt="Logo" />
//           </Link>
//           <p className="mt-4 text-gray-600">Transforming spaces into beautiful, functional environments.</p>
//         </div>
//         <div>
//           <h3 className="font-bold mb-4">Quick Links</h3>
//           <ul className="space-y-2 text-gray-600">
//             <li><Link href="#">Home</Link></li>
//             <li><Link href="#services">Services</Link></li>
//             <li><Link href="#portfolio">Portfolio</Link></li>
//             <li><Link href="#contact">Contact</Link></li>
//           </ul>
//         </div>
//         <div>
//           <h3 className="font-bold mb-4">Follow Us</h3>
//           <div className="flex space-x-4 text-gray-600">
//             <Instagram className="h-5 w-5 hover:text-gray-800" />
//             <Facebook className="h-5 w-5 hover:text-gray-800" />
//             <Linkedin className="h-5 w-5 hover:text-gray-800" />
//             <Twitter className="h-5 w-5 hover:text-gray-800" />
//           </div>
//         </div>
//         <div>
//           <h3 className="font-bold mb-4">Contact Us</h3>
//           <p className="text-gray-600">05 Ground Floor, VK Tower, Vasai East, India</p>
//           <p className="mt-2 text-gray-600">+91 8105049653</p>
//         </div>
//       </div>
//       <div className="mt-8 text-center text-gray-600">
//         &copy; {new Date().getFullYear()} Interique. All rights reserved.
//       </div>
//     </footer>
// );
// }