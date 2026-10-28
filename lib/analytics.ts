import { readConsent } from "@/lib/consent";

/** Every event the site sends; the GTM import in docs/analytics/ listens for exactly these names. */
export type AnalyticsEvent =
  | "phone_click"
  | "whatsapp_click"
  | "social_dm_click"
  | "directions_click"
  | "announcement_shown"
  | "announcement_click"
  | "announcement_dismiss"
  | "faq_open"
  | "before_after_used";

export type AnalyticsParams = {
  cta_location?: string;
  service_name?: string;
  network?: string;
  link_url?: string;
  faq_question?: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/**
 * Pushes an event for GTM to forward to GA4. Without analytics consent nothing is pushed at all: GTM only loads
 * after consent, and a queued push would otherwise be replayed (and sent) the moment the visitor accepts.
 */
export function track(event: AnalyticsEvent, params: AnalyticsParams = {}) {
  if (typeof window === "undefined" || readConsent() !== "granted") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
}
