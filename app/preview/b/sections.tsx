import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, MapPin, MessageCircle, Phone, Star } from "lucide-react";

import anpcSal from "@/assets/anpc-sal.png";
import { SnsCredit } from "@/components/sns/sns-credit";
import { company } from "@/lib/company";
import { categories, contact, facts, findService, photos, reviews, type PreviewService } from "../_shared/content";
import { BeforeAfterSlider } from "./before-after";

const featured = [
  { service: findService("VShape Anticelulitic"), image: photos.vshapeDark, alt: "Aplicatorul VShape pe piele, în timpul unei ședințe anticelulitice" },
  { service: findService("Criolipoliză"), image: photos.crioSession, alt: "Clientă în timpul unei ședințe de criolipoliză în salonul Slim & Beauty" },
  { service: findService("Bronzare Organică DHA"), image: photos.bronzDark, alt: "Bronz organic uniform pe spatele unei cliente" },
];

const legalLinks = [
  { href: "/politica-de-confidentialitate", label: "Politica de confidențialitate" },
  { href: "/termeni-si-conditii", label: "Termeni și condiții" },
  { href: "/politica-cookies", label: "Politica de cookies" },
];

const ron = (n: number) => `${n.toLocaleString("ro-RO")} RON`;

/** Package arithmetic shown as the value argument: per-session price and what the package saves. */
function packageValue(s: PreviewService) {
  const single = s.tiers[0]?.price;
  return s.tiers.slice(1).map((t) => {
    const count = Number.parseInt(t.label, 10);
    return { ...t, perSession: Math.round(t.price / count), saves: single ? single * count - t.price : 0 };
  });
}

export const styles = `
.b-root {
  --b-porcelain: #f6f1ee;
  --b-shell: #efe6e2;
  --b-blush: #f3d3d4;
  --b-ink: #34101f;
  --b-ink-soft: #694352;
  --b-accent: #b3264f;
  --b-line: rgba(52, 16, 31, 0.12);
  background: var(--b-porcelain);
  color: var(--b-ink);
  font-family: var(--b-font-sans), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.b-root .b-display { font-family: var(--b-font-display), Georgia, serif; font-weight: 400; }
.b-root .b-display em, .b-root em.b-accent { font-style: italic; }
.b-root .b-ink { color: var(--b-ink); }
.b-root .b-ink-soft { color: var(--b-ink-soft); }
.b-root .b-accent { color: var(--b-accent); }
.b-root ::selection { background: var(--b-accent); color: var(--b-porcelain); }
.b-root :focus-visible { outline: 2px solid var(--b-accent); outline-offset: 3px; border-radius: 6px; }
.b-root a { text-underline-offset: 0.2em; }
.b-root .b-num { font-variant-numeric: tabular-nums lining-nums; }
html:has(.b-root) { scrollbar-color: #c9a3ad var(--b-porcelain, #f6f1ee); background: #f6f1ee; }
.b-btn { display: inline-flex; align-items: center; gap: 0.6rem; border-radius: 999px; padding: 0.95rem 1.5rem; font-size: 0.975rem; font-weight: 500; transition: background-color .3s cubic-bezier(.16,1,.3,1), color .3s, box-shadow .3s, transform .3s cubic-bezier(.16,1,.3,1); }
.b-btn:active { transform: scale(0.97); }
.b-btn-primary { background: var(--b-ink); color: var(--b-porcelain); box-shadow: 0 14px 30px -14px rgba(52,16,31,.6); }
.b-btn-primary:hover { background: var(--b-accent); }
.b-btn-ghost { background: rgba(255,255,255,.65); color: var(--b-ink); box-shadow: inset 0 0 0 1px var(--b-line); }
.b-btn-ghost:hover { background: #fff; box-shadow: inset 0 0 0 1px rgba(52,16,31,.3); }
.b-cue { animation: b-cue 2.2s cubic-bezier(.65,0,.35,1) infinite; }
@keyframes b-cue { 0% { transform: translateY(-100%); } 100% { transform: translateY(200%); } }
.b-frame:has(.b-range:focus-visible) { outline: 2px solid var(--b-accent); outline-offset: 4px; }
.b-photo img { transition: transform 1.2s cubic-bezier(.16,1,.3,1); }
.b-photo:hover img { transform: scale(1.04); }
@media (prefers-reduced-motion: reduce) { .b-cue { animation: none; } .b-photo:hover img { transform: none; } }
`;

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-[88rem] items-center justify-between px-5 py-4 md:px-10 md:py-6">
        <Link href="/preview/b" className="flex items-baseline gap-2 b-ink">
          <span className="b-display text-[1.65rem] leading-none tracking-[-0.01em]">Slim &amp; Beauty</span>
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.2em] b-ink-soft">by MC</span>
        </Link>
        <nav aria-label="Principal" className="flex items-center gap-1 md:gap-2">
          <Link href="/servicii" className="hidden rounded-full px-4 py-2 text-sm font-medium b-ink-soft transition-colors hover:text-[#34101f] sm:block">
            Servicii
          </Link>
          <a href="#preturi" className="hidden rounded-full px-4 py-2 text-sm font-medium b-ink-soft transition-colors hover:text-[#34101f] md:block">
            Prețuri
          </a>
          <a href="#contact" className="hidden rounded-full px-4 py-2 text-sm font-medium b-ink-soft transition-colors hover:text-[#34101f] md:block">
            Contact
          </a>
          <a href={contact.phoneHref} className="b-btn b-btn-primary ml-2 !px-4 !py-2.5 text-sm">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Sună
          </a>
        </nav>
      </div>
    </header>
  );
}

export function Featured() {
  return (
    <section aria-labelledby="b-featured" className="relative mx-auto max-w-[88rem] px-5 pb-24 pt-10 md:px-10 md:pb-36">
      <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-[1.1fr_1fr] md:items-end">
        <h2 id="b-featured" className="b-display text-[clamp(2.4rem,5vw,4.25rem)] leading-[1] tracking-[-0.02em] text-balance">
          Trei tratamente, <em className="b-accent">trei feluri</em> de a-ți remodela corpul.
        </h2>
        <p className="max-w-[32rem] text-lg leading-relaxed b-ink-soft md:justify-self-end">
          Aparatură modernă, ședințe de 20–40 de minute și prețuri afișate deschis, inclusiv pentru pachete.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-12 md:gap-6">
        {featured.map(({ service, image, alt }, i) => (
          <Link
            key={service.title}
            href={service.href}
            className={
              "group b-photo relative block overflow-hidden rounded-[2rem] bg-[#e9dcd8] shadow-[0_2px_0_rgba(52,16,31,0.04),0_50px_80px_-50px_rgba(52,16,31,0.55)] " +
              (i === 0 ? "aspect-[4/5] md:col-span-6 md:row-span-2 md:aspect-auto md:min-h-[44rem]" : "aspect-[4/3] md:col-span-6 md:aspect-auto md:min-h-[21rem]")
            }
          >
            <Image src={image} alt={alt} fill sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 50vw"} className="object-cover" />
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(36,8,20,0.78)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-[#f6f1ee] md:p-8">
              <div>
                <h3 className="b-display text-[clamp(1.9rem,3vw,2.75rem)] leading-none tracking-[-0.01em]">{service.title}</h3>
                <p className="mt-3 max-w-[26rem] text-[0.95rem] leading-snug text-[#f6f1ee]/85">{service.short}</p>
                <p className="b-num mt-4 text-sm font-medium">
                  de la {ron(service.tiers[0].price)}
                  {service.duration ? <span className="text-[#f6f1ee]/70"> · {service.duration} min</span> : null}
                </p>
              </div>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f6f1ee] text-[#34101f] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-rotate-45">
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Detalii {service.title}</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function PriceRow({ s }: { s: PreviewService }) {
  const packages = packageValue(s);
  const best = packages.at(-1);
  return (
    <li className="group grid gap-4 border-t border-[rgba(52,16,31,0.12)] py-6 md:grid-cols-[minmax(0,1.25fr)_5rem_minmax(0,1.75fr)] md:items-baseline md:gap-8 md:py-7">
      <div>
        <Link href={s.href} className="b-display text-[1.65rem] leading-tight tracking-[-0.01em] transition-colors group-hover:text-[#b3264f] md:text-[1.85rem]">
          {s.title}
        </Link>
        <p className="mt-1 text-[0.95rem] b-ink-soft">
          {s.short}
          {s.duration ? <span className="md:hidden"> · {s.duration} min</span> : null}
        </p>
      </div>
      <p className="b-num hidden text-sm b-ink-soft md:block">
        {s.duration ? (
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {s.duration} min
          </span>
        ) : null}
      </p>
      {s.tiers.length === 0 ? (
        <p className="text-lg font-medium">La evaluare</p>
      ) : (
        <div className="b-num grid grid-cols-3 gap-4 md:gap-8">
          <p>
            <span className="block text-xs uppercase tracking-[0.14em] b-ink-soft">{s.tiers[0].label}</span>
            <span className="text-lg font-medium md:text-xl">{ron(s.tiers[0].price)}</span>
          </p>
          {packages.map((p) => (
            <p key={p.label}>
              <span className="block text-xs uppercase tracking-[0.14em] b-ink-soft">{p.label}</span>
              <span className="text-lg font-medium md:text-xl">{ron(p.price)}</span>
              <span className="mt-0.5 block text-[0.8rem] leading-snug b-accent md:text-sm">
                {ron(p.perSession)} / ședință
                {p === best && p.saves > 0 ? <span className="block">economisești {ron(p.saves)}</span> : null}
              </span>
            </p>
          ))}
        </div>
      )}
    </li>
  );
}

export function Prices() {
  return (
    <section id="preturi" aria-labelledby="b-prices" className="scroll-mt-24 bg-[#efe6e2]">
      <div className="mx-auto max-w-[88rem] px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-end">
          <h2 id="b-prices" className="b-display text-[clamp(2.6rem,6vw,5.25rem)] leading-[0.95] tracking-[-0.025em] text-balance">
            Aparatură de clinică. <em className="b-accent">Prețuri de salon.</em>
          </h2>
          <p className="max-w-[34rem] text-lg leading-relaxed b-ink-soft md:justify-self-end">
            Toate prețurile sunt afișate, inclusiv pachetele de ședințe. Cu cât alegi mai multe ședințe, cu atât plătești mai puțin pe fiecare. Plata se face cash, în RON.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-20 md:mt-24">
          {categories.map((c) => (
            <div key={c.name}>
              <div className="mb-2 flex items-baseline justify-between gap-6">
                <h3 className="b-display text-[clamp(1.9rem,3vw,2.6rem)] tracking-[-0.01em]">{c.name}</h3>
                <Link href={c.href} className="inline-flex items-center gap-1 text-sm font-medium b-ink-soft underline decoration-[rgba(52,16,31,0.25)] hover:text-[#b3264f]">
                  Toate detaliile
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <ul>
                {c.services.map((s) => (
                  <PriceRow key={s.title} s={s} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Results() {
  return (
    <section aria-labelledby="b-results" className="mx-auto grid max-w-[88rem] gap-12 px-5 py-24 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-20 md:px-10 md:py-36">
      <div>
        <h2 id="b-results" className="b-display text-[clamp(2.4rem,5vw,4.25rem)] leading-[1] tracking-[-0.02em] text-balance">
          Rezultate reale, de la <em className="b-accent">cliente reale.</em>
        </h2>
        <p className="mt-6 max-w-[30rem] text-lg leading-relaxed b-ink-soft">
          Fotografii ale clientelor salonului, nu imagini de catalog. Trage de linie ca să compari înainte și după tratament.
        </p>
      </div>
      <div className="b-frame rounded-[2rem]">
        <BeforeAfterSlider />
      </div>
    </section>
  );
}

export function Reassurance() {
  const points = [
    { title: "Non-invaziv și fără durere", text: "Tratamentele de remodelare corporală sunt non-invazive și nedureroase, fără nicio intervenție chirurgicală." },
    { title: "Fără timp de recuperare", text: "După ședință revii imediat la activitățile tale zilnice." },
    { title: "Adaptat corpului tău", text: "Fiecare corp este diferit. Dacă nu știi ce tratament ți se potrivește, sună-ne și îți recomandăm noi." },
  ];
  return (
    <section aria-labelledby="b-salon" className="bg-[#34101f] text-[#f6f1ee]">
      <div className="mx-auto grid max-w-[88rem] gap-14 px-5 py-24 md:grid-cols-[1fr_1fr] md:gap-20 md:px-10 md:py-36">
        <div className="relative order-2 aspect-[3/4] overflow-hidden rounded-[2rem] md:order-1 md:aspect-auto md:min-h-[40rem]">
          <Image src={photos.salonRoom} alt="Interiorul salonului Slim & Beauty by MC din Dumbrăvița" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        </div>
        <div className="order-1 flex flex-col justify-center md:order-2">
          <h2 id="b-salon" className="b-display text-[clamp(2.4rem,5vw,4.25rem)] leading-[1] tracking-[-0.02em] text-balance">
            {facts.years} {facts.yearsLabel}, un singur salon, <em className="text-[#f3b9c6]">o singură grijă: tu.</em>
          </h2>
          <p className="mt-6 max-w-[32rem] text-lg leading-relaxed text-[#f6f1ee]/75">
            Slim &amp; Beauty by MC este salonul lui {facts.owner}, în Dumbrăvița. Aici vii pentru remodelare corporală și dermato-cosmetică, într-un spațiu liniștit, cu atmosferă plăcută.
          </p>
          <dl className="mt-12 flex flex-col">
            {points.map((p) => (
              <div key={p.title} className="grid gap-2 border-t border-[#f6f1ee]/15 py-6 md:grid-cols-[14rem_1fr] md:gap-8">
                <dt className="b-display text-2xl leading-tight">{p.title}</dt>
                <dd className="text-[#f6f1ee]/75">{p.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export function Reviews() {
  const [lead, ...rest] = reviews;
  return (
    <section aria-labelledby="b-reviews" className="mx-auto max-w-[88rem] px-5 py-24 md:px-10 md:py-36">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 id="b-reviews" className="b-display text-[clamp(2.4rem,5vw,4.25rem)] leading-[1] tracking-[-0.02em]">
          Ce spun <em className="b-accent">clientele.</em>
        </h2>
        <p className="b-num inline-flex items-center gap-2 text-lg">
          <Star className="h-5 w-5 fill-[#b3264f] text-[#b3264f]" aria-hidden="true" />
          <span className="font-medium">{facts.rating}</span>
          <span className="b-ink-soft">din 5 · {facts.ratingCount} recenzii</span>
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-12">
        <figure className="flex flex-col justify-between rounded-[2rem] bg-white p-8 shadow-[0_2px_0_rgba(52,16,31,0.04),0_40px_80px_-50px_rgba(52,16,31,0.45)] md:col-span-7 md:p-12">
          <blockquote className="b-display text-[clamp(2rem,3.8vw,3.4rem)] leading-[1.08] tracking-[-0.01em] text-balance">„{lead.quote}”</blockquote>
          <ReviewAuthor review={lead} />
        </figure>
        <div className="flex flex-col gap-6 md:col-span-5">
          {rest.map((r) => (
            <figure key={r.name} className="flex flex-1 flex-col justify-between rounded-[2rem] bg-[#efe6e2] p-8">
              <blockquote className="b-display text-[1.6rem] leading-[1.2] text-balance">„{r.quote}”</blockquote>
              <ReviewAuthor review={r} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewAuthor({ review }: { review: (typeof reviews)[number] }) {
  return (
    <figcaption className="mt-8 flex items-center gap-3">
      <Image src={review.image} alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
      <span className="flex flex-col">
        <span className="font-medium">{review.name}</span>
        <a href={review.url} target="_blank" rel="noopener noreferrer" className="text-sm b-ink-soft underline decoration-[rgba(52,16,31,0.25)] hover:text-[#b3264f]">
          Recenzie pe Facebook
        </a>
      </span>
    </figcaption>
  );
}

export function Contact() {
  const channels = [
    { label: "WhatsApp", href: contact.whatsapp },
    { label: "Instagram", href: contact.instagram },
    { label: "Facebook", href: contact.facebook },
    { label: "TikTok", href: contact.tiktok },
  ];
  return (
    <section id="contact" aria-labelledby="b-contact" className="scroll-mt-24 bg-[#efe6e2]">
      <div className="mx-auto grid max-w-[88rem] gap-14 px-5 py-24 md:grid-cols-[1.1fr_0.9fr] md:gap-20 md:px-10 md:py-36">
        <div>
          <h2 id="b-contact" className="b-display text-[clamp(2.8rem,7vw,6rem)] leading-[0.92] tracking-[-0.03em]">
            Hai să vorbim <em className="b-accent">despre tine.</em>
          </h2>
          <p className="mt-6 max-w-[30rem] text-lg leading-relaxed b-ink-soft">
            Programările se fac la telefon sau prin mesaj. Alege canalul care ți-e mai comod.
          </p>
          <a href={contact.phoneHref} className="b-display b-num mt-10 inline-flex items-center gap-4 text-[clamp(2rem,4.5vw,3.5rem)] leading-none tracking-[-0.01em] transition-colors hover:text-[#b3264f]">
            <Phone className="h-[0.7em] w-[0.7em]" aria-hidden="true" />
            {contact.phone}
          </a>
          <ul className="mt-8 flex flex-wrap gap-2">
            {channels.map((c) => (
              <li key={c.label}>
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="b-btn b-btn-ghost !py-2.5 text-sm">
                  {c.label}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.16em] b-ink-soft">Program</h3>
              <dl className="b-num flex flex-col gap-2">
                {contact.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-6 border-b border-[rgba(52,16,31,0.1)] pb-2">
                    <dt>{h.days}</dt>
                    <dd className="b-ink-soft">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.16em] b-ink-soft">Adresă</h3>
              <p className="flex gap-2">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#b3264f]" aria-hidden="true" />
                <span>
                  {contact.address}
                  <br />
                  <span className="b-ink-soft">jud. Timiș, lângă Timișoara</span>
                </span>
              </p>
              <a href={contact.directions} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-medium underline decoration-[rgba(52,16,31,0.3)] hover:text-[#b3264f]">
                Indicații în Google Maps
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
        <a
          href={contact.directions}
          target="_blank"
          rel="noopener noreferrer"
          className="group b-photo relative block min-h-[26rem] overflow-hidden rounded-[2rem] shadow-[0_2px_0_rgba(52,16,31,0.04),0_40px_80px_-50px_rgba(52,16,31,0.45)] md:min-h-full"
        >
          <Image src={photos.crioRoom} alt="Cabinetul de tratamente din salonul Slim & Beauty by MC" fill sizes="(max-width: 768px) 100vw, 45vw" className="object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(36,8,20,0.8)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-[#f6f1ee] md:p-8">
            <p>
              <span className="b-display block text-3xl leading-tight">Te așteptăm în Dumbrăvița</span>
              <span className="mt-1 block text-sm text-[#f6f1ee]/80">{contact.address} · deschide în Google Maps</span>
            </p>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f6f1ee] text-[#34101f] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-rotate-45">
              <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#f6f1ee] pb-28 md:pb-10">
      <div className="mx-auto max-w-[88rem] px-5 pt-16 md:px-10">
        <p className="b-display text-[clamp(3.5rem,13vw,11rem)] leading-[0.85] tracking-[-0.035em] text-[#34101f]">
          Slim &amp; Beauty <em className="b-accent">by MC</em>
        </p>
        <div className="mt-12 flex flex-col gap-8 border-t border-[rgba(52,16,31,0.12)] pt-8 text-sm b-ink-soft md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-1">
            <span>{company.legalName}</span>
            <span>CUI {company.cui} · {company.regCom}</span>
            <span>{company.address}</span>
          </div>
          <ul className="flex flex-col gap-2">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-[#34101f] hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href="https://reclamatiisal.anpc.ro/" target="_blank" rel="nofollow noopener noreferrer" className="self-start">
            <Image src={anpcSal} alt="ANPC – Soluționarea alternativă a litigiilor" width={200} className="h-auto w-[200px]" />
          </a>
        </div>
        <div className="mt-10 flex justify-center text-[#34101f]">
          <SnsCredit lang="ro" site="slim-beauty" />
        </div>
      </div>
    </footer>
  );
}

export function MobileContactBar() {
  return (
    <div className="fixed inset-x-3 bottom-3 z-40 flex gap-2 rounded-full bg-[#34101f]/95 p-1.5 shadow-[0_20px_40px_-12px_rgba(52,16,31,0.6)] md:hidden">
      <a href={contact.phoneHref} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#f6f1ee] py-3 text-sm font-medium text-[#34101f]">
        <Phone className="h-4 w-4" aria-hidden="true" />
        Sună
      </a>
      <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-medium text-[#f6f1ee]">
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        WhatsApp
      </a>
    </div>
  );
}

