import "./globals.css";
import "@/components/bronz/bronz.css";
import { CookieConsent } from '@/components/cookie-consent';
import { LaunchAnnouncement } from '@/components/launch-announcement';
import { AnalyticsEvents } from '@/components/analytics-events';
import { bronzFonts } from '@/components/bronz/fonts';
import { SiteShell } from '@/components/bronz/site-shell';
import { rootMeta } from "@/lib/metadatas";
import { BeautySalonSchema, webSiteSchema, navSchema } from "@/lib/jsonLds";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ro" data-scroll-behavior="smooth" className="scroll-smooth">
      <body className={`bronz ${bronzFonts} min-h-dvh pb-20 md:pb-0`}>
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

        <SiteShell>{children}</SiteShell>
        <LaunchAnnouncement />
        <CookieConsent />
        <AnalyticsEvents />
      </body>
    </html>
  );
}

export const metadata = rootMeta;
