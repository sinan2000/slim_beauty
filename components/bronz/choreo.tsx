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
 * - `data-hero` (value `"pin"` pins it on desktop) with `data-hero-title`, `data-hero-sub`, `data-hero-photo`:
 *   masked word rise on load, then a scrubbed exit. The photo's entrance is CSS (`.hero-photo`).
 * - `data-split`: headings rise line by line in masks.
 * - `data-scrub-words`: words light up as the paragraph scrolls past.
 * - `data-curtain` (`"rise"` | `"side"`) with `data-curtain-img`: clip-path opening plus a scrubbed drift.
 * - `data-row`: batched slide-in.
 * - `data-stagger`: its direct children rise in on a stagger.
 * - `data-phone`: digits roll in.
 * - `data-feat` with `data-feat-track`, `data-panel` (+ `-photo`, `-title`, `-copy`, `-row`) and `data-feat-progress`:
 *   the homepage's pinned horizontal run.
 *
 * Each page renders its own choreography root, so client navigation mounts a fresh one and every trigger is rebuilt
 * for the new page. The nav backdrop lives outside it, in `NavBackdrop`.
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
              // aria "none": the default puts an aria-label on the <p>, which is not allowed on a paragraph.
              const words = SplitText.create(el, { type: "words", aria: "none" });
              gsap.fromTo(
                words.words,
                // 0.55 keeps the unread words, gold italics included, above 3:1 contrast on the espresso background.
                { opacity: 0.55 },
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

            /* ---- Featured run: pinned horizontal scrub with snapping on desktop, a softer stacked reveal on phones ---- */
            const feat = q("[data-feat]")[0];
            const track = feat?.querySelector<HTMLElement>("[data-feat-track]");
            if (feat && track) {
              const panels = gsap.utils.toArray<HTMLElement>(feat.querySelectorAll("[data-panel]"));
              if (desktop) {
                const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
                const run = gsap.timeline({
                  defaults: { ease: "none" },
                  scrollTrigger: {
                    trigger: feat,
                    start: "top top",
                    end: () => `+=${distance()}`,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    // Settle on whichever panel is closest, measured from where each one actually sits on the track.
                    snap: {
                      snapTo: (value) => {
                        const d = distance() || 1;
                        const points = [0, ...panels.map((p) => Math.min(1, (p.offsetLeft - 40) / d)), 1];
                        return gsap.utils.snap(points, value);
                      },
                      duration: { min: 0.3, max: 0.9 },
                      delay: 0.08,
                      ease: "power2.inOut",
                    },
                  },
                });
                run.to(track, { x: () => -distance(), duration: 1 }, 0);
                const progress = feat.querySelector("[data-feat-progress]");
                if (progress) run.fromTo(progress, { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0);

                panels.forEach((panel) => {
                  const photo = panel.querySelector("[data-panel-photo]");
                  const title = panel.querySelector("[data-panel-title]");
                  if (photo) {
                    gsap.fromTo(
                      photo,
                      { xPercent: 7 },
                      { xPercent: -7, ease: "none", scrollTrigger: { containerAnimation: run, trigger: panel, start: "left right", end: "right left", scrub: true } },
                    );
                  }
                  // Scrubbed to the horizontal travel rather than toggled: a toggle is only checked on scroll events, so
                  // with scrub lag the last panel could stop short of its start and keep its text hidden.
                  const reveal = gsap.timeline({
                    defaults: { ease: "power2.out" },
                    scrollTrigger: { containerAnimation: run, trigger: panel, start: "left 95%", end: "left 35%", scrub: true },
                  });
                  if (title) reveal.from(SplitText.create(title, { type: "lines", mask: "lines" }).lines, { yPercent: 110, duration: 1, stagger: 0.12 });
                  reveal
                    .from(panel.querySelectorAll("[data-panel-copy]"), { autoAlpha: 0, y: 24, duration: 0.8, stagger: 0.1 }, 0.2)
                    .from(panel.querySelectorAll("[data-panel-row]"), { autoAlpha: 0, x: 40, duration: 0.7, stagger: 0.1 }, 0.35);
                });
              } else {
                panels.forEach((panel) => {
                  gsap.from(panel.querySelectorAll("[data-panel-row]"), {
                    autoAlpha: 0,
                    x: 24,
                    duration: 0.7,
                    ease: "expo.out",
                    stagger: 0.07,
                    scrollTrigger: { trigger: panel, start: "60% 85%", once: true },
                  });
                });
              }
            }

            /* ---- Headings ---- */
            q("[data-split]").forEach((heading) => {
              // A paragraph can't carry the aria-label SplitText adds by default; headings can.
              const s = SplitText.create(heading, { type: "lines", mask: "lines", aria: heading.tagName === "P" ? "none" : "auto" });
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

        // Triggers are created by kind, not page order; pins only offset the triggers refreshed after them.
        ScrollTrigger.sort();
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
