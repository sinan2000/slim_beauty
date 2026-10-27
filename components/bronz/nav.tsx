import Link from "next/link";
import { categories, contact } from "@/lib/site-content";

/** Fixed bronz nav. The choreography scrubs `--nav` from 0 to 1 over the first 160px to fade in its backdrop. */
export function BronzNav({ homeHref = "/" }: { homeHref?: string }) {
  return (
    <header data-nav className="nav-bar fixed inset-x-0 top-0 z-40 border-b">
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-5 md:h-20 md:px-10" aria-label="Principală">
        <Link href={homeHref} className="f-display flex shrink-0 items-baseline gap-2 text-xl text-(--cream) md:text-2xl">
          Slim <span className="italic text-(--gold)">&amp;</span> Beauty
          <span className="f-body text-[0.65rem] tracking-[0.3em] text-(--muted) uppercase">by MC</span>
        </Link>
        <div className="flex items-center gap-7 text-sm">
          <Link href="/servicii" className="link-u text-(--cream-dim) hover:text-(--cream)">
            Servicii
          </Link>
          {categories.map((c) => (
            <Link key={c.href} href={c.href} className="link-u hidden text-(--cream-dim) hover:text-(--cream) lg:inline">
              {c.name}
            </Link>
          ))}
          {/* `.btn-ghost` sets display, so the breakpoint toggle needs `!` to win; phones use the sticky bar instead. */}
          <a href={contact.phoneHref} className="btn-ghost h-10 px-5 text-sm max-sm:hidden!">
            Sună-ne
          </a>
        </div>
      </nav>
    </header>
  );
}
