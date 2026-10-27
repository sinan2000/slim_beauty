import "./bronz.css";
import { contact } from "@/lib/site-content";
import { bronzFonts } from "./fonts";
import { BronzChoreo } from "./choreo";
import { BronzNav } from "./nav";
import { BronzFooter } from "./footer";

/**
 * Page frame for every bronz page: fonts, scoped styles, the GSAP choreography root, nav, footer and the sticky
 * mobile contact bar. Pages render their sections (and their own `<main>`) as children.
 */
export function BronzShell({
  children,
  whatsapp = contact.whatsapp,
  homeHref,
}: {
  children: React.ReactNode;
  /** Prefilled WhatsApp link for the mobile bar, e.g. one that names the treatment. */
  whatsapp?: string;
  homeHref?: string;
}) {
  return (
    <BronzChoreo className={`bronz ${bronzFonts} min-h-dvh pb-20 md:pb-0`}>
      <BronzNav homeHref={homeHref} />
      {children}
      <BronzFooter />
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-(--line) bg-(--espresso)/90 p-3 backdrop-blur-md md:hidden">
        <a href={contact.phoneHref} className="btn-gold h-12 text-sm">Sună</a>
        <a href={whatsapp} target="_blank" rel="noopener" className="btn-ghost h-12 text-sm">WhatsApp</a>
      </div>
    </BronzChoreo>
  );
}
