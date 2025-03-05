import "./globals.css";
import { Inter, Playfair_Display } from 'next/font/google';
import { GoogleTagManager } from '@next/third-parties/google';

import Navbar from "@/components/navbar";
import Footer from '@/components/footer';
import { SNSFooter } from '@/components/sns/footer';
import { rootMeta } from "@/lib/metadatas";

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

export const metadata = rootMeta;