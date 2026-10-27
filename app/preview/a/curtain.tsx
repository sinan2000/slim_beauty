"use client";

import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * The page's one motion language: a photograph opens like a curtain as it reaches the middle of the
 * viewport, while the picture inside drifts slower than the page. It starts already mostly open, so
 * nothing is hidden before JS runs.
 */
export function Curtain({
  src,
  alt,
  sizes,
  className,
  position = "50% 50%",
  priority,
}: {
  src: StaticImageData;
  alt: string;
  sizes: string;
  className?: string;
  position?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "center 75%"] });
  const { scrollYProgress: pass } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const clip = useTransform(enter, [0, 1], ["inset(10% 6% 10% 6%)", "inset(0% 0% 0% 0%)"]);
  const y = useTransform(pass, [0, 1], ["-7%", "7%"]);
  const scale = useTransform(enter, [0, 1], [1.18, 1.06]);

  return (
    <motion.div ref={ref} className={`relative overflow-hidden ${className ?? ""}`} style={reduced ? undefined : { clipPath: clip }}>
      <motion.div className="absolute inset-[-8%_0]" style={reduced ? undefined : { y, scale }}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} placeholder="blur" className="object-cover" style={{ objectPosition: position }} />
      </motion.div>
    </motion.div>
  );
}
