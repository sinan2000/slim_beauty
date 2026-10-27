import Cookies from "js-cookie";

export type ConsentChoice = "granted" | "denied";

export const CONSENT_COOKIE = "sb_consent";
const CONSENT_DAYS = 180;

/** Fired on window after the visitor accepts or rejects analytics cookies. */
export const CONSENT_CHANGE_EVENT = "sb:consent-change";
/** Fired on window to reopen the banner (footer and cookie policy "Setări cookie"). */
export const OPEN_CONSENT_EVENT = "sb:open-consent";

/** Cookies Google Analytics sets once allowed; removed again if consent is withdrawn. */
const ANALYTICS_COOKIE_PREFIXES = ["_ga", "_gid", "_gat", "_gcl"];

export function readConsent(): ConsentChoice | null {
  const value = Cookies.get(CONSENT_COOKIE);
  return value === "granted" || value === "denied" ? value : null;
}

export function saveConsent(choice: ConsentChoice) {
  const previous = readConsent();

  Cookies.set(CONSENT_COOKIE, choice, { expires: CONSENT_DAYS, sameSite: "Lax", secure: true });

  if (previous === "granted" && choice === "denied") {
    clearAnalyticsCookies();
    // GTM is already running in this tab; a reload is the only way to unload it.
    // GA can rewrite its cookies while the page unloads, so CookieConsent clears them again on the next load.
    window.location.reload();
    return;
  }

  window.dispatchEvent(new CustomEvent<ConsentChoice>(CONSENT_CHANGE_EVENT, { detail: choice }));
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}

export function clearAnalyticsCookies() {
  const host = window.location.hostname;
  // GA writes to the registrable domain (".slimandbeauty.ro"), so try it and the bare host.
  const domains = [undefined, host, `.${host.replace(/^www\./, "")}`];

  for (const name of Object.keys(Cookies.get())) {
    if (!ANALYTICS_COOKIE_PREFIXES.some((prefix) => name.startsWith(prefix))) continue;

    for (const domain of domains) {
      Cookies.remove(name, { path: "/", domain });
    }
  }
}
