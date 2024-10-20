import { Playfair_Display } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from '@/components/footer';
import Script from "next/script";
import CookieConsent from "@/components/cookies-consent";
import { cookies } from "next/headers";

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
  const cookieStore = cookies();
  const consent = cookieStore.get('cookie_consent')?.value;

  return (
    <html lang="ro" className={playfair.className}>
      <head>
        {consent === 'accepted' && (
          <>
            <Script
              id="google-gtag"
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=AW-16731906773`}
            />
            <Script
              id="google-gtag-inline"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-16731906773');
            `,
              }}
            />
          </>
        )}
      </head>
      <body className="font-playfair">
        <Navbar />
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
