"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { beforeAfter } from "../_shared/content";

/** Drag (or arrow-key) comparison. A native range input carries the interaction and the accessibility. */
export function BeforeAfter() {
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(50);
  const id = useId();
  const pair = beforeAfter[active];

  return (
    <div className="flex flex-col gap-6">
      <div role="tablist" aria-label="Alege rezultatul" className="flex gap-6">
        {beforeAfter.map((p, i) => (
          <button
            key={p.label}
            role="tab"
            type="button"
            aria-selected={i === active}
            onClick={() => {
              setActive(i);
              setPos(50);
            }}
            className={`border-b pb-1 text-sm tracking-wide transition-colors ${
              i === active ? "border-(--gold) text-(--cream)" : "border-transparent text-(--muted) hover:text-(--cream)"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className={`relative w-full select-none overflow-hidden bg-(--espresso-2) ${active === 0 ? "aspect-[5/3]" : "aspect-[4/5] sm:aspect-[5/4]"}`}>
        <Image src={pair.after} alt={`După: ${pair.label}`} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" style={{ objectPosition: "50% 40%" }} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={pair.before} alt={`Înainte: ${pair.label}`} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" style={{ objectPosition: "50% 40%" }} />
        </div>

        <span className="pointer-events-none absolute left-4 top-4 bg-(--espresso)/70 px-3 py-1 text-xs tracking-[0.2em] text-(--cream) uppercase backdrop-blur-sm">Înainte</span>
        <span className="pointer-events-none absolute right-4 top-4 bg-(--espresso)/70 px-3 py-1 text-xs tracking-[0.2em] text-(--cream) uppercase backdrop-blur-sm">După</span>

        <div className="pointer-events-none absolute inset-y-0 w-px bg-(--gold)" style={{ left: `${pos}%` }}>
          <span className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-(--gold) bg-(--espresso)/80 text-(--gold) shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-sm">
            <svg width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden="true">
              <path d="M6 1 1 6l5 5M16 1l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        <label htmlFor={id} className="sr-only">
          Compară înainte și după
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="ba-range absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <p className="text-sm text-(--muted)">Rezultate reale ale clientelor salonului. Trage de linie ca să compari.</p>
    </div>
  );
}
