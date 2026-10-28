"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Phone menu on the native popover API: light dismiss, Escape and focus return come from the browser. It closes
 * itself after a client navigation, since the layout (and so the popover) outlives the page.
 */
export function MobileMenu({ links }: { links: { href: string; label: string }[] }) {
  const panel = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (panel.current?.matches(":popover-open")) panel.current.hidePopover();
  }, [pathname]);

  return (
    <>
      <button type="button" popoverTarget="bz-menu" className="flex h-10 items-center gap-2 text-sm text-(--cream) md:hidden" aria-label="Deschide meniul">
        <svg width="22" height="10" viewBox="0 0 22 10" fill="none" aria-hidden="true">
          <path d="M1 1h20M7 9h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        Meniu
      </button>
      <div
        ref={panel}
        id="bz-menu"
        popover="auto"
        className="bz-menu m-0 h-dvh max-h-none w-full max-w-none border-0 bg-(--espresso) p-0 text-(--cream)"
      >
        <div className="flex h-16 items-center justify-end px-5">
          <button type="button" popoverTarget="bz-menu" popoverTargetAction="hide" className="h-10 text-sm text-(--cream-dim)">
            Închide
          </button>
        </div>
        <ul className="flex flex-col gap-1 px-5 pt-6">
          {links.map((l) => (
            <li key={l.href} className="border-b border-(--line)">
              <Link href={l.href} onClick={() => panel.current?.hidePopover()} className="f-display block py-4 text-3xl">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
