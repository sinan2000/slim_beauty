import { Playfair_Display } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from '@/components/footer';
import CookieConsent from "@/components/cookies-consent";
import GoogleTagManagerInit from '@/components/tagmanager';

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
      <GoogleTagManagerInit />
      <body className="font-playfair">
        <Navbar />
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
