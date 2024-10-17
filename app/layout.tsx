import type { Metadata } from "next";
import { Playfair_Display } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: "Slim & Beauty by MC",
  description: "Slim & Beauty by MC",
};

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className={playfair.className}>
      <body className="font-playfair">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
