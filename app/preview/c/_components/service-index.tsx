"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { categories, photos, type PreviewService } from "../../_shared/content";

/** Real photos over promo graphics; services without their own photo borrow the salon room or the facial. */
const overrides: Record<string, StaticImageData> = {
  "Criolipoliză": photos.crioRoom,
  "Epilare Definitivă cu Laser Diodă": photos.laserLeg,
  "Bronzare Organică DHA": photos.bronzMirror,
};

function imageFor(s: PreviewService) {
  return overrides[s.title] ?? s.image ?? (s.category.startsWith("Dermato") ? photos.heroFace : photos.salonRoom);
}

function priceLabel(s: PreviewService) {
  return s.tiers.length === 0 ? "La evaluare" : `${s.tiers[0].price} RON`;
}

const flat = categories.flatMap((c) => c.services);

export function ServiceIndex() {
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });

  return (
    <section
      id="preturi"
      aria-labelledby="ed-index"
      className="scroll-mt-16 px-4 py-20 md:px-8 md:py-28 lg:px-12"
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
    >
      <div className="grid gap-6 md:grid-cols-12">
        <h2 id="ed-index" className="ed-display text-[clamp(2.8rem,7vw,7rem)] font-[550] leading-[0.9] md:col-span-8">
          Toate tratamentele, <span className="italic">cu prețul la vedere.</span>
        </h2>
        <p className="max-w-[36ch] self-end text-[var(--ink-soft)] md:col-span-4">
          Prețul afișat e pentru o ședință. Pachetele de 6 sau 10 ședințe (2 sau 3 la criolipoliză) costă mai puțin pe
          ședință și le găsești pe pagina fiecărui tratament.
        </p>
      </div>

      {categories.map((category) => (
        <div key={category.name} className="mt-16 md:mt-20">
          <div className="flex items-baseline justify-between gap-4 border-b-2 border-[var(--ink)] pb-3">
            <h3 className="text-xl font-semibold md:text-2xl">{category.name}</h3>
            <Link href={category.href} className="shrink-0 text-sm underline decoration-[var(--rule)] hover:text-[var(--accent)]">
              Vezi categoria
            </Link>
          </div>
          <ul onPointerLeave={() => setActive(null)}>
            {category.services.map((s) => {
              const index = flat.indexOf(s);
              return (
                <li key={s.title} className="border-b border-[var(--rule)]">
                  <Link
                    href={s.href}
                    onPointerEnter={(e) => {
                      if (e.pointerType !== "mouse") return;
                      // Appear under the cursor instead of springing in from wherever it last was.
                      if (active === null) {
                        sx.jump(e.clientX);
                        sy.jump(e.clientY);
                      }
                      setActive(index);
                    }}
                    onFocus={() => setActive(null)}
                    className="group grid grid-cols-[3.5rem_1fr_auto] items-center gap-x-4 py-4 md:grid-cols-[1fr_8rem_9rem_2rem] md:gap-x-6 md:py-5"
                  >
                    <span className="relative size-14 overflow-hidden md:hidden">
                      <Image src={imageFor(s)} alt="" fill sizes="56px" className="object-cover" />
                    </span>
                    <span className="ed-display text-[clamp(1.5rem,3.6vw,3.4rem)] leading-[1.02] transition-[color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 group-hover:italic group-hover:text-[var(--accent)]">
                      {s.title}
                    </span>
                    <span className="hidden text-sm text-[var(--ink-soft)] md:block">
                      {s.duration ? `${s.duration} min` : ""}
                    </span>
                    <span className="ed-num whitespace-nowrap text-right text-base font-medium md:text-lg">
                      <span className="sr-only"> · </span>
                      {priceLabel(s)}
                      {s.duration ? (
                        <span className="block text-xs font-normal text-[var(--ink-soft)] md:hidden">{s.duration} min</span>
                      ) : null}
                    </span>
                    <ArrowUpRight
                      className="hidden size-6 justify-self-end transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--accent)] md:block"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {/* Cursor-following preview, only for a precise pointer that can hover. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-30 hidden [@media(hover:hover)_and_(pointer:fine)]:block"
        style={{ x: sx, y: sy }}
      >
        <AnimatePresence>
          {active !== null ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              exit={{ opacity: 0, scale: 0.6, rotate: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              className="relative -ml-[8.5rem] -mt-[11rem] h-[22rem] w-[17rem] overflow-hidden shadow-[0_24px_60px_-20px_rgb(23_18_15/0.55)]"
            >
              {flat.map((s, i) => (
                <Image
                  key={s.title}
                  src={imageFor(s)}
                  alt=""
                  fill
                  sizes="272px"
                  className={`object-cover transition-opacity duration-300 ${i === active ? "opacity-100" : "opacity-0"}`}
                />
              ))}
              <span className="ed-num absolute bottom-0 left-0 bg-[var(--accent)] px-3 py-1.5 text-sm font-medium text-white">
                {priceLabel(flat[active])}
              </span>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
