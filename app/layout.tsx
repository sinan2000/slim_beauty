import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Dancing_Script, Great_Vibes } from 'next/font/google'
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
