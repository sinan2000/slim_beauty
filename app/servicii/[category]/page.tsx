import Link from 'next/link';
import { notFound } from 'next/navigation';
import { services } from '@/lib/data';
import { normalizeString } from '@/lib/utils';
import { categoryPageMeta } from '@/lib/metadatas';
import { generateCategorySchema } from '@/lib/jsonLds';
import { categories, contact, priceFrom, ron } from '@/lib/site-content';
import { BronzChoreo } from '@/components/bronz/choreo';
import { PageHero } from '@/components/bronz/page-hero';
import { BronzBreadcrumbs } from '@/components/bronz/breadcrumbs';
import { ServiceIndex } from '@/components/bronz/service-index';
import { Frame } from '@/components/bronz/frame';
import { BronzContact } from '@/components/bronz/contact';
import { Arrow } from '@/components/bronz/ui';

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;

  const cat = categories.find((c) => c.slug === category);

  if (!cat) {
    notFound();
  }

  const other = categories.find((c) => c.slug !== cat.slug)!;
  const prices = cat.services.map(priceFrom).filter((p): p is number => p !== null);
  const from = prices.length ? Math.min(...prices) : null;
  const [first, ...rest] = cat.name.split(' ');

  return (
    <BronzChoreo>
      <script
        id="category-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateCategorySchema(category === 'remodelare-corporala' ? 0 : 1)) }}
      />

      <main>
        <PageHero
          photo={cat.hero}
          alt={`Tratamente de ${cat.name} la Slim & Beauty by MC`}
          top={<BronzBreadcrumbs category={cat.name} />}
          title={
            <h1 data-hero-title className="f-display text-[clamp(3.2rem,8.4vw,7rem)] leading-[0.95] font-normal tracking-[-0.03em] text-(--cream)">
              <span className="block">{first}</span>
              <span className="block italic text-(--gold)">{rest.join(' ')}</span>
            </h1>
          }
        >
          <p className="text-lg leading-relaxed text-(--cream-dim) md:text-xl">{cat.description}</p>
          <div className="flex flex-wrap gap-3">
            <a href="#tratamente" className="btn-gold h-14 px-8 text-base">
              Vezi tratamentele
            </a>
            <a href={contact.phoneHref} className="btn-ghost h-14 px-8 text-base">
              Sună <span className="num font-normal opacity-80">{contact.phone}</span>
            </a>
          </div>
        </PageHero>

        <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
          <p data-scrub-words className="f-display max-w-[24ch] text-[clamp(2rem,4.2vw,3.6rem)] leading-[1.12] tracking-[-0.015em] text-(--cream)">
            {cat.services.length} tratamente, fiecare cu prețul la vedere
            {from !== null ? (
              <>
                , de la <span className="num italic text-(--gold)">{ron(from)}</span> pe ședință.
              </>
            ) : (
              '.'
            )}
          </p>
          <p className="mt-10 max-w-[52ch] text-lg leading-relaxed">
            Apasă pe un tratament ca să vezi cum funcționează, ce pachete există și răspunsurile la cele mai frecvente întrebări. Nu știi ce ți se potrivește? Sună-ne și îți recomandăm noi.
          </p>
        </section>

        <section id="tratamente" aria-label={`Tratamente de ${cat.name}`} className="grain relative scroll-mt-20 border-y border-(--line) bg-(--espresso-2)">
          <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-32">
            <ServiceIndex categories={[cat]} withDescriptions showCategoryHeads={false} headingLevel={2} />
          </div>
        </section>

        {/* The other category, as one large invitation */}
        <section aria-labelledby="cealalta" className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
          <Link href={other.href} className="zoom group grid items-center gap-10 md:grid-cols-12">
            <Frame
              src={other.photo}
              alt={`Tratamente de ${other.name} la Slim & Beauty by MC`}
              sizes="(min-width: 768px) 40vw, 100vw"
              reveal="side"
              className="aspect-[4/3] md:col-span-5"
            />
            <div className="md:col-span-6 md:col-start-7">
              <h2 id="cealalta" data-split className="f-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[1] tracking-[-0.02em] text-(--cream)">
                Descoperă și <span className="italic text-(--gold)">{other.name}</span>
              </h2>
              <p className="mt-6 max-w-[44ch] text-lg leading-relaxed">{other.description}</p>
              <span className="link-u mt-8 inline-flex items-center gap-3 text-(--gold)">
                Vezi cele {other.services.length} tratamente <Arrow />
              </span>
            </div>
          </Link>
        </section>

        <BronzContact />
      </main>
    </BronzChoreo>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  return categoryPageMeta({ params });
}

export async function generateStaticParams() {
  return services.map((service) => ({
    category: normalizeString(service.category),
  }));
};
