import Link from "next/link";
import Image from "next/image";
import { Phone, MessageCircle } from "lucide-react";
import anpcSal from "@/assets/anpc-sal.png";
import { SnsCredit } from "@/components/sns/sns-credit";
import { CookieSettingsButton } from "@/components/cookie-consent";
import { company } from "@/lib/company";
import { contact, allServices } from "../../_shared/content";

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`ed-display leading-none ${className}`}>
      Slim <span className="italic text-[var(--accent)]">&amp;</span> Beauty
      <span className="ml-1.5 align-top font-sans text-[0.42em] font-medium tracking-normal">by MC</span>
    </span>
  );
}

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[var(--rule)] bg-[var(--paper)]">
      <nav className="flex h-16 items-center justify-between gap-4 px-4 md:px-8 lg:px-12" aria-label="Principal">
        <Link href="/preview/c" className="text-2xl" aria-label="Slim & Beauty by MC, acasă">
          <Wordmark />
        </Link>
        <div className="flex items-center gap-1 md:gap-6">
          <Link href="/servicii" className="hidden px-2 py-2 text-[15px] hover:text-[var(--accent)] md:inline">
            Servicii
          </Link>
          <a href="#preturi" className="hidden px-2 py-2 text-[15px] hover:text-[var(--accent)] md:inline">
            Prețuri
          </a>
          <a href="#contact" className="hidden px-2 py-2 text-[15px] hover:text-[var(--accent)] md:inline">
            Contact
          </a>
          <a
            href={contact.phoneHref}
            className="ed-num inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-deep)]"
          >
            <Phone className="size-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">{contact.phone}</span>
            <span className="sm:hidden">Sună</span>
          </a>
        </div>
      </nav>
    </header>
  );
}

function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" fill="currentColor" />
    </svg>
  );
}

export function Marquee() {
  const names = allServices.map((s) => s.title);
  const run = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {names.map((name) => (
        <span key={name} className="flex items-center">
          <span className="ed-display whitespace-nowrap px-6 text-[clamp(1.75rem,4vw,3.25rem)] italic md:px-10">{name}</span>
          <Star className="size-4 shrink-0 md:size-5" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="ed-marquee overflow-hidden border-y border-[var(--ink)] bg-[var(--accent)] py-4 text-white md:py-6">
      <p className="sr-only">Tratamente: {names.join(", ")}.</p>
      <div className="ed-marquee-track flex w-max" aria-hidden="true">
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}

export function MobileContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-px border-t border-[var(--ink)] bg-[var(--ink)] md:hidden">
      <a href={contact.phoneHref} className="flex items-center justify-center gap-2 bg-[var(--paper)] py-4 font-medium">
        <Phone className="size-4" aria-hidden="true" />
        Sună
      </a>
      <a
        href={contact.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-[var(--accent)] py-4 font-medium text-white"
      >
        <MessageCircle className="size-4" aria-hidden="true" />
        WhatsApp
      </a>
    </div>
  );
}

const legalLinks = [
  { href: "/politica-de-confidentialitate", label: "Politica de confidențialitate" },
  { href: "/termeni-si-conditii", label: "Termeni și condiții" },
  { href: "/politica-cookies", label: "Politica de cookies" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--ink)] px-4 pb-28 pt-16 text-[var(--paper)] md:px-8 md:pb-10 lg:px-12">
      <Wordmark className="block text-[clamp(3rem,13vw,12rem)]" />
      <div className="mt-12 grid gap-10 border-t border-white/20 pt-8 text-sm text-white/75 md:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <p className="text-white">{company.legalName}</p>
          <p>CUI {company.cui} · {company.regCom}</p>
          <p>{company.address}</p>
        </div>
        <ul className="flex flex-col gap-1.5">
          {legalLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-white hover:underline">
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <CookieSettingsButton className="hover:text-white hover:underline" />
          </li>
        </ul>
        <div className="flex flex-col items-start gap-4 md:items-end">
          <div className="flex gap-4">
            <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">
              Instagram
            </a>
            <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">
              Facebook
            </a>
            <a href={contact.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">
              TikTok
            </a>
          </div>
          <Link href="https://reclamatiisal.anpc.ro/" target="_blank" rel="nofollow">
            <Image src={anpcSal} alt="ANPC: Soluționarea alternativă a litigiilor" width={200} className="h-auto w-[200px]" />
          </Link>
        </div>
      </div>
      <div className="mt-10 flex justify-center border-t border-white/20 pt-6 text-sm text-white/75 md:justify-end">
        <SnsCredit lang="ro" site="slim-beauty" />
      </div>
    </footer>
  );
}
