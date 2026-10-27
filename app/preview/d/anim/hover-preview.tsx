"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";

export type PreviewItem = { image: StaticImageData; price: string };

/**
 * Animation layer for the price list: any descendant marked `data-preview="<index>"` shows that item's photo
 * under a mouse cursor, following it on a spring. Touch, pen and keyboard never trigger it; the rows carry
 * their own thumbnails on small screens.
 */
export function HoverPreview({ items, children }: { items: PreviewItem[]; children: React.ReactNode }) {
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 240, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 240, damping: 28, mass: 0.6 });

  return (
    <div
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        x.set(e.clientX);
        y.set(e.clientY);
        const row = (e.target as HTMLElement).closest<HTMLElement>("[data-preview]");
        const next = row ? Number(row.dataset.preview) : null;
        if (next !== active) {
          // Appear under the cursor instead of springing in from wherever it last was.
          if (active === null) {
            sx.jump(e.clientX);
            sy.jump(e.clientY);
          }
          setActive(next);
        }
      }}
      onPointerLeave={() => setActive(null)}
    >
      {children}

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-30 hidden [@media(hover:hover)_and_(pointer:fine)]:block"
        style={{ x: sx, y: sy }}
      >
        <AnimatePresence>
          {active !== null ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.7, rotate: -5, clipPath: "inset(18% 12% 18% 12%)" }}
              animate={{ opacity: 1, scale: 1, rotate: -2, clipPath: "inset(0% 0% 0% 0%)" }}
              exit={{ opacity: 0, scale: 0.75, rotate: -5, clipPath: "inset(18% 12% 18% 12%)" }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="relative -mt-[11rem] ml-8 h-[22rem] w-[17rem] overflow-hidden shadow-[0_30px_70px_-25px_rgba(0,0,0,.8)]"
            >
              {items.map((item, i) => (
                <Image
                  key={i}
                  src={item.image}
                  alt=""
                  fill
                  sizes="272px"
                  className={`object-cover transition-opacity duration-300 ${i === active ? "opacity-100" : "opacity-0"}`}
                />
              ))}
              <span className="num absolute bottom-0 left-0 bg-(--gold) px-3 py-1.5 text-sm font-semibold text-(--espresso)">
                {items[active].price}
              </span>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
