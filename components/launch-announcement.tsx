"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, Phone, X } from "lucide-react";
import laserPhoto from "@/assets/services/laser/announce.jpg";

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

    const timer = window.setTimeout(() => {
      shownThisVisit = true;
      dialogRef.current?.showModal();
      // Start on the title rather than the close button, which would otherwise open with a focus ring.
      titleRef.current?.focus();
    }, OPEN_DELAY_MS);

    return () => window.clearTimeout(timer);
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
      className="announcement m-auto w-[calc(100%-2rem)] max-w-3xl max-h-[calc(100dvh-2rem)] overflow-hidden rounded-2xl bg-white p-0 text-gray-600 shadow-xl backdrop:bg-pink-900/40 backdrop:backdrop-blur-sm"
    >
      <button
        type="button"
        onClick={close}
        aria-label="Închide"
        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 transition-colors hover:bg-white hover:text-pink-600"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>

      <div className="grid max-h-[calc(100dvh-2rem)] overflow-y-auto md:grid-cols-[5fr_6fr]">
        <div className="relative h-52 sm:h-64 md:h-auto md:min-h-[500px]">
          <Image
            src={laserPhoto}
            alt="Epilare cu laser diodă profesional IRMEDICAL la Slim & Beauty by MC"
            fill
            placeholder="blur"
            sizes="(max-width: 768px) 100vw, 350px"
            className="object-cover object-[50%_62%] md:object-center"
          />
          <div className="absolute inset-0 bg-linear-to-t from-pink-900/50 via-transparent to-transparent" />
          <span className="absolute bottom-4 left-4 rounded-full bg-pink-600 px-3 py-1 text-xs font-semibold tracking-[0.15em] text-white">
            NOU
          </span>
        </div>

        <div className="flex flex-col p-6 sm:p-8 md:p-10">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-pink-600">
            Acum la Slim & Beauty by MC
          </p>

          <h2
            id="announcement-title"
            ref={titleRef}
            tabIndex={-1}
            className="font-playfair text-3xl font-bold leading-tight text-gray-800 outline-none md:text-4xl"
          >
            Epilare definitivă
            <span className="block font-normal italic text-pink-600">cu laser diodă</span>
          </h2>

          <p id="announcement-desc" className="mt-4 text-gray-600">
            Piele fină, mai puține fire de păr și confort pe termen lung. Fiecare tratament începe cu o evaluare și parametri adaptați ție.
          </p>

          <ul className="mt-6 space-y-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pink-50 text-pink-600">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 md:mt-auto md:pt-8">
            <Link
              href={SERVICE_HREF}
              onClick={close}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-pink-600 px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-pink-700"
            >
              Descoperă tratamentul
            </Link>
            <a
              href="tel:+40733407329"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium text-pink-600 transition-colors hover:text-pink-700"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Programează evaluarea
            </a>
          </div>
        </div>
      </div>
    </dialog>
  );
}
