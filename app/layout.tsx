import type { Metadata } from "next";
import { Playfair_Display } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: "Slim & Beauty by MC - Remodelare corporală și dermato-cosmetică",
  description: "Slim & Beauty by MC oferă o gamă largă de proceduri profesionale dermato-cosmetice și de remodelare corporală în Dumbrăvița, România. Obține-ți obiectivele de frumusețe cu tratamentele noastre experte.",
  keywords: ['Slim & Beauty by MC', 'remodelare corporală', 'dermato-cosmetică', 'Dumbrăvița', 'România']
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
