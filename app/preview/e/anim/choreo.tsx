"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/**
 * The whole GSAP choreography for variant E, wired to `data-*` hooks in the static markup. Everything renders
 * visible and stacked without JS; initial states are only ever set here, inside the context, and the context
 * reverts them (and every SplitText, pin and ScrollTrigger) on unmount. Reduced motion gets nothing.
 *
 * ScrollTriggers are created top to bottom so refresh order matches page order (pin spacing depends on it).
 */
export function Choreo({ className, children }: { className?: string; children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      let cancelled = false;

      // Line splits must measure the real fonts, so everything is built once they're ready.
      const build = contextSafe!(() => {
        if (cancelled) return;
        mm.add(
          {
            desktop: "(min-width: 768px)",
            motion: "(prefers-reduced-motion: no-preference)",
          },
          (ctx) => {
            const { desktop, motion } = ctx.conditions as { desktop: boolean; motion: boolean };
            if (!motion) return;

            /* ---- Nav: backdrop scrubs in over the first 160px ---- */
            const nav = q("[data-nav]")[0];
            gsap.fromTo(nav, { "--nav": 0 }, { "--nav": 1, ease: "none", scrollTrigger: { start: 0, end: 160, scrub: true } });

            /* ---- Hero: masked word rise on load, then a pinned, scrubbed exit ---- */
            const hero = q("[data-hero]")[0];
            const title = q("[data-hero-title]")[0];
            const split = SplitText.create(title, { type: "lines,words", mask: "lines", linesClass: "hero-line" });
            gsap.from(split.words, { yPercent: 115, rotate: 4, duration: 1.4, ease: "expo.out", stagger: 0.06, delay: 0.15 });
            gsap.from(q("[data-hero-sub] > *"), { autoAlpha: 0, y: 24, duration: 1.2, ease: "expo.out", stagger: 0.12, delay: 0.7 });
            // CSS keeps these hidden until now (see page.tsx); the entrance tweens above already hold them at their start.
            gsap.set([title, q("[data-hero-sub]")[0]], { visibility: "visible" });
            // The photo's entrance is a CSS keyframe (.hero-photo in page.tsx) so it starts before fonts.ready.

            const exit = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: desktop ? "+=100%" : "+=60%",
                pin: desktop,
                scrub: 1,
              },
            });
            // Lines drift apart: first up and left, middle sideways, last down. The subtitle and CTAs leave first.
            exit
              .to(q("[data-hero-sub]"), { autoAlpha: 0, y: -40, duration: 0.35 }, 0)
              .fromTo(q("[data-hero-photo] > *"), { scale: 1 }, { scale: 1.08, duration: 1 }, 0)
              .to(split.lines[0] ?? [], { yPercent: -70, xPercent: -6, autoAlpha: 0, duration: 0.8 }, 0.15)
              .to(split.lines[1] ?? [], { xPercent: 18, autoAlpha: 0, duration: 0.8 }, 0.2)
              .to(split.lines.slice(2), { yPercent: 70, xPercent: 4, autoAlpha: 0, duration: 0.8 }, 0.25);

            /* ---- Statement: words light up one by one as you read down ---- */
            const statement = q("[data-scrub-words]")[0];
            const words = SplitText.create(statement, { type: "words" });
            gsap.fromTo(
              words.words,
              { opacity: 0.16 },
              { opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: { trigger: statement, start: "top 80%", end: "bottom 45%", scrub: true } },
            );

            /* ---- Curtains: two different openings, each with a scrubbed drift inside ---- */
            q("[data-curtain]").forEach((frame) => {
              const img = frame.querySelector("[data-curtain-img]");
              const from = frame.dataset.curtain === "side" ? "inset(0% 100% 0% 0%)" : "inset(100% 0% 0% 0%)";
              gsap.fromTo(
                frame,
                { clipPath: from },
                { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut", scrollTrigger: { trigger: frame, start: "top 78%", once: true } },
              );
              gsap.fromTo(
                img,
                { yPercent: -7, scale: 1.2 },
                { yPercent: 7, scale: 1.06, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true } },
              );
            });

            /* ---- Featured: pinned horizontal run on desktop, a softer stacked reveal on phones ---- */
            const feat = q("[data-feat]")[0];
            const track = q("[data-feat-track]")[0];
            const panels = q("[data-panel]");

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
              run.to(track, { x: () => -distance(), duration: 1 }, 0).fromTo(q("[data-feat-progress]"), { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0);

              panels.forEach((panel) => {
                const photo = panel.querySelector("[data-panel-photo]");
                const titleSplit = SplitText.create(panel.querySelector("[data-panel-title]"), { type: "lines", mask: "lines" });
                gsap.fromTo(
                  photo,
                  { xPercent: 7 },
                  { xPercent: -7, ease: "none", scrollTrigger: { containerAnimation: run, trigger: panel, start: "left right", end: "right left", scrub: true } },
                );
                // Scrubbed to the horizontal travel rather than toggled: a toggle is only checked on scroll events, so with
                // scrub lag the last panel could stop short of its start and keep its text hidden once scrolling stops.
                const reveal = gsap.timeline({
                  defaults: { ease: "power2.out" },
                  scrollTrigger: { containerAnimation: run, trigger: panel, start: "left 95%", end: "left 35%", scrub: true },
                });
                reveal
                  .from(titleSplit.lines, { yPercent: 110, duration: 1, stagger: 0.12 })
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

            /* ---- Section headings: masked line rise (the hero and panel titles have their own) ---- */
            q("[data-split]").forEach((heading) => {
              const s = SplitText.create(heading, { type: "lines", mask: "lines" });
              gsap.from(s.lines, {
                yPercent: 105,
                duration: 1.2,
                ease: "expo.out",
                stagger: 0.1,
                scrollTrigger: { trigger: heading, start: "top 85%", once: true },
              });
            });

            /* ---- Price rows: batched slide-in as they arrive ---- */
            const rows = q("[data-row]");
            gsap.set(rows, { autoAlpha: 0, y: 26 });
            ScrollTrigger.batch(rows, {
              start: "top 92%",
              once: true,
              onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.06, overwrite: true }),
            });

            /* ---- Reviews: quotes rise in on a stagger; the phone number counts its digits in ---- */
            gsap.from(q("[data-review]"), {
              autoAlpha: 0,
              y: 60,
              duration: 1.2,
              ease: "expo.out",
              stagger: 0.15,
              scrollTrigger: { trigger: q("[data-reviews]")[0], start: "top 80%", once: true },
            });
            const phone = q("[data-phone]")[0];
            const chars = SplitText.create(phone, { type: "chars", mask: "chars" });
            gsap.from(chars.chars, {
              yPercent: 100,
              duration: 0.9,
              ease: "expo.out",
              stagger: 0.03,
              scrollTrigger: { trigger: phone, start: "top 88%", once: true },
            });

          },
        );

        // Images without fixed dimensions can shift trigger positions after load.
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
