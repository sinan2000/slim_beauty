import { allServices, contact, whatsappFor } from "@/lib/site-content";
import { BronzNav } from "./nav";
import { BronzFooter } from "./footer";
import { MobileBar } from "./mobile-bar";
import { NavBackdrop } from "./nav-backdrop";

const whatsappByPath = Object.fromEntries(allServices.map((s) => [s.href, whatsappFor(s.title)]));

/**
 * Site chrome for every page, rendered once by the root layout: nav, footer and the sticky mobile contact bar.
 * Pages render their own `<main>` inside a `BronzChoreo`, so each navigation gets fresh scroll triggers.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BronzNav />
      <NavBackdrop />
      {children}
      <BronzFooter />
      <MobileBar phoneHref={contact.phoneHref} whatsapp={contact.whatsapp} whatsappByPath={whatsappByPath} />
    </>
  );
}
