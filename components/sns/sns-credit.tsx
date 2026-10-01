/**
 * The "Website by SNS Automation" credit for client sites.
 *
 * Self-contained on purpose: no imports, no Tailwind, no client JS. Copy this file as-is into a
 * client project (React 19 / Next) and render it inside the client's own footer. It takes the
 * footer's text colour and font, so it works on light and dark sites. For non-React stacks use
 * docs/sns-credit/sns-credit.html, which is the same markup and CSS.
 */

const BASE_URL = 'https://snsautomation.tech';
const ACCENT = '#4ef0b5';

const LABELS = {
  en: 'Website by',
  ro: 'Realizat de',
  nl: 'Gemaakt door',
  tr: 'Geliştiren',
  de: 'Website von',
  at: 'Website von',
  fr: 'Réalisé par',
  es: 'Desarrollado por',
  it: 'Realizzato da',
} as const;

export type SnsCreditLang = keyof typeof LABELS;

function isCreditLang(value: string | undefined): value is SnsCreditLang {
  return value !== undefined && Object.prototype.hasOwnProperty.call(LABELS, value);
}

export function creditLabel(lang: string | undefined): string {
  return LABELS[isCreditLang(lang) ? lang : 'en'];
}

/** Romanian visitors land on /ro, everyone else on the unprefixed English site. */
export function creditHref(lang: string | undefined, site?: string): string {
  const url = new URL(lang === 'ro' ? '/ro' : '/', BASE_URL);
  if (site) {
    url.searchParams.set('utm_source', site);
    url.searchParams.set('utm_medium', 'credit');
  }
  return url.toString();
}

// No ">", "&" or quotes in here: React escapes text inside <style>.
const CSS = `
.sns-credit{display:inline-flex;align-items:center;gap:.4em;min-height:44px;font-size:13px;line-height:1;color:inherit;text-decoration:none;white-space:nowrap}
.sns-credit__mark{width:16px;height:16px;flex:none;margin-left:.15em}
.sns-credit__name{font-weight:600;letter-spacing:-.01em}
.sns-credit__tag{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-weight:400;font-size:.92em;opacity:.75}
.sns-credit__arrow{width:12px;height:12px;flex:none;opacity:.6;transition:transform .2s,opacity .2s}
.sns-credit:hover .sns-credit__name{text-decoration:underline;text-underline-offset:3px}
.sns-credit:hover .sns-credit__arrow{opacity:1;transform:translate(1px,-1px)}
.sns-credit:focus-visible{outline:2px solid currentColor;outline-offset:4px;border-radius:2px}
@media (prefers-reduced-motion:reduce){.sns-credit__arrow{transition:none}}
`;

export function SnsCredit({
  lang,
  site,
  className,
}: {
  /** Label language; unknown values fall back to English. */
  lang?: string;
  /** Short client id, sent as utm_source so visits from each client show up in analytics. */
  site?: string;
  className?: string;
}) {
  return (
    <>
      <style>{CSS}</style>
      <a
        href={creditHref(lang, site)}
        target="_blank"
        rel="noopener"
        className={className ? `sns-credit ${className}` : 'sns-credit'}
      >
        <span>{creditLabel(lang)}</span>
        <svg className="sns-credit__mark" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
          <g fill="currentColor">
            <rect x="16" y="4" width="44" height="9" rx="4.5" />
            <rect x="4" y="16" width="9" height="9" rx="4.5" />
            <rect x="16" y="28" width="32" height="9" rx="4.5" />
            <rect x="52" y="40" width="9" height="9" rx="4.5" />
            <rect x="4" y="52" width="44" height="9" rx="4.5" />
          </g>
          <g fill={ACCENT}>
            <circle cx="56" cy="8" r="5.5" />
            <circle cx="8" cy="56" r="5.5" />
          </g>
        </svg>
        <span className="sns-credit__name">
          SNS <span className="sns-credit__tag">Automation</span>
        </span>
        <svg
          className="sns-credit__arrow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M7 17 17 7M7 7h10v10" />
        </svg>
      </a>
    </>
  );
}
