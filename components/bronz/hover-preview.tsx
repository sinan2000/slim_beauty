"use client";

import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export type PreviewItem = { image: StaticImageData; price: string };

/**
 * GSAP layer for the price list: any descendant marked `data-preview="<index>"` shows that item's photo under a
 * mouse cursor. quickTo drives x/y and a lean taken from the cursor's horizontal speed; the photo opens with a
 * clip-path tween. Only fine pointers with motion allowed get it; rows carry thumbnails on small screens.
 */
export function HoverPreview({ items, children }: { items: PreviewItem[]; children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const follower = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const price = useRef<HTMLSpanElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const mm = gsap.matchMedia();
      mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const el = root.current!;
        const f = follower.current!;
        const c = card.current!;
        const imgs = gsap.utils.toArray<HTMLElement>("[data-preview-img]", c);

        gsap.set(f, { autoAlpha: 1 });
        gsap.set(c, { clipPath: "inset(50% 50% 50% 50%)", scale: 0.8, rotate: -6 });
        gsap.set(imgs, { autoAlpha: 0 });

        const xTo = gsap.quickTo(f, "x", { duration: 0.55, ease: "power3" });
        const yTo = gsap.quickTo(f, "y", { duration: 0.55, ease: "power3" });
        const rTo = gsap.quickTo(c, "rotate", { duration: 0.8, ease: "power3" });

        let active: number | null = null;
        let lastX = 0;

        const show = (i: number) => {
          imgs.forEach((img, n) => gsap.to(img, { autoAlpha: n === i ? 1 : 0, duration: 0.35, overwrite: true }));
          if (price.current) price.current.textContent = items[i].price;
          if (active === null) {
            gsap.to(c, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 0.7, ease: "expo.out", overwrite: "auto" });
          }
          active = i;
        };
        const hide = () => {
          if (active === null) return;
          active = null;
          gsap.to(c, { clipPath: "inset(50% 50% 50% 50%)", scale: 0.8, duration: 0.45, ease: "power3.in", overwrite: "auto" });
        };

        const onMove = contextSafe!((e: PointerEvent) => {
          if (e.pointerType !== "mouse") return;
          // Snap into place on first entry instead of flying in from the last spot.
          if (active === null) gsap.set(f, { x: e.clientX, y: e.clientY });
          xTo(e.clientX);
          yTo(e.clientY);
          rTo(gsap.utils.clamp(-14, 14, (e.clientX - lastX) * 0.6) - 2);
          lastX = e.clientX;
          const row = (e.target as HTMLElement).closest<HTMLElement>("[data-preview]");
          if (row) {
            const i = Number(row.dataset.preview);
            if (i !== active) show(i);
          } else hide();
        });
        const onLeave = contextSafe!(() => hide());

        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        return () => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      {children}

      {/* Hidden until GSAP enables it for fine pointers; visibility is GSAP's autoAlpha, not a CSS initial state. */}
      <div ref={follower} aria-hidden="true" className="pointer-events-none invisible fixed top-0 left-0 z-30">
        <div
          ref={card}
          className="relative -mt-[11rem] ml-8 h-[22rem] w-[17rem] overflow-hidden shadow-[0_30px_70px_-25px_rgba(0,0,0,.8)]"
        >
          {items.map((item, i) => (
            <div key={i} data-preview-img className="absolute inset-0">
              <Image src={item.image} alt="" fill sizes="272px" className="object-cover" />
            </div>
          ))}
          <span ref={price} className="num absolute bottom-0 left-0 bg-(--gold) px-3 py-1.5 text-sm font-semibold text-(--espresso)" />
        </div>
      </div>
    </div>
  );
}
