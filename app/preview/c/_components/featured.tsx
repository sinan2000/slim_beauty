"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { findService, photos, type PreviewService } from "../../_shared/content";
import { useMedia } from "./use-media";

const featured: { service: PreviewService; image: StaticImageData; alt: string; line: string }[] = [
  {
    service: findService("VShape Anticelulitic"),
    image: photos.vshapeDark,
    alt: "Aplicatorul VShape pe piele, în timpul unei ședințe anticelulitice",
    line: "Radiofrecvență care lucrează în profunzime: stimulează colagenul, activează circulația și netezește aspectul de coajă de portocală.",
  },
  {
    service: findService("Criolipoliză"),
    image: photos.crioSession,
    alt: "Clientă întinsă în timpul unei ședințe de criolipoliză, cu aplicatoarele pe abdomen",
    line: "Răcire controlată pentru grăsimea localizată care nu pleacă nici cu dieta, nici cu sala.",
  },
  {
    service: findService("Bronzare Organică DHA"),
    image: photos.bronzDark,
    alt: "Clientă cu bronz organic uniform, fotografiată din spate pe fundal întunecat",
    line: "Un bronz uniform, fără soare și fără solar, aplicat în salon în aproximativ douăzeci de minute.",
  },
];

function perSession(price: number, label: string) {
  const n = Number.parseInt(label, 10);
  return Number.isFinite(n) && n > 1 ? Math.round(price / n) : null;
}

function Panel({ item }: { item: (typeof featured)[number] }) {
  const { service } = item;
  return (
    <article className="grid shrink-0 gap-6 md:h-[min(78vh,44rem)] md:w-[min(86vw,78rem)] md:grid-cols-[1.05fr_1fr] md:gap-10">
      <div className="relative aspect-[4/5] overflow-hidden md:aspect-auto md:h-full">
        <Image src={item.image} alt={item.alt} fill sizes="(min-width: 768px) 44vw, 100vw" className="object-cover" />
      </div>
      <div className="flex flex-col justify-between gap-8 md:py-2">
        <div>
          <h3 className="ed-display text-[clamp(2.6rem,5.4vw,5.5rem)] font-[550] leading-[0.92]">{service.title}</h3>
          <p className="mt-6 max-w-[42ch] text-lg leading-snug text-[var(--ink-soft)]">{item.line}</p>
          {service.duration ? (
            <p className="mt-3 text-sm text-[var(--ink-soft)]">Ședința durează {service.duration} de minute.</p>
          ) : null}
        </div>
        <div>
          <table className="ed-num w-full border-t border-[var(--ink)] text-left">
            <caption className="sr-only">Prețuri {service.title}</caption>
            <tbody>
              {service.tiers.map((tier) => {
                const each = perSession(tier.price, tier.label);
                return (
                  <tr key={tier.label} className="border-b border-[var(--rule)]">
                    <th scope="row" className="py-3 font-normal">
                      {tier.label}
                    </th>
                    <td className="py-3 text-sm text-[var(--ink-soft)]">{each ? `${each} RON / ședință` : ""}</td>
                    <td className="ed-display py-3 text-right text-2xl">{tier.price} RON</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Link
            href={service.href}
            className="group mt-5 inline-flex items-center gap-1.5 font-medium underline decoration-[var(--rule)] hover:text-[var(--accent)] hover:decoration-[var(--accent)]"
          >
            Totul despre {service.title}
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/**
 * Pinned horizontal run on wide screens with motion allowed; a plain stacked column everywhere else.
 * The section's height is set to exactly the horizontal travel plus one viewport, so the scroll maps 1:1.
 */
export function Featured() {
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
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={outer}
      aria-labelledby="ed-featured"
      className="relative border-b border-[var(--ink)]"
      style={pinned && height ? { height } : undefined}
    >
      <div className={pinned ? "sticky top-0 flex h-dvh flex-col justify-center overflow-hidden pt-16" : "py-20"}>
        <motion.div
          ref={track}
          style={pinned ? { x } : undefined}
          className={
            pinned
              ? "flex w-max items-stretch gap-16 px-8 lg:gap-24 lg:px-12"
              : "flex flex-col gap-20 px-4 md:px-8"
          }
        >
          <div className={pinned ? "flex w-[min(34vw,30rem)] shrink-0 flex-col justify-end pb-2" : ""}>
            <h2 id="ed-featured" className="ed-display text-[clamp(2.8rem,6vw,6.5rem)] font-[550] leading-[0.9]">
              Trei motive să <span className="italic text-[var(--accent)]">ne suni</span> azi.
            </h2>
            <p className="mt-6 max-w-[32ch] text-lg leading-snug text-[var(--ink-soft)]">
              Prețuri reale, afișate. Cu cât iei mai multe ședințe în pachet, cu atât plătești mai puțin pe fiecare.
            </p>
          </div>
          {featured.map((item) => (
            <Panel key={item.service.title} item={item} />
          ))}
        </motion.div>
        {pinned ? (
          <div className="absolute inset-x-8 bottom-6 h-px bg-[var(--rule)] lg:inset-x-12" aria-hidden="true">
            <motion.div className="h-px origin-left bg-[var(--ink)]" style={{ scaleX: progress }} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
