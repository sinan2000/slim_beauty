"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Script from "next/script";
import {
  CONSENT_CHANGE_EVENT,
  OPEN_CONSENT_EVENT,
  clearAnalyticsCookies,
  openConsentSettings,
  readConsent,
  saveConsent,
  type ConsentChoice,
} from "@/lib/consent";

const GTM_ID = "GTM-5L3ZD3KW";

/**
 * Consent Mode v2 signals first, then the standard GTM loader, in one script so
 * the order is guaranteed. Only rendered after "Accept".
 */
const GTM_WITH_CONSENT = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied'});
gtag('consent', 'update', {analytics_storage: 'granted'});
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');
`;

function subscribe(onChange: () => void) {
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
}

/**
 * Cookie banner and the only place Google Tag Manager is loaded. Nothing
 * non-essential runs until the visitor presses "Accept"; "Refuz" sits next to it
 * with the same weight.
 */
export function CookieConsent() {
  // undefined on the server and during hydration: the banner is then rendered into the HTML, so it paints with the
  // page instead of after the JavaScript (it is the largest text on a phone, so this is the page's LCP for new
  // visitors). For visitors who already chose, CONSENT_PREPAINT hides it before paint and it unmounts once read.
  const choice = useSyncExternalStore<ConsentChoice | null | undefined>(subscribe, readConsent, () => undefined);
  const [reopened, setReopened] = useState(false);
  const open = choice === undefined || choice === null || reopened;

  useEffect(() => {
    if (choice === "denied") clearAnalyticsCookies();
  }, [choice]);

  useEffect(() => {
    const onOpen = () => setReopened(true);
    window.addEventListener(OPEN_CONSENT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, onOpen);
  }, []);

  const decide = (value: ConsentChoice) => {
    setReopened(false);
    saveConsent(value);
  };

  return (
    <>
      {choice === "granted" && (
        <Script id="gtm-consent" strategy="afterInteractive">
          {GTM_WITH_CONSENT}
        </Script>
      )}

      {open && (
        <section
          aria-label="Consimțământ cookie-uri"
          data-cookie-banner
          data-reopened={reopened ? "" : undefined}
          className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] md:px-4 md:pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))]"
        >
          <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-(--gold)/30 bg-(--espresso-2)/95 p-4 text-[13px] leading-snug text-(--cream-dim) shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur-md md:flex-row md:items-center md:gap-6 md:p-6 md:text-sm md:leading-relaxed">
            <p className="flex-1">
              Folosim cookie-uri de analiză (Google Analytics) doar cu acordul tău, ca să vedem cum este folosit
              site-ul.<span className="hidden md:inline"> Poți schimba oricând alegerea din „Setări cookie”, în subsolul paginii.</span> Detalii în{" "}
              <Link href="/politica-cookies" className="text-(--gold) underline underline-offset-4">
                Politica de cookies
              </Link>
              .
            </p>
            <div className="grid grid-cols-2 gap-3 md:w-64 md:shrink-0">
              <button
                type="button"
                onClick={() => decide("denied")}
                className="btn-ghost h-11 cursor-pointer px-5 text-sm"
              >
                Refuz
              </button>
              <button
                type="button"
                onClick={() => decide("granted")}
                className="btn-gold h-11 cursor-pointer px-5 text-sm"
              >
                Accept
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openConsentSettings} className={className}>
      Setări cookie
    </button>
  );
}
