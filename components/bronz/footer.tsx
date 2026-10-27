import Image from "next/image";
import Link from "next/link";
import anpcSal from "@/assets/anpc-sal.png";
import { SnsCredit } from "@/components/sns/sns-credit";
import { CookieSettingsButton } from "@/components/cookie-consent";
import { company } from "@/lib/company";
import { contact } from "@/lib/site-content";

const legal = [
  { href: "/politica-de-confidentialitate", label: "Politica de confidențialitate" },
  { href: "/termeni-si-conditii", label: "Termeni și condiții" },
  { href: "/politica-cookies", label: "Politica de cookies" },
];

const socials = [
  { href: contact.facebook, label: "Facebook" },
  { href: contact.instagram, label: "Instagram" },
  { href: contact.tiktok, label: "TikTok" },
];

export function BronzFooter() {
  return (
    <footer className="border-t border-(--line) bg-[#100c09]">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10 px-5 py-14 md:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <p className="f-display text-[clamp(2.4rem,6vw,5rem)] leading-none text-(--cream)">
            Slim <span className="italic text-(--gold)">&amp;</span> Beauty
            <span className="f-body ml-3 align-middle text-xs tracking-[0.3em] text-(--muted) uppercase">by MC</span>
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener" className="link-u text-(--cream-dim) hover:text-(--gold)">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-between gap-6 border-t border-(--line) pt-8 text-sm text-(--muted) md:flex-row md:items-start">
          <div className="flex flex-col gap-3">
            <p>
              © {company.legalName} · CUI {company.cui} · Nr. Reg. Com. {company.regCom}
            </p>
            <p>Sediu: {company.address}</p>
            <nav aria-label="Informații legale" className="flex flex-wrap gap-x-6 gap-y-2">
              {legal.map((l) => (
                <Link key={l.href} href={l.href} className="link-u hover:text-(--cream)">
                  {l.label}
                </Link>
              ))}
              <CookieSettingsButton className="link-u cursor-pointer hover:text-(--cream)" />
            </nav>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <a href="https://reclamatiisal.anpc.ro/" target="_blank" rel="nofollow noopener">
              <Image src={anpcSal} alt="ANPC - Soluționarea alternativă a litigiilor" width={160} className="h-auto w-[160px]" />
            </a>
            <SnsCredit lang="ro" site="slim-beauty" />
          </div>
        </div>
      </div>
    </footer>
  );
}
