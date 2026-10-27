"use client";

import { Component, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "motion/react";
import { Phone } from "lucide-react";
import { contact } from "../_shared/content";

const SculptCanvas = dynamic(() => import("./sculpt-canvas").then((m) => m.SculptCanvas), {
  ssr: false,
  loading: () => null,
});

let webglCache: boolean | undefined;
function detectWebGL() {
  if (webglCache === undefined) {
    try {
      const c = document.createElement("canvas");
      webglCache = Boolean(c.getContext("webgl2") ?? c.getContext("webgl"));
    } catch {
      webglCache = false;
    }
  }
  return webglCache;
}
const noop = () => () => {};

const reducedQuery = "(prefers-reduced-motion: reduce)";
function subscribeReduced(onChange: () => void) {
  const mq = window.matchMedia(reducedQuery);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
const getReduced = () => window.matchMedia(reducedQuery).matches;

/** Static stand-in for the 3D form: before load, under reduced motion, and without WebGL. */
function SculptFallback({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      aria-hidden="true"
      style={{ opacity: hidden ? 0 : 1, transition: "opacity 900ms cubic-bezier(.16,1,.3,1)" }}
      className="pointer-events-none absolute inset-0 flex items-start justify-center pt-[9svh] md:items-center md:justify-end md:pt-0 md:pr-[12vw]"
    >
      <div
        className="aspect-[4/5] w-[56vw] max-w-[26rem] md:w-[30vw]"
        style={{
          borderRadius: "48% 52% 44% 56% / 56% 44% 56% 44%",
          background:
            "radial-gradient(120% 90% at 32% 24%, #fffaf8 0%, #f8dfe0 22%, #eab3bb 52%, #b8667d 82%, #7d3150 100%)",
          boxShadow: "0 60px 90px -40px rgba(90, 24, 52, 0.45)",
        }}
      />
    </div>
  );
}

class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <SculptFallback /> : this.props.children;
  }
}

export function SculptHero() {
  const section = useRef<HTMLElement>(null);
  // Server snapshot keeps hydration stable; the real preference applies right after.
  // The static form stays until the 3D one has drawn its first frame, then fades out underneath it.
  const [ready, setReady] = useState(false);
  const reduced = useSyncExternalStore(subscribeReduced, getReduced, () => false);
  const webgl = useSyncExternalStore(noop, detectWebGL, () => false);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });

  const firstOpacity = useTransform(scrollYProgress, [0, 0.38], [1, 0]);
  const firstBlur = useTransform(scrollYProgress, [0, 0.38], ["blur(0px)", "blur(10px)"]);
  const firstY = useTransform(scrollYProgress, [0, 0.38], [0, -40]);
  const secondOpacity = useTransform(scrollYProgress, [0.5, 0.82], [0, 1]);
  const secondBlur = useTransform(scrollYProgress, [0.5, 0.82], ["blur(10px)", "blur(0px)"]);
  const secondY = useTransform(scrollYProgress, [0.5, 0.82], [40, 0]);
  const cue = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  const animated = !reduced;

  return (
    <section ref={section} className={animated ? "relative h-[210svh]" : "relative h-svh"} aria-labelledby="b-hero-title">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(70%_60%_at_70%_45%,#fbe6e6_0%,transparent_70%)]" />
        {animated && webgl ? (
          <>
            <SculptFallback hidden={ready} />
            <CanvasBoundary>
              <div
                className="absolute inset-0 md:left-auto md:w-[56%]"
                style={{ opacity: ready ? 1 : 0, transition: "opacity 900ms cubic-bezier(.16,1,.3,1)" }}
              >
                <SculptCanvas progress={scrollYProgress} onReady={() => setReady(true)} />
              </div>
            </CanvasBoundary>
          </>
        ) : (
          <SculptFallback />
        )}

        <div className="relative mx-auto flex h-full max-w-[88rem] items-end px-5 pb-28 md:items-center md:px-10 md:pb-0">
          <motion.div
            style={animated ? { opacity: firstOpacity, filter: firstBlur, y: firstY } : undefined}
            className="max-w-[40rem]"
          >
            <h1 id="b-hero-title" className="b-display text-[clamp(2.9rem,7.4vw,6rem)] leading-[0.95] tracking-[-0.025em] b-ink text-balance">
              Remodelare corporală, <em className="b-accent">sculptată</em> fără bisturiu.
            </h1>
            <p className="mt-6 max-w-[34rem] text-[1.0625rem] leading-relaxed b-ink-soft md:text-lg">
              Tratamente non-invazive pentru celulită, grăsime localizată și tonifiere, în salonul nostru din Dumbrăvița, la câțiva pași de Timișoara.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={contact.phoneHref} className="b-btn b-btn-primary">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Sună: {contact.phone}
              </a>
              <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="b-btn b-btn-ghost">
                Scrie pe WhatsApp
              </a>
            </div>
          </motion.div>

          {animated && (
            <motion.div
              style={{ opacity: secondOpacity, filter: secondBlur, y: secondY }}
              className="pointer-events-none absolute inset-x-5 bottom-28 md:inset-x-auto md:bottom-auto md:left-10 md:max-w-[38rem]"
              aria-hidden="true"
            >
              <p className="b-display text-[clamp(2.9rem,7.4vw,6rem)] leading-[0.95] tracking-[-0.025em] b-ink">
                Netedă. Fermă.
                <br />
                <em className="b-accent">Remodelată.</em>
              </p>
              <p className="mt-6 max-w-[30rem] text-lg leading-relaxed b-ink-soft">
                Non-invaziv, nedureros și fără timp de recuperare. Revii imediat la activitățile tale.
              </p>
            </motion.div>
          )}
        </div>

        {animated && (
          <motion.div style={{ opacity: cue }} aria-hidden="true" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block">
            <span className="block h-12 w-px overflow-hidden bg-[#34101f]/15">
              <span className="b-cue block h-1/2 w-px bg-[#34101f]/60" />
            </span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
