import Image from "next/image";
import Link from "next/link";
import { Bodoni_Moda, Manrope } from "next/font/google";
import anpcSal from "@/assets/anpc-sal.png";
import { SnsCredit } from "@/components/sns/sns-credit";
import { company } from "@/lib/company";
import { contact, facts, photos, reviews } from "../_shared/content";
import { GoldLight } from "./anim/gold-light";
import { Curtain } from "./anim/curtain";
import { BeforeAfter } from "./before-after";
import { Nav } from "./nav";
import { Featured } from "./featured";
import { PriceList } from "./price-list";
import { Arrow } from "./ui";

const display = Bodoni_Moda({ subsets: ["latin", "latin-ext"], style: ["normal", "italic"], variable: "--font-bodoni" });
const body = Manrope({ subsets: ["latin", "latin-ext"], variable: "--font-manrope" });

const legal = [
  { href: "/politica-de-confidentialitate", label: "Politica de confidențialitate" },
  { href: "/termeni-si-conditii", label: "Termeni și condiții" },
  { href: "/politica-cookies", label: "Politica de cookies" },
];

const css = `
html:has(.bronz) { background: #15100c; color-scheme: dark; scrollbar-color: #6b5236 #15100c; }
html:has(.bronz)::-webkit-scrollbar { width: 10px; }
html:has(.bronz)::-webkit-scrollbar-track { background: #15100c; }
html:has(.bronz)::-webkit-scrollbar-thumb { background: #6b5236; border-radius: 10px; border: 2px solid #15100c; }
.bronz {
  --espresso: #15100c; --espresso-2: #1f1712; --espresso-3: #2a1f17;
  --cream: #f1e6d3; --cream-dim: #d9c9b0; --muted: #b5a088;
  --gold: #d5b071; --gold-deep: #a97c42; --line: rgba(233, 217, 191, 0.14);
  background: var(--espresso); color: var(--cream-dim);
  font-family: var(--font-manrope), system-ui, sans-serif;
  caret-color: var(--gold);
}
.bronz ::selection { background: #d5b071; color: #15100c; }
.bronz :focus-visible { outline: 1.5px solid var(--gold); outline-offset: 4px; border-radius: 2px; }
.bronz .f-display { font-family: var(--font-bodoni), Georgia, serif; font-optical-sizing: auto; }
.bronz .f-body { font-family: var(--font-manrope), system-ui, sans-serif; }
.bronz .num { font-variant-numeric: tabular-nums lining-nums; }
.bronz .btn-gold, .bronz .btn-ghost {
  display: inline-flex; align-items: center; justify-content: center; gap: .6rem; border-radius: 999px;
  font-weight: 600; letter-spacing: .01em; transition: background-color .4s cubic-bezier(.16,1,.3,1), color .4s, border-color .4s, transform .4s cubic-bezier(.16,1,.3,1);
}
.bronz .btn-gold { background: var(--gold); color: var(--espresso); box-shadow: 0 10px 30px -10px rgba(213,176,113,.55); }
.bronz .btn-gold:hover { background: #e6c88f; transform: translateY(-1px); }
.bronz .btn-ghost { border: 1px solid rgba(241,230,211,.35); color: var(--cream); }
.bronz .btn-ghost:hover { border-color: var(--gold); color: var(--gold); }
.bronz .link-u { text-decoration: underline; text-decoration-color: transparent; text-underline-offset: 6px; text-decoration-thickness: 1px; transition: text-decoration-color .3s, color .3s; }
.bronz .link-u:hover { text-decoration-color: var(--gold); }
.bronz .leader { flex: 1; min-width: 1.5rem; border-bottom: 1px dotted rgba(213,176,113,.45); transform: translateY(-.35em); }
.bronz .grain::after {
  content: ""; position: absolute; inset: 0; pointer-events: none; opacity: .08; mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
@keyframes bz-rise { from { transform: translateY(108%); filter: blur(6px); } to { transform: none; filter: none; } }
@keyframes bz-fade { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
@keyframes bz-photo { from { transform: scale(1.12); filter: brightness(.4); } to { transform: scale(1); filter: none; } }
.bronz .rise > span { display: block; animation: bz-rise 1.4s cubic-bezier(.16,1,.3,1) both; }
.bronz .rise:nth-child(2) > span { animation-delay: .12s; }
.bronz .rise:nth-child(3) > span { animation-delay: .24s; }
.bronz .fade-in { animation: bz-fade 1.2s cubic-bezier(.16,1,.3,1) .55s both; }
.bronz .hero-photo { animation: bz-photo 2.6s cubic-bezier(.16,1,.3,1) both; }
/* Featured run: photos drift against the horizontal travel (--p is set by anim/featured-track). */
.bronz .feat-photo { transform: translateX(calc((var(--p, .5) - .5) * -14%)); will-change: transform; }
/* Price list: the title leans in and turns gold on hover, like a menu line being chosen. */
.bronz .row .row-title { transition: color .5s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1); }
@media (hover: hover) and (pointer: fine) {
  .bronz .row:hover .row-title { color: var(--gold); transform: translateX(.75rem); font-style: italic; }
}
@media (prefers-reduced-motion: reduce) {
  .bronz .feat-photo { transform: none; }
  .bronz .row .row-title { transition: none; }
  .bronz .rise > span, .bronz .fade-in, .bronz .hero-photo { animation: none; }
}
`;

export default function VariantDPreview() {
  return (
    <div className={`bronz ${display.variable} ${body.variable} min-h-dvh pb-20 md:pb-0`}>
      <style>{css}</style>
      <Nav />

      <main>
        {/* Hero */}
        <section className="grain relative isolate flex min-h-[100svh] items-end overflow-hidden">
          <div className="hero-photo absolute inset-0 -z-20">
            <Image
              src={photos.bronzDark}
              alt="Bronz organic pe spatele unei cliente, în lumină caldă"
              fill
              priority
              placeholder="blur"
              sizes="100vw"
              className="object-cover object-[62%_28%] md:object-[50%_30%]"
            />
          </div>
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(21,16,12,.92)_0%,rgba(21,16,12,.55)_42%,rgba(21,16,12,.05)_75%),linear-gradient(0deg,rgba(21,16,12,1)_0%,rgba(21,16,12,0)_40%)]" />
          <GoldLight className="pointer-events-none absolute inset-0 -z-10 h-full w-full mix-blend-screen" />

          <div className="mx-auto w-full max-w-[1400px] px-5 pt-32 pb-28 md:px-10 md:pb-20">
            <h1 className="f-display max-w-[14ch] text-[clamp(3rem,7.6vw,6rem)] leading-[0.98] font-normal tracking-[-0.025em] text-(--cream)">
              <span className="rise block overflow-hidden pb-[0.08em]"><span>Conturul tău,</span></span>
              <span className="rise block overflow-hidden pb-[0.08em]"><span className="italic text-(--gold)">sculptat</span></span>
              <span className="rise block overflow-hidden pb-[0.08em]"><span>fără bisturiu.</span></span>
            </h1>
            <div className="fade-in mt-8 flex max-w-xl flex-col gap-8">
              <p className="text-lg leading-relaxed text-(--cream-dim) md:text-xl">
                Remodelare corporală non-invazivă, bronz organic și dermato-cosmetică, în salonul nostru din Dumbrăvița, lângă Timișoara.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={contact.phoneHref} className="btn-gold h-14 px-8 text-base">
                  Sună acum <span className="num font-normal opacity-80">{contact.phone}</span>
                </a>
                <a href={contact.whatsapp} target="_blank" rel="noopener" className="btn-ghost h-14 px-8 text-base">
                  Scrie-ne pe WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Statement */}
        <section className="mx-auto grid max-w-[1400px] gap-12 px-5 py-28 md:grid-cols-12 md:gap-10 md:px-10 md:py-40">
          <div className="md:col-span-7 md:pt-10">
            <p className="f-display text-[clamp(2rem,4.2vw,3.6rem)] leading-[1.12] tracking-[-0.015em] text-(--cream)">
              Aparatură modernă, prețuri afișate la vedere și <span className="italic text-(--gold)">{facts.years} ani</span> de grijă pentru corpul tău.
            </p>
            <p className="mt-10 max-w-[52ch] text-lg leading-relaxed">
              Tratamentele noastre sunt non-invazive și nu cer timp de recuperare: ieși din salon și te întorci direct la ziua ta. Nu știi ce ți se potrivește? Sună-ne și îți recomandăm noi.
            </p>
          </div>
          <Curtain
            src={photos.salonRoom}
            alt="Interiorul salonului Slim & Beauty by MC din Dumbrăvița"
            sizes="(min-width: 768px) 40vw, 100vw"
            className="aspect-[3/4] md:col-span-5"
          />
        </section>

        <Featured />

        {/* Proof */}
        <section aria-labelledby="rezultate" className="bg-(--espresso-2)">
          <div className="mx-auto grid max-w-[1400px] gap-14 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36">
            <div className="md:col-span-4">
              <h2 id="rezultate" className="f-display text-[clamp(2.4rem,4.6vw,4rem)] leading-[1.02] tracking-[-0.02em] text-(--cream)">
                Rezultate, <span className="italic text-(--gold)">nu promisiuni</span>
              </h2>
              <p className="mt-6 max-w-[40ch] text-lg leading-relaxed">
                Două cazuri reale din salon, înainte și după tratament. Fiecare corp răspunde diferit, așa că îți spunem sincer la ce să te aștepți înainte să începi.
              </p>
            </div>
            <div className="md:col-span-8">
              <BeforeAfter />
            </div>
          </div>
        </section>

        {/* Reassurance + owner */}
        <section aria-labelledby="liniste" className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-40">
          <div className="grid gap-16 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-5">
              <Curtain
                src={photos.crioRoom}
                alt="Cabinet de tratament cu aparatură pentru remodelare corporală"
                sizes="(min-width: 768px) 40vw, 100vw"
                position="50% 50%"
                className="aspect-[4/5]"
              />
            </div>
            <div className="md:col-span-6 md:col-start-7 md:pt-8">
              <h2 id="liniste" className="f-display text-[clamp(2.4rem,4.6vw,4rem)] leading-[1.02] tracking-[-0.02em] text-(--cream)">
                Te simți în siguranță <span className="italic">din prima ședință</span>
              </h2>
              <p className="mt-6 max-w-[52ch] text-lg leading-relaxed">
                Salonul este condus de {facts.owner}, „MC” din numele nostru, cu peste {facts.years.replace("+", "")} ani de experiență în tratamente corporale și de îngrijire.
              </p>
              <dl className="mt-12 divide-y divide-(--line) border-y border-(--line)">
                {[
                  ["Non-invaziv", "Fără intervenții chirurgicale și fără anestezie."],
                  ["Fără timp de recuperare", "Pleci din salon și îți continui ziua normal."],
                  ["Recomandare pe măsura ta", "Ne spui ce te deranjează, iar noi îți recomandăm tratamentul potrivit."],
                ].map(([title, text]) => (
                  <div key={title} className="grid gap-1 py-6 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-8">
                    <dt className="f-display text-2xl text-(--cream)">{title}</dt>
                    <dd className="text-base leading-relaxed sm:pt-1">{text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <PriceList />

        {/* Reviews */}
        <section aria-labelledby="recenzii" className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-40">
          <h2 id="recenzii" className="f-display max-w-[20ch] text-[clamp(2.4rem,4.6vw,4rem)] leading-[1.02] tracking-[-0.02em] text-(--cream)">
            Ce spun <span className="italic text-(--gold)">clientele</span> noastre
          </h2>
          <p className="mt-5 text-(--muted)">
            Nota <span className="num text-(--cream)">{facts.rating}</span> din 5, din {facts.ratingCount} recenzii.
          </p>
          <ul className="mt-16 grid gap-14 md:grid-cols-3 md:gap-10">
            {reviews.map((r, i) => (
              <li key={r.name} className={`flex flex-col border-t border-(--gold)/40 pt-8 ${i === 1 ? "md:mt-16" : ""} ${i === 2 ? "md:mt-32" : ""}`}>
                <blockquote className="f-display flex-1 text-[1.6rem] leading-[1.3] text-(--cream) italic">„{r.quote}”</blockquote>
                <a href={r.url} target="_blank" rel="noopener nofollow" className="group mt-8 flex items-center gap-4">
                  <Image src={r.image} alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover grayscale-[30%]" />
                  <span>
                    <span className="block text-(--cream)">{r.name}</span>
                    <span className="link-u text-sm text-(--muted) group-hover:text-(--gold)">Recenzie pe Facebook</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Contact */}
        <section id="contact" aria-labelledby="vino" className="relative isolate scroll-mt-20 overflow-hidden border-t border-(--line)">
          <div className="mx-auto grid max-w-[1400px] gap-16 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36">
            <div className="md:col-span-7">
              <h2 id="vino" className="f-display text-[clamp(2.6rem,5.4vw,5rem)] leading-[1] tracking-[-0.025em] text-(--cream)">
                Hai să vorbim <span className="italic text-(--gold)">despre tine</span>
              </h2>
              <p className="mt-6 max-w-[48ch] text-lg leading-relaxed">
                Programările se fac la telefon sau prin mesaj. Alege cum îți e mai comod: îți răspundem noi cu ora potrivită.
              </p>
              <a href={contact.phoneHref} className="num f-display mt-12 block text-[clamp(2.2rem,5vw,4.2rem)] leading-none text-(--cream) transition-colors hover:text-(--gold)">
                {contact.phone}
              </a>
              <div className="mt-10 flex flex-wrap gap-3">
                <a href={contact.whatsapp} target="_blank" rel="noopener" className="btn-gold h-12 px-7">WhatsApp</a>
                <a href={contact.instagram} target="_blank" rel="noopener" className="btn-ghost h-12 px-7">Instagram</a>
                <a href={contact.facebook} target="_blank" rel="noopener" className="btn-ghost h-12 px-7">Facebook</a>
              </div>
            </div>
            <div className="flex flex-col gap-12 md:col-span-4 md:col-start-9 md:pt-4">
              <div>
                <h3 className="f-display text-2xl text-(--gold) italic">Program</h3>
                <dl className="num mt-5 flex flex-col gap-3">
                  {contact.hours.map((h) => (
                    <div key={h.days} className="flex items-baseline gap-3">
                      <dt>{h.days}</dt>
                      <span className="leader" aria-hidden="true" />
                      <dd className="text-(--cream)">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div>
                <h3 className="f-display text-2xl text-(--gold) italic">Adresă</h3>
                <p className="mt-5 text-(--cream)">{contact.address}</p>
                <p className="text-(--muted)">jud. Timiș, lângă Timișoara</p>
                <a href={contact.directions} target="_blank" rel="noopener" className="link-u mt-4 inline-flex items-center gap-3 text-(--gold)">
                  Deschide traseul în Google Maps <Arrow />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-(--line) bg-[#100c09]">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-10 px-5 py-14 md:px-10">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <p className="f-display text-[clamp(2.4rem,6vw,5rem)] leading-none text-(--cream)">
              Slim <span className="italic text-(--gold)">&amp;</span> Beauty
              <span className="f-body ml-3 align-middle text-xs tracking-[0.3em] text-(--muted) uppercase">by MC</span>
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-u text-(--muted) hover:text-(--cream)">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-between gap-6 border-t border-(--line) pt-8 text-sm text-(--muted) md:flex-row md:items-center">
            <p>
              {company.legalName} · CUI {company.cui} · {company.regCom}
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <a href="https://reclamatiisal.anpc.ro/" target="_blank" rel="nofollow noopener">
                <Image src={anpcSal} alt="ANPC - Soluționarea alternativă a litigiilor" width={160} className="h-auto w-[160px]" />
              </a>
              <SnsCredit lang="ro" site="slim-beauty" />
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky mobile contact */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-(--line) bg-(--espresso)/90 p-3 backdrop-blur-md md:hidden">
        <a href={contact.phoneHref} className="btn-gold h-12 text-sm">Sună</a>
        <a href={contact.whatsapp} target="_blank" rel="noopener" className="btn-ghost h-12 text-sm">WhatsApp</a>
      </div>
    </div>
  );
}
