//layout
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Providers } from "./providers";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Interior Design Portfolio',
  description: 'Showcasing stunning interior design projects',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <html lang="en">
    //   <body className={cn(inter.className, "min-h-screen")}>
    //     {/* ✅ Now wrap everything inside <Providers> */}
    //     <Providers>
    //       <Navbar /> {/* ✅ Navbar needs session context */}
    //       {children}
    //       <Footer />
    //     </Providers>
    //   </body>
    // </html>

    <html lang="en">
    <body className={cn(inter.className, "min-h-screen")}>
    <Providers>{children}</Providers>
    </body>
  </html>
  );
}