"use client";

import { useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { beforeAfter } from "../_shared/content";

export function BeforeAfterSlider() {
  // Body remodeling is the salon's core, so its pair leads.
  const order = [1, 0];
  const [active, setActive] = useState(order[0]);
  const [pos, setPos] = useState(50);
  const pair = beforeAfter[active];
  const portrait = pair.before.height > pair.before.width;

  return (
    <div>
      <div role="tablist" aria-label="Alege rezultatul" className="mb-6 inline-flex rounded-full bg-white/70 p-1 shadow-[0_1px_0_rgba(52,16,31,0.06),0_10px_30px_-18px_rgba(52,16,31,0.35)]">
        {order.map((i) => (
          <button
            key={beforeAfter[i].label}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => {
              setActive(i);
              setPos(50);
            }}
            className={
              "rounded-full px-5 py-2 text-sm font-medium transition-colors " +
              (i === active ? "bg-[#34101f] text-[#f6f1ee]" : "b-ink-soft hover:text-[#34101f]")
            }
          >
            {beforeAfter[i].label}
          </button>
        ))}
      </div>

      <div
        className={
          "relative mx-auto overflow-hidden rounded-[2rem] bg-[#ead9d6] shadow-[0_2px_0_rgba(52,16,31,0.04),0_40px_80px_-40px_rgba(52,16,31,0.45)] select-none " +
          (portrait ? "aspect-[1/2] max-w-[22rem]" : "aspect-[5/3] w-full")
        }
      >
        <Image src={pair.after} alt={`După: ${pair.label.toLowerCase()}, rezultat real al unei cliente`} fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={pair.before} alt={`Înainte: ${pair.label.toLowerCase()}`} fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" />
        </div>

        <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-[#f6f1ee]/90 px-3 py-1 text-xs font-medium tracking-wide text-[#34101f]">Înainte</span>
        <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-[#34101f]/85 px-3 py-1 text-xs font-medium tracking-wide text-[#f6f1ee]">După</span>

        <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }} aria-hidden="true">
          <div className="absolute inset-y-0 -translate-x-1/2 w-px bg-white/90 shadow-[0_0_0_0.5px_rgba(52,16,31,0.2)]" />
          <div className="absolute top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#f6f1ee] text-[#34101f] shadow-[0_8px_24px_-6px_rgba(52,16,31,0.5)]">
            <MoveHorizontal className="h-5 w-5" />
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          step={0.5}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Compară înainte și după: ${pair.label}`}
          className="b-range absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
    </div>
  );
}
