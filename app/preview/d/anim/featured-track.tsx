"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import { useMedia } from "./use-media";

/**
 * Animation layer for the featured run: pins the section and maps vertical scroll 1:1 onto horizontal travel
 * on wide screens with motion allowed. Everywhere else the children simply stack. Exposes the progress as the
 * CSS variable `--p` (0 → 1) so the static panels can drift their photos against the track.
 */
export function FeaturedTrack({ labelledBy, children }: { labelledBy: string; children: React.ReactNode }) {
  const wide = useMedia("(min-width: 768px)");
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const pinned = wide && !reduced;

  const outer = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const travel = useMotionValue(0);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    if (!pinned || !track.current) return;
    const el = track.current;
    const measure = () => {
      const distance = Math.max(0, el.scrollWidth - window.innerWidth);
      travel.set(distance);
      setHeight(distance + window.innerHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned, travel]);

  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const x = useTransform(() => -scrollYProgress.get() * travel.get());

  return (
    <section
      ref={outer}
      aria-labelledby={labelledBy}
      className="relative border-t border-(--line)"
      style={pinned && height ? { height } : undefined}
    >
      <div className={pinned ? "sticky top-0 flex h-dvh flex-col justify-center overflow-hidden pt-20" : "py-24"}>
        <motion.div
          ref={track}
          style={pinned ? ({ x, "--p": scrollYProgress } as React.ComponentProps<typeof motion.div>["style"]) : undefined}
          className={pinned ? "feat-track flex w-max items-stretch gap-16 px-10 lg:gap-24" : "flex flex-col gap-24 px-5 md:px-10"}
        >
          {children}
        </motion.div>
        {pinned ? (
          <div className="absolute inset-x-10 bottom-8 h-px bg-(--line)" aria-hidden="true">
            <motion.div className="h-px origin-left bg-(--gold)" style={{ scaleX: scrollYProgress }} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
