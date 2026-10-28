"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Fades the fixed nav's backdrop in (`--nav` 0 → 1) over the first 160px of scroll. Only pages that open on a
 * full-height photo hero (`[data-hero]`) start transparent; every other page, and reduced motion, gets a solid nav.
 * Lives in the root layout, so it re-reads the page on every client navigation.
 */
export function NavBackdrop() {
  const pathname = usePathname();

  useEffect(() => {
    const nav = document.querySelector<HTMLElement>("[data-nav]");
    if (!nav) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still || !document.querySelector("[data-hero]")) {
      nav.style.setProperty("--nav", "1");
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      nav.style.setProperty("--nav", String(Math.min(1, window.scrollY / 160)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
