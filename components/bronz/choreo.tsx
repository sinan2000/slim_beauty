"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/**
 * Generic GSAP choreography for bronz pages, wired to `data-*` hooks in server-rendered markup. Every hook is
 * optional, so a page opts in by marking elements:
 *
 * - `data-nav`: backdrop scrubs in over the first 160px.
 * - `data-hero` (value `"pin"` pins it on desktop) with `data-hero-title`, `data-hero-sub`, `data-hero-photo`:
 *   masked word rise on load, then a scrubbed exit. The photo's entrance is CSS (`.hero-photo`).
 * - `data-split`: headings rise line by line in masks.
 * - `data-scrub-words`: words light up as the paragraph scrolls past.
 * - `data-curtain` (`"rise"` | `"side"`) with `data-curtain-img`: clip-path opening plus a scrubbed drift.
 * - `data-row`: batched slide-in.
 * - `data-stagger`: its direct children rise in on a stagger.
 * - `data-phone`: digits roll in.
 *
 * The server paints the final layout; this only adds motion. Initial states are set inside the context (except
 * the hero copy, which CSS holds hidden with a safety keyframe), and reduced motion gets nothing.
 */
export function BronzChoreo({ className, children }: { className?: string; children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      let cancelled = false;

      // Line splits must measure the real fonts, so the build waits for them.
      const build = contextSafe!(() => {
        if (cancelled) return;
        mm.add(
          { desktop: "(min-width: 768px)", motion: "(prefers-reduced-motion: no-preference)" },
          (ctx) => {
            const { desktop, motion } = ctx.conditions as { desktop: boolean; motion: boolean };
            if (!motion) return;

            const nav = q("[data-nav]")[0];
            if (nav) gsap.fromTo(nav, { "--nav": 0 }, { "--nav": 1, ease: "none", scrollTrigger: { start: 0, end: 160, scrub: true } });

            /* ---- Hero ---- */
            const hero = q("[data-hero]")[0];
            if (hero) {
              const title = hero.querySelector<HTMLElement>("[data-hero-title]");
              const sub = hero.querySelector<HTMLElement>("[data-hero-sub]");
              const photo = hero.querySelector<HTMLElement>("[data-hero-photo]");
              const split = title ? SplitText.create(title, { type: "lines,words", mask: "lines", linesClass: "hero-line" }) : null;

              if (split) gsap.from(split.words, { yPercent: 115, rotate: 4, duration: 1.4, ease: "expo.out", stagger: 0.06, delay: 0.15 });
              if (sub) gsap.from(sub.children, { autoAlpha: 0, y: 24, duration: 1.2, ease: "expo.out", stagger: 0.12, delay: 0.6 });
              // CSS held these hidden until now; the tweens above already hold them at their start.
              gsap.set([title, sub].filter(Boolean), { visibility: "visible" });

              const pin = desktop && hero.dataset.hero === "pin";
              const exit = gsap.timeline({
                defaults: { ease: "none" },
                scrollTrigger: { trigger: hero, start: "top top", end: pin ? "+=100%" : "bottom top", pin, scrub: 1 },
              });
              if (sub) exit.to(sub, { autoAlpha: 0, y: -40, duration: 0.35 }, 0);
              if (photo?.firstElementChild) exit.fromTo(photo.firstElementChild, { scale: 1 }, { scale: 1.08, duration: 1 }, 0);
              split?.lines.forEach((line, i, all) => {
                // Lines drift apart: the first rises, the last sinks, middle ones slide sideways.
                const last = i === all.length - 1;
                const vars = i === 0 && all.length > 1 ? { yPercent: -70, xPercent: -6 } : last ? { yPercent: 70, xPercent: 4 } : { xPercent: 18 };
                exit.to(line, { ...vars, autoAlpha: 0, duration: 0.8 }, 0.15 + i * 0.05);
              });
            }

            /* ---- Words that light up as you read ---- */
            q("[data-scrub-words]").forEach((el) => {
              const words = SplitText.create(el, { type: "words" });
              gsap.fromTo(
                words.words,
                { opacity: 0.16 },
                { opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true } },
              );
            });

            /* ---- Curtains ---- */
            q("[data-curtain]").forEach((frame) => {
              const img = frame.querySelector("[data-curtain-img]");
              const from = frame.dataset.curtain === "side" ? "inset(0% 100% 0% 0%)" : "inset(100% 0% 0% 0%)";
              gsap.fromTo(
                frame,
                { clipPath: from },
                { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut", scrollTrigger: { trigger: frame, start: "top 82%", once: true } },
              );
              if (img) {
                gsap.fromTo(
                  img,
                  { yPercent: -6, scale: 1.18 },
                  { yPercent: 6, scale: 1.06, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true } },
                );
              }
            });

            /* ---- Headings ---- */
            q("[data-split]").forEach((heading) => {
              const s = SplitText.create(heading, { type: "lines", mask: "lines" });
              gsap.from(s.lines, {
                yPercent: 105,
                duration: 1.2,
                ease: "expo.out",
                stagger: 0.1,
                scrollTrigger: { trigger: heading, start: "top 88%", once: true },
              });
            });

            /* ---- Rows ---- */
            const rows = q("[data-row]");
            if (rows.length) {
              gsap.set(rows, { autoAlpha: 0, y: 26 });
              ScrollTrigger.batch(rows, {
                start: "top 94%",
                once: true,
                onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.06, overwrite: true }),
              });
            }

            /* ---- Staggered groups ---- */
            q("[data-stagger]").forEach((group) => {
              gsap.from(group.children, {
                autoAlpha: 0,
                y: 50,
                duration: 1.1,
                ease: "expo.out",
                stagger: 0.12,
                scrollTrigger: { trigger: group, start: "top 85%", once: true },
              });
            });

            /* ---- Phone digits ---- */
            q("[data-phone]").forEach((phone) => {
              const chars = SplitText.create(phone, { type: "chars", mask: "chars" });
              gsap.from(chars.chars, {
                yPercent: 100,
                duration: 0.9,
                ease: "expo.out",
                stagger: 0.03,
                scrollTrigger: { trigger: phone, start: "top 92%", once: true },
              });
            });
          },
        );

        // Images can shift trigger positions after they load.
        if (document.readyState === "complete") ScrollTrigger.refresh();
        else window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
      });

      document.fonts.ready.then(build);

      return () => {
        cancelled = true;
        mm.revert();
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
