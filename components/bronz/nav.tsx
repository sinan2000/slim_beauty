import Link from "next/link";
import { categories, contact } from "@/lib/site-content";
import { BronzLogo } from "./logo";
import { MobileMenu } from "./mobile-menu";

/** The links mirror `navSchema` in lib/jsonLds.ts; keep the two in step. */
const links = [
  { href: "/servicii", label: "Servicii" },
  ...categories.map((c) => ({ href: c.href, label: c.name, wide: true })),
  { href: "/#preturi", label: "Prețuri" },
  { href: "/#contact", label: "Contact" },
];

/** Fixed bronz nav. `NavBackdrop` fades its backdrop in (`--nav`) on pages that open on a photo hero. */
export function BronzNav() {
  return (
    <header data-nav className="nav-bar fixed inset-x-0 top-0 z-40 border-b">
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-5 md:h-20 md:px-10" aria-label="Principală">
        <Link href="/" aria-label="Slim & Beauty by MC, pagina principală" className="shrink-0 text-(--cream)">
          <BronzLogo variant="compact" title="Slim & Beauty by MC" className="h-9 w-auto md:h-11" />
        </Link>
        <div className="flex items-center gap-7 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`link-u text-(--cream-dim) hover:text-(--cream) ${"wide" in l ? "hidden xl:inline" : "hidden md:inline"}`}
            >
              {l.label}
            </Link>
          ))}
          {/* `.btn-ghost` sets display, so the breakpoint toggle needs `!` to win; phones use the sticky bar instead. */}
          <a href={contact.phoneHref} className="btn-ghost h-10 px-5 text-sm max-sm:hidden!">
            Sună-ne
          </a>
          <MobileMenu links={links.map(({ href, label }) => ({ href, label }))} />
        </div>
      </nav>
    </header>
  );
}
