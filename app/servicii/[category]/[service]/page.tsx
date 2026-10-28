import { notFound, permanentRedirect } from 'next/navigation';
import { normalizeString, oldSlug } from '@/lib/utils';
import { services } from '@/lib/data';
import { detailPageMeta } from '@/lib/metadatas';
import { generateFAQSchema, generateServiceSchema } from '@/lib/jsonLds';
import { allServices, contact, priceFrom, relatedServices, ron, serviceImage, whatsappFor } from '@/lib/site-content';
import { BronzChoreo } from '@/components/bronz/choreo';
import { PageHero } from '@/components/bronz/page-hero';
import { BronzBreadcrumbs } from '@/components/bronz/breadcrumbs';
import { BronzContact } from '@/components/bronz/contact';
import { Frame } from '@/components/bronz/frame';
import { FaqList, MediaGallery, RelatedServices, TierTable } from '@/components/bronz/service-parts';

/** Emphasis for the hero title: a parenthetical, else the last word, in gold italic. */
function heroTitle(title: string) {
  const paren = title.indexOf(' (');
  if (paren > 0) return [title.slice(0, paren), title.slice(paren + 1)] as const;
  const space = title.lastIndexOf(' ');
  return space > 0 ? ([title.slice(0, space), title.slice(space + 1)] as const) : ([title, ''] as const);
}

/** The first sentence of the medium description, as the hero's lead. */
function lead(text: string) {
  const end = text.indexOf('. ');
  return end > 0 ? text.slice(0, end + 1) : text;
}

export default async function ServicePage({ params }: { params: Promise<{ category: string; service: string }> }) {
  const { category, service } = await params;

  const categoryData = services.find((item) => normalizeString(item.category) === category);
  if (!categoryData) {
    const old_cat = services.find((i) => oldSlug(i.category) === category);
    if (old_cat) {
      const old_serv = old_cat.items.find((i) => oldSlug(i.title) === service);
      if (old_serv) {
        permanentRedirect(`/servicii/${normalizeString(old_cat.category)}/${normalizeString(old_serv.title)}`);
      }
    }
    notFound();
  }

  const serviceData = categoryData.items.find((item) => normalizeString(item.title) === service);

  if (!serviceData) {
    notFound();
  }

  const s = allServices.find((x) => x.categorySlug === category && x.slug === service)!;
  const media = serviceData.media ?? [];
  const from = priceFrom(s);
  const whatsapp = whatsappFor(serviceData.title);
  const [titleMain, titleAccent] = heroTitle(serviceData.title);
  const fact = serviceData.fact.replace(/^Știați că\s+/, '');
  const factText = fact.charAt(0).toUpperCase() + fact.slice(1);
  const secondPhoto = media.find((m) => typeof m !== 'string' && m !== serviceImage(s));

  return (
    <BronzChoreo>
      <script
        id="individual-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateServiceSchema(category === "remodelare-corporala" ? 0 : 1, serviceData.title)) }}
      />

      <script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(serviceData.faq)) }}
      />

      <main>
        <PageHero
          photo={serviceImage(s)}
          alt={`${serviceData.title} la Slim & Beauty by MC`}
          top={<BronzBreadcrumbs category={categoryData.category} service={serviceData.title} />}
          title={
            <h1 data-hero-title className="f-display max-w-[15ch] text-[clamp(2.8rem,7.4vw,6.2rem)] leading-[0.98] font-normal tracking-[-0.028em] text-(--cream)">
              <span className="block">{titleMain}</span>
              {titleAccent ? <span className="block italic text-(--gold)">{titleAccent}</span> : null}
            </h1>
          }
        >
          <p className="text-lg leading-relaxed text-(--cream-dim) md:text-xl">{lead(serviceData.mediumDescription)}</p>
          <dl className="num flex flex-wrap gap-x-10 gap-y-4 border-y border-(--line) py-5">
            {s.isNew ? (
              <div>
                <dt className="text-xs tracking-[0.2em] text-(--muted) uppercase">Nou</dt>
                <dd className="f-display mt-1 text-2xl text-(--gold) italic">la Slim &amp; Beauty</dd>
              </div>
            ) : null}
            <div>
              <dt className="text-xs tracking-[0.2em] text-(--muted) uppercase">Preț</dt>
              <dd className="f-display mt-1 text-2xl text-(--cream)">{from === null ? 'La evaluare' : `de la ${ron(from)}`}</dd>
            </div>
            {s.duration ? (
              <div>
                <dt className="text-xs tracking-[0.2em] text-(--muted) uppercase">Durată</dt>
                <dd className="f-display mt-1 text-2xl text-(--cream)">{s.duration} min</dd>
              </div>
            ) : null}
            {s.tiers.length > 1 ? (
              <div>
                <dt className="text-xs tracking-[0.2em] text-(--muted) uppercase">Pachete</dt>
                <dd className="f-display mt-1 text-2xl text-(--cream)">
                  până la <span className="text-(--gold)">−{s.tiers[s.tiers.length - 1].saving}%</span>
                </dd>
              </div>
            ) : null}
          </dl>
          <div className="flex flex-wrap gap-3">
            <a href={contact.phoneHref} className="btn-gold h-14 px-8 text-base">
              Sună <span className="num font-normal opacity-80">{contact.phone}</span>
            </a>
            <a href={whatsapp} target="_blank" rel="noopener" className="btn-ghost h-14 px-8 text-base">
              Scrie-ne pe WhatsApp
            </a>
          </div>
        </PageHero>

        {/* What it is, in one breath, and what it costs */}
        <section id="preturi" aria-labelledby="pret" className="scroll-mt-20">
          <div className="mx-auto grid max-w-[1400px] gap-16 px-5 py-24 md:grid-cols-12 md:gap-10 md:px-10 md:py-36">
            <div className="md:col-span-6">
              <p data-scrub-words className="f-display text-[clamp(1.4rem,2.8vw,2.5rem)] leading-[1.25] tracking-[-0.01em] text-(--cream)">
                {serviceData.mediumDescription}
              </p>
              {secondPhoto && typeof secondPhoto !== 'string' ? (
                <Frame
                  src={secondPhoto}
                  alt={`${serviceData.title} în salonul Slim & Beauty by MC`}
                  sizes="(min-width: 768px) 45vw, 100vw"
                  reveal="side"
                  className="mt-14 aspect-[4/3]"
                />
              ) : null}
            </div>
            <div className="md:col-span-5 md:col-start-8">
              <div className="md:sticky md:top-28">
                {s.tiers.length === 0 ? (
                  <>
                    <h2 id="pret" data-split className="f-display text-[clamp(2.4rem,4.6vw,4rem)] leading-[1.02] tracking-[-0.02em] text-(--cream)">
                      Preț <span className="italic text-(--gold)">după evaluare</span>
                    </h2>
                    <p className="mt-6 max-w-[44ch] text-lg leading-relaxed">
                      Programează-te pentru evaluare și află care este protocolul potrivit pentru tine. Pentru detalii despre preț, sună-ne sau scrie-ne pe WhatsApp.
                    </p>
                    <div className="mt-10 flex flex-wrap gap-3">
                      <a href={contact.phoneHref} className="btn-gold h-12 px-7">Sună pentru evaluare</a>
                      <a href={whatsapp} target="_blank" rel="noopener" className="btn-ghost h-12 px-7">WhatsApp</a>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 id="pret" data-split className="f-display text-[clamp(2.4rem,4.6vw,4rem)] leading-[1.02] tracking-[-0.02em] text-(--cream)">
                      {s.tiers.length > 1 ? (
                        <>
                          Mai multe ședințe, <span className="italic text-(--gold)">preț mai mic</span>
                        </>
                      ) : (
                        <>
                          Prețul, <span className="italic text-(--gold)">la vedere</span>
                        </>
                      )}
                    </h2>
                    <p className="mt-6 mb-10 max-w-[44ch] text-base leading-relaxed text-(--muted)">
                      {s.tiers.length > 1
                        ? 'Cu un pachet, fiecare ședință te costă mai puțin. Plata se face cash, în lei.'
                        : 'Prețul este pentru o ședință. Plata se face cash, în lei.'}
                    </p>
                    <TierTable tiers={s.tiers} duration={s.duration} />
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Did you know: one striking moment */}
        <section aria-labelledby="stiai" className="grain relative isolate overflow-hidden border-y border-(--line) bg-(--espresso-3)">
          <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
            <h2 id="stiai" className="f-display text-[clamp(2rem,3.6vw,3rem)] leading-none text-(--gold) italic">
              Știai că…
            </h2>
            <p data-split className="f-display mt-8 max-w-[32ch] text-[clamp(1.7rem,3.6vw,3.2rem)] leading-[1.12] tracking-[-0.015em] text-(--cream)">
              {factText}
            </p>
          </div>
        </section>

        {/* The full story, as a comfortable read */}
        <section aria-labelledby="despre" className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
          <div className="grid gap-12 md:grid-cols-12 md:gap-10">
            <h2 id="despre" data-split className="f-display text-[clamp(2.4rem,4.6vw,4rem)] leading-[1.02] tracking-[-0.02em] text-(--cream) md:col-span-4">
              Despre <span className="italic text-(--gold)">{serviceData.title}</span>
            </h2>
            <div className="prose-bz max-w-[65ch] text-lg leading-[1.75] md:col-span-7 md:col-start-6">
              {serviceData.longDescription.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section aria-labelledby="beneficii" className="border-t border-(--line)">
          <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
            <h2 id="beneficii" data-split className="f-display max-w-[18ch] text-[clamp(2.4rem,4.6vw,4rem)] leading-[1.02] tracking-[-0.02em] text-(--cream)">
              Beneficiile <span className="italic text-(--gold)">tratamentului</span>
            </h2>
            <dl className="mt-14 border-t border-(--gold)/50 md:mt-20">
              {serviceData.benefits.map((benefit) => {
                const colon = benefit.indexOf(':');
                const head = colon > 0 ? benefit.slice(0, colon) : benefit;
                const text = colon > 0 ? benefit.slice(colon + 1).trim() : '';
                return (
                  <div key={benefit} data-row className="grid gap-2 border-b border-(--line) py-7 md:grid-cols-12 md:gap-10 md:py-9">
                    <dt className="f-display text-[clamp(1.4rem,2.4vw,2rem)] leading-tight text-(--cream) md:col-span-5">{head}</dt>
                    {text ? <dd className="max-w-[60ch] text-base leading-relaxed md:col-span-7 md:pt-1.5 md:text-lg">{text}</dd> : null}
                  </div>
                );
              })}
            </dl>
          </div>
        </section>

        {/* Gallery */}
        {media.length > 0 ? (
          <section aria-labelledby="galerie" className="bg-(--espresso-2)">
            <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
              <h2 id="galerie" data-split className="f-display mb-14 text-[clamp(2.4rem,4.6vw,4rem)] leading-[1.02] tracking-[-0.02em] text-(--cream) md:mb-20">
                {serviceData.title} <span className="italic text-(--gold)">în imagini</span>
              </h2>
              <MediaGallery media={media} title={serviceData.title} />
            </div>
          </section>
        ) : null}

        {/* FAQ */}
        <section aria-labelledby="intrebari" className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
          <div className="grid gap-12 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-4">
              <h2 id="intrebari" data-split className="f-display text-[clamp(2.4rem,4.6vw,4rem)] leading-[1.02] tracking-[-0.02em] text-(--cream)">
                Întrebări <span className="italic text-(--gold)">frecvente</span>
              </h2>
              <p className="mt-6 max-w-[36ch] text-base leading-relaxed text-(--muted)">
                Nu găsești răspunsul? Sună-ne la <a href={contact.phoneHref} className="link-u num text-(--cream) hover:text-(--gold)">{contact.phone}</a>.
              </p>
            </div>
            <div className="md:col-span-8">
              <FaqList items={serviceData.faq} />
            </div>
          </div>
        </section>

        {/* Similar services */}
        <section aria-labelledby="similare" className="border-t border-(--line)">
          <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
            <h2 id="similare" data-split className="f-display mb-14 text-[clamp(2.4rem,4.6vw,4rem)] leading-[1.02] tracking-[-0.02em] text-(--cream) md:mb-20">
              Servicii <span className="italic text-(--gold)">similare</span>
            </h2>
            <RelatedServices items={relatedServices(s)} />
          </div>
        </section>

        <BronzContact whatsapp={whatsapp} />
      </main>
    </BronzChoreo>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; service: string }> }) {
  return detailPageMeta({ params });
}

export async function generateStaticParams() {
  return services.flatMap((category) =>
    category.items.map((service) => ({
      category: normalizeString(category.category),
      service: normalizeString(service.title),
    })));
}
