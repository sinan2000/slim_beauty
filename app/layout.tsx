import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Dancing_Script, Great_Vibes } from 'next/font/google'
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: "Slim & Beauty by MC",
  description: "Slim & Beauty by MC",
};

const playfair = Playfair_Display({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.className} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
