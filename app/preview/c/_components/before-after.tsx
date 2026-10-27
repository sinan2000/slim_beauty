"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { MoveHorizontal } from "lucide-react";
import { beforeAfter } from "../../_shared/content";

/**
 * Drag anywhere on the photo. A native range input covers the frame, so mouse, touch and arrow keys
 * all move the same divider without custom pointer handling.
 */
function Compare({
  label,
  before,
  after,
  className,
  sizes,
}: {
  label: string;
  before: StaticImageData;
  after: StaticImageData;
  className: string;
  sizes: string;
}) {
  const [pos, setPos] = useState(50);

  return (
    <figure className="flex flex-col gap-3">
      <div
        className={`relative select-none overflow-hidden bg-[var(--paper-deep)] has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-4 has-[input:focus-visible]:outline-[var(--accent)] ${className}`}
      >
        <Image src={after} alt={`${label}, după tratament`} fill sizes={sizes} className="object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={before} alt={`${label}, înainte de tratament`} fill sizes={sizes} className="object-cover" />
        </div>

        <span className="pointer-events-none absolute left-3 top-3 bg-[var(--paper)] px-2.5 py-1 text-xs font-medium uppercase tracking-[0.12em]">
          Înainte
        </span>
        <span className="pointer-events-none absolute right-3 top-3 bg-[var(--ink)] px-2.5 py-1 text-xs font-medium uppercase tracking-[0.12em] text-[var(--paper)]">
          După
        </span>

        <div className="pointer-events-none absolute inset-y-0 w-px bg-white" style={{ left: `${pos}%` }} aria-hidden="true">
          <span className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-[0_8px_24px_-6px_rgb(23_18_15/0.5)]">
            <MoveHorizontal className="size-5" />
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`${label}: trage ca să compari înainte și după`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="text-sm text-[var(--ink-soft)]">{label}</figcaption>
    </figure>
  );
}

export function BeforeAfter() {
  const [face, body] = beforeAfter;
  return (
    <section aria-labelledby="ed-results" className="bg-[var(--paper-deep)] px-4 py-20 md:px-8 md:py-28 lg:px-12">
      <h2 id="ed-results" className="ed-display max-w-[16ch] text-[clamp(2.8rem,7vw,7rem)] font-[550] leading-[0.9]">
        Clientele noastre, <span className="italic text-[var(--accent)]">înainte și după.</span>
      </h2>
      <p className="mt-6 max-w-[44ch] text-lg leading-snug text-[var(--ink-soft)]">
        Trage de linie ca să vezi diferența. Sunt rezultate ale unor cliente reale ale salonului.
      </p>
      <div className="mt-12 grid items-start gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-9">
          <Compare {...face} className="aspect-[1246/756]" sizes="(min-width: 768px) 70vw, 100vw" />
        </div>
        <div className="mx-auto w-full max-w-sm md:col-span-3 md:max-w-none">
          <Compare {...body} className="aspect-[514/1068]" sizes="(min-width: 768px) 24vw, 90vw" />
        </div>
      </div>
    </section>
  );
}
