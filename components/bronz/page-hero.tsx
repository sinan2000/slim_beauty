import Image, { type StaticImageData } from "next/image";
import { GoldLight } from "./gold-light";

/**
 * Full-height photographic hero. The photo eases in with CSS (`.hero-photo`); the title and the content under it
 * are the choreography's `data-hero-title` / `data-hero-sub`, held hidden by CSS until GSAP brings them in.
 */
export function PageHero({
  photo,
  alt,
  position = "50% 40%",
  top,
  title,
  children,
  pin = false,
  goldLight = false,
}: {
  photo: StaticImageData;
  alt: string;
  position?: string;
  /** Sits above the title and is never hidden (breadcrumbs). */
  top?: React.ReactNode;
  /** The h1. */
  title: React.ReactNode;
  /** Lead, facts and calls to action; each direct child enters on its own beat. */
  children?: React.ReactNode;
  pin?: boolean;
  goldLight?: boolean;
}) {
  return (
    <section data-hero={pin ? "pin" : ""} className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <div data-hero-photo className="hero-photo absolute inset-0 -z-20 overflow-hidden">
        <Image src={photo} alt={alt} fill priority placeholder="blur" sizes="100vw" className="object-cover" style={{ objectPosition: position }} />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(21,16,12,.94)_0%,rgba(21,16,12,.62)_45%,rgba(21,16,12,.12)_80%),linear-gradient(0deg,rgba(21,16,12,1)_0%,rgba(21,16,12,0)_45%),linear-gradient(180deg,rgba(21,16,12,.7)_0%,rgba(21,16,12,0)_22%)]" />
      {goldLight ? <GoldLight className="pointer-events-none absolute inset-0 -z-10 h-full w-full mix-blend-screen" /> : null}

      <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-5 pt-24 pb-24 md:px-10 md:pt-32 md:pb-20">
        {top ? <div className="relative z-10">{top}</div> : null}
        <div className="mt-auto pt-16">
          {title}
          {children ? (
            <div data-hero-sub className="mt-8 flex max-w-2xl flex-col gap-8">
              {children}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
