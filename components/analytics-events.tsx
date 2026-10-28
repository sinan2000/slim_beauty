"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/** Contact links by where they lead. Contact is the conversion on this site, so these are the GA4 key events. */
function classify(href: string): { event: AnalyticsEvent; network?: string } | null {
  if (href.startsWith("tel:")) return { event: "phone_click" };
  if (/(?:api\.whatsapp\.com|wa\.me)\//.test(href)) return { event: "whatsapp_click" };
  if (/(?:google\.[a-z.]+\/maps|maps\.app\.goo\.gl|goo\.gl\/maps)/.test(href)) return { event: "directions_click" };
  // Only the salon's own profiles: review links point at reviewers' Facebook posts and aren't a contact.
  const social = href.match(/(instagram)\.com\/slimandbeautybymc|(facebook)\.com\/SalonSlimBeautyByMC|(tiktok)\.com\/@slimandbeautymc/i);
  if (social) return { event: "social_dm_click", network: (social[1] ?? social[2] ?? social[3]).toLowerCase() };
  return null;
}

/** Where on the page a link sits: an explicit data-cta wins, then the page region it belongs to. */
function locationOf(el: Element): string {
  const explicit = el.closest<HTMLElement>("[data-cta]");
  if (explicit?.dataset.cta) return explicit.dataset.cta;
  if (el.closest("dialog")) return "popup";
  if (el.closest("[popover]")) return "mobile_menu";
  if (el.closest("header")) return "nav";
  if (el.closest("footer")) return "footer";
  if (el.closest("[data-hero]")) return "hero";
  if (el.closest("[data-feat]")) return "featured";
  if (el.closest("#contact")) return "contact";
  if (el.closest("#preturi")) return "prices";
  return el.closest("section")?.getAttribute("aria-labelledby") ?? "page";
}

/** The treatment a link is about: its own panel first, then the treatment page it's on. */
function serviceOf(el: Element): string | undefined {
  return (
    el.closest<HTMLElement>("[data-service]")?.dataset.service ??
    document.querySelector<HTMLElement>("[data-service-page]")?.dataset.servicePage ??
    undefined
  );
}

/**
 * One delegated listener for the whole site, so every contact link (present or added later) is tracked by where it
 * leads rather than by hand-wired handlers. Mounted once in the root layout.
 */
export function AnalyticsEvents() {
  const pathname = usePathname();

  // Re-armed on every route change, so the once-per-page slider event counts per page view.
  useEffect(() => {
    let sliderUsed = false;

    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const kind = classify(href);
      if (!kind) return;
      track(kind.event, {
        cta_location: locationOf(link),
        service_name: serviceOf(link),
        network: kind.network,
        link_url: kind.event === "phone_click" ? undefined : href.split("?")[0],
      });
    };

    // <details> fires a non-bubbling "toggle"; a capturing listener on document still sees it.
    const onToggle = (e: Event) => {
      const details = e.target;
      if (!(details instanceof HTMLDetailsElement) || !details.open || !details.classList.contains("faq")) return;
      const question = details.querySelector("summary")?.textContent?.trim();
      track("faq_open", { faq_question: question, service_name: serviceOf(details) });
    };

    // Once per page view is enough to know the before/after proof was looked at.
    const onInput = (e: Event) => {
      if (sliderUsed || !(e.target instanceof HTMLInputElement) || e.target.type !== "range") return;
      sliderUsed = true;
      track("before_after_used", { cta_location: locationOf(e.target) });
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("toggle", onToggle, true);
    document.addEventListener("input", onInput, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("toggle", onToggle, true);
      document.removeEventListener("input", onInput, true);
    };
  }, [pathname]);

  return null;
}
