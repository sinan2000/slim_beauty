import "./globals.css";
import { Inter, Playfair_Display } from 'next/font/google';
import { CookieConsent } from '@/components/cookie-consent';

import Navbar from "@/components/navbar";
import Footer from '@/components/footer';
import { LaunchAnnouncement } from '@/components/launch-announcement';
import { rootMeta } from "@/lib/metadatas";
import { BeautySalonSchema, webSiteSchema, navSchema } from "@/lib/jsonLds";

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
        <script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <script
          id="business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(BeautySalonSchema) }}
        />

        <script
          id="nav-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(navSchema) }}
        />

        <Navbar />
        {children}
        <Footer />
        <LaunchAnnouncement />
        <CookieConsent />
      </body>
    </html>
  );
}

export const metadata = rootMeta;