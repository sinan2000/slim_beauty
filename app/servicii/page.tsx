import Link from "next/link";
import { servicesPageMeta } from "@/lib/metadatas";
import { serviceSchema } from "@/lib/jsonLds";
import { categories, contact, photos, priceFrom, ron } from "@/lib/site-content";
import { BronzShell } from "@/components/bronz/shell";
import { PageHero } from "@/components/bronz/page-hero";
import { Frame } from "@/components/bronz/frame";
import { ServiceIndex } from "@/components/bronz/service-index";
import { BronzContact } from "@/components/bronz/contact";
import { Arrow } from "@/components/bronz/ui";

export const metadata = servicesPageMeta;

function lowestPrice(services: (typeof categories)[number]["services"]) {
  const prices = services.map(priceFrom).filter((p): p is number => p !== null);
  return prices.length ? Math.min(...prices) : null;
}

export default function ServicesPage() {
  return (
    <BronzShell>
      <script id="services-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <main>
        <PageHero
          pin
          goldLight
          photo={photos.bronzDark}
          alt="Bronz organic pe spatele unei cliente, în lumină caldă"
          position="58% 30%"
          title={
            <h1 data-hero-title className="f-display max-w-[16ch] text-[clamp(3rem,7.6vw,6rem)] leading-[0.98] font-normal tracking-[-0.025em] text-(--cream)">
              <span className="block">Servicii</span>
              <span className="block">
                Slim <span className="italic text-(--gold)">&amp;</span> Beauty
              </span>
              <span className="mt-4 block text-[0.42em] leading-tight text-(--cream-dim) italic">în Timișoara și Dumbrăvița</span>
            </h1>
          }
        >
          <p className="text-lg leading-relaxed text-(--cream-dim) md:text-xl">
            Remodelare corporală non-invazivă și dermato-cosmetică, cu prețul fiecărei ședințe la vedere. Alege tratamentul sau sună-ne și îți recomandăm noi.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#preturi" className="btn-gold h-14 px-8 text-base">
              Vezi prețurile
            </a>
            <a href={contact.phoneHref} className="btn-ghost h-14 px-8 text-base">
              Sună <span className="num font-normal opacity-80">{contact.phone}</span>
            </a>
          </div>
        </PageHero>

        {/* The two categories, each led by its strongest photograph */}
        <section aria-label="Categorii de tratamente" className="mx-auto flex max-w-[1400px] flex-col gap-28 px-5 py-28 md:gap-40 md:px-10 md:py-40">
          {categories.map((cat, i) => {
            const from = lowestPrice(cat.services);
            const [first, ...rest] = cat.name.split(" ");
            return (
              <article key={cat.name} className="grid items-center gap-12 md:grid-cols-12 md:gap-10">
                <Link
                  href={cat.href}
                  aria-label={`Vezi tratamentele de ${cat.name}`}
                  className={`zoom block md:col-span-7 ${i % 2 ? "md:order-2 md:col-start-6" : ""}`}
                >
                  <Frame
                    src={cat.photo}
                    alt={`Tratamente de ${cat.name} la Slim & Beauty by MC`}
                    sizes="(min-width: 768px) 58vw, 100vw"
                    reveal={i % 2 ? "side" : "rise"}
                    className="aspect-[4/5] md:aspect-[5/6]"
                  />
                </Link>
                <div className={`md:col-span-5 ${i % 2 ? "md:order-1 md:col-start-1" : "md:col-start-8"}`}>
                  <h2 data-split className="f-display text-[clamp(2.8rem,5.6vw,5rem)] leading-[0.98] tracking-[-0.025em] text-(--cream)">
                    <Link href={cat.href} className="transition-colors hover:text-(--gold)">
                      {first} <span className="italic text-(--gold)">{rest.join(" ")}</span>
                    </Link>
                  </h2>
                  <p className="mt-6 max-w-[44ch] text-lg leading-relaxed">{cat.description}</p>
                  <ul className="mt-10 border-t border-(--line)">
                    {cat.services.map((s) => (
                      <li key={s.title} className="border-b border-(--line)">
                        <Link href={s.href} className="row flex items-baseline justify-between gap-4 py-3">
                          <span className="row-title text-(--cream)">{s.title}</span>
                          <span className="num shrink-0 text-sm text-(--muted)">
                            {priceFrom(s) === null ? "La evaluare" : ron(priceFrom(s)!)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <p className="num mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
                    <Link href={cat.href} className="link-u inline-flex items-center gap-3 text-(--gold)">
                      Vezi cele {cat.services.length} tratamente <Arrow />
                    </Link>
                    {from !== null ? <span className="text-sm text-(--muted)">de la {ron(from)} pe ședință</span> : null}
                  </p>
                </div>
              </article>
            );
          })}
        </section>

        {/* Every treatment, priced */}
        <section id="preturi" aria-labelledby="meniu" className="grain relative scroll-mt-20 border-y border-(--line) bg-(--espresso-2)">
          <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
            <div className="mb-16 grid gap-6 md:mb-24 md:grid-cols-12 md:items-end">
              <h2 id="meniu" data-split className="f-display text-[clamp(2.6rem,6vw,5.6rem)] leading-[0.98] tracking-[-0.025em] text-(--cream) md:col-span-8">
                Toate tratamentele, <span className="italic text-(--gold)">cu prețul la vedere</span>
              </h2>
              <p className="max-w-[40ch] text-base leading-relaxed text-(--muted) md:col-span-4">
                Prețul afișat e pentru o ședință; dedesubt vezi pachetele, care ies mai avantajos. Plata se face cash, în lei.
              </p>
            </div>
            <ServiceIndex />
          </div>
        </section>

        <BronzContact />
      </main>
    </BronzShell>
  );
}
