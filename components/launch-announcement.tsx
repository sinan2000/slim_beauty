"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
// The laser photo cropped clear of the promo graphic's logo inset and printed text.
import laserPhoto from "@/assets/services/laser/hero.jpg";
import { CONSENT_CHANGE_EVENT, readConsent } from "@/lib/consent";

const SERVICE_HREF = "/servicii/dermato-cosmetica/epilare-definitiva-cu-laser-dioda";

/** Bump the key to show a future announcement to visitors who already closed this one. */
const SEEN_KEY = "announcement:laser-dioda-2026-10";
const OPEN_DELAY_MS = 1500;

const highlights = [
  "Reducere progresivă și de lungă durată a pilozității",
  "Ședințe personalizate după piele, fir și zona tratată",
  "Sistem de răcire pentru confortul pielii",
];

/*
  Storage can be blocked (private mode, cleared site data). The module flag keeps
  the dialog from reopening on every client-side navigation in that case.
*/
let shownThisVisit = false;

function hasSeen() {
  try {
    return localStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    localStorage.setItem(SEEN_KEY, "1");
  } catch {
    // Nothing to persist to; the module flag still covers this visit.
  }
}

/**
 * One-time launch announcement for the laser diode service. Native <dialog> gives
 * focus trapping, Escape-to-close and an inert page behind it without a dependency.
 */
export function LaunchAnnouncement() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (shownThisVisit || pathname === SERVICE_HREF || hasSeen()) {
      return;
    }

    let timer: number | undefined;
    const schedule = () => {
      timer = window.setTimeout(() => {
        shownThisVisit = true;
        dialogRef.current?.showModal();
        // Start on the title rather than the close button, which would otherwise open with a focus ring.
        titleRef.current?.focus();
      }, OPEN_DELAY_MS);
    };

    // A modal dialog makes the cookie banner inert, so wait until the visitor has answered it.
    if (readConsent()) {
      schedule();
    } else {
      window.addEventListener(CONSENT_CHANGE_EVENT, schedule, { once: true });
    }

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(CONSENT_CHANGE_EVENT, schedule);
    };
  }, [pathname]);

  const close = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="announcement-title"
      aria-describedby="announcement-desc"
      onClose={markSeen}
      onClick={(e) => {
        // The content grid fills the dialog, so a click landing on the dialog itself is the backdrop.
        if (e.target === e.currentTarget) close();
      }}
      className="announcement m-auto w-[calc(100%-1.5rem)] max-w-[60rem] max-h-[calc(100dvh-1.5rem)] overflow-hidden rounded-2xl border border-(--gold)/25 bg-(--espresso) p-0 text-(--cream-dim) shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)] backdrop:bg-[#0b0806]/75 backdrop:backdrop-blur-[6px]"
    >
      <button
        type="button"
        onClick={close}
        aria-label="Închide"
        className="absolute top-3 right-3 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-(--cream)/25 bg-(--espresso)/60 text-(--cream) backdrop-blur-sm transition-colors hover:border-(--gold) hover:text-(--gold) md:top-5 md:right-5"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M1 1l12 12M13 1 1 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>

      <div className="grid max-h-[calc(100dvh-1.5rem)] overflow-y-auto md:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)]">
        <div className="grain relative h-56 overflow-hidden sm:h-72 md:h-auto md:min-h-[560px]">
          <Image
            src={laserPhoto}
            alt="Epilare cu laser diodă pe picior, cu aplicatorul răcit pe piele"
            fill
            placeholder="blur"
            sizes="(min-width: 768px) 460px, 100vw"
            className="announcement-photo object-cover object-[60%_45%] md:object-[64%_50%]"
          />
          {/* Melts the photo into the panel: down into it on phones, sideways into it from md. */}
          <div className="absolute inset-0 bg-[linear-gradient(0deg,var(--espresso)_0%,transparent_55%)] md:bg-[linear-gradient(270deg,var(--espresso)_0%,transparent_38%)]" />
          <span className="absolute bottom-4 left-5 rounded-full border border-(--gold)/70 bg-(--espresso)/60 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.2em] text-(--gold) backdrop-blur-sm md:top-6 md:bottom-auto md:left-6">
            NOU
          </span>
        </div>

        <div className="flex flex-col px-6 pt-4 pb-7 sm:px-9 md:px-10 md:pt-14 md:pb-10">
          <h2
            id="announcement-title"
            ref={titleRef}
            tabIndex={-1}
            className="f-display text-[2.4rem] leading-[1] font-normal tracking-[-0.02em] text-(--cream) outline-none md:text-[3.2rem]"
          >
            Epilare definitivă{" "}
            <span className="block italic text-(--gold)">cu laser diodă</span>
          </h2>

          <p id="announcement-desc" className="mt-5 max-w-[40ch] leading-relaxed">
            Piele fină, mai puține fire de păr și confort pe termen lung. Fiecare tratament începe cu o evaluare și parametri adaptați ție.
          </p>

          <ul className="mt-7 border-t border-(--line)">
            {highlights.map((item) => (
              <li key={item} className="flex items-baseline gap-4 border-b border-(--line) py-3 text-sm text-(--cream-dim)">
                <span className="h-px w-4 shrink-0 translate-y-[-0.3em] bg-(--gold)" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          <p className="f-display mt-7 text-xl text-(--cream)">
            Preț stabilit <span className="italic text-(--gold)">la evaluare</span>
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-4 md:mt-auto md:pt-8">
            <Link href={SERVICE_HREF} onClick={close} className="btn-gold h-12 whitespace-nowrap px-7 text-sm">
              Descoperă tratamentul
            </Link>
            <a href="tel:+40733407329" className="link-u inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium text-(--gold)">
              Programează evaluarea · <span className="num">0733 407 329</span>
            </a>
          </div>
        </div>
      </div>
    </dialog>
  );
}
