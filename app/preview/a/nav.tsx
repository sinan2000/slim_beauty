"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { contact } from "../_shared/content";

export function Nav() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 160], ["rgba(21,16,12,0)", "rgba(21,16,12,0.82)"]);
  const line = useTransform(scrollY, [0, 160], ["rgba(233,217,191,0)", "rgba(233,217,191,0.12)"]);
  const blur = useTransform(scrollY, [0, 160], ["blur(0px)", "blur(14px)"]);

  return (
    <motion.header
      style={{ backgroundColor: bg, borderColor: line, backdropFilter: blur, WebkitBackdropFilter: blur }}
      className="fixed inset-x-0 top-0 z-40 border-b"
    >
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:h-20 md:px-10" aria-label="Principală">
        <Link href="/preview/a" className="f-display flex items-baseline gap-2 text-xl text-(--cream) md:text-2xl">
          Slim <span className="italic text-(--gold)">&amp;</span> Beauty
          <span className="f-body text-[0.65rem] tracking-[0.3em] text-(--muted) uppercase">by MC</span>
        </Link>
        <div className="flex items-center gap-7 text-sm">
          <Link href="/servicii" className="link-u hidden text-(--cream-dim) hover:text-(--cream) md:inline">
            Servicii
          </Link>
          <a href="#preturi" className="link-u hidden text-(--cream-dim) hover:text-(--cream) md:inline">
            Prețuri
          </a>
          <a href="#contact" className="link-u hidden text-(--cream-dim) hover:text-(--cream) md:inline">
            Contact
          </a>
          <a href={contact.phoneHref} className="btn-ghost h-10 px-5 text-sm">
            Sună-ne
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
