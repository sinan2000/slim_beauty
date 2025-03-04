import "./globals.css";
import { Inter, Playfair_Display } from 'next/font/google';
import { GoogleTagManager } from '@next/third-parties/google';

import Navbar from "@/components/navbar";
import Footer from '@/components/footer';
import { SNSFooter } from '@/components/sns/footer';
import type { Metadata } from "next";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ro" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <GoogleTagManager gtmId="GTM-5L3ZD3KW" />

        <Navbar />
        {children}
        <Footer />

        <SNSFooter />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL("https://www.slimandbeauty.ro"),
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow",
  },
  authors: [{ name: "Slim & Beauty by MC" }],
  creator: "Slim & Beauty",
  publisher: "Slim & Beauty",
}