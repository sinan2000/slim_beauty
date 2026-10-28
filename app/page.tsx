import Image from "next/image";
import { homePageMeta } from "@/lib/metadatas";
import { generateFAQSchema } from "@/lib/jsonLds";
import { faqs } from "@/lib/data";
import { beforeAfter, contact, facts, photos, reviews, spotlight } from "@/lib/site-content";
import { BronzChoreo } from "@/components/bronz/choreo";
import { GoldLight } from "@/components/bronz/gold-light";
import { Frame } from "@/components/bronz/frame";
import { BeforeAfter } from "@/components/bronz/before-after";
import { Featured } from "@/components/bronz/featured";
import { ServiceIndex } from "@/components/bronz/service-index";
import { FaqList } from "@/components/bronz/service-parts";
import { BronzContact } from "@/components/bronz/contact";

export const metadata = homePageMeta;

export default function HomePage() {
  return (
    <BronzChoreo>
      <script
        id="contact-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />

      <main>
        {/* Hero */}
        <section data-hero="pin" className="grain relative isolate flex min-h-[100svh] items-end overflow-hidden">
          <div data-hero-photo className="hero-photo absolute inset-0 -z-20 overflow-hidden">
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
            <h1 data-hero-title className="f-display max-w-[14ch] text-[clamp(3rem,7.6vw,6rem)] leading-[0.98] font-normal tracking-[-0.025em] text-(--cream)">
              <span className="block">Conturul tău,</span>
              <span className="block italic text-(--gold)">sculptat</span>
              <span className="block">fără bisturiu.</span>
            </h1>
            <div data-hero-sub className="mt-8 flex max-w-xl flex-col gap-8">
              <p className="text-lg leading-relaxed text-(--cream-dim) md:text-xl">
                Remodelare corporală non-invazivă, masaj anticelulitic, bronz organic și dermato-cosmetică, în salonul nostru din Dumbrăvița, lângă Timișoara.
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
            <p data-scrub-words className="f-display text-[clamp(2rem,4.2vw,3.6rem)] leading-[1.12] tracking-[-0.015em] text-(--cream)">
              Aparatură modernă, prețuri afișate la vedere și <span className="italic text-(--gold)">{facts.years} ani</span> de grijă pentru corpul tău.
            </p>
            <p className="mt-10 max-w-[52ch] text-lg leading-relaxed">
              Tratamentele noastre sunt non-invazive și nu cer timp de recuperare: ieși din salon și te întorci direct la ziua ta. Nu știi ce ți se potrivește? Sună-ne și îți recomandăm noi.
            </p>
          </div>
          <Frame
            src={photos.salonReception}
            alt="Recepția salonului Slim & Beauty by MC din Dumbrăvița, cu logo-ul pe perete și flori albe"
            sizes="(min-width: 768px) 40vw, 100vw"
            className="aspect-[3/4] md:col-span-5"
          />
        </section>

        <Featured />

        {/* Proof */}
        <section aria-labelledby="rezultate" className="bg-(--espresso-2)">
          <div className="mx-auto grid max-w-[1400px] gap-14 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36">
            <div className="md:col-span-4">
              <h2 id="rezultate" data-split className="f-display text-[clamp(2.4rem,4.6vw,4rem)] leading-[1.02] tracking-[-0.02em] text-(--cream)">
                Rezultate, <span className="italic text-(--gold)">nu promisiuni</span>
              </h2>
              <p className="mt-6 max-w-[40ch] text-lg leading-relaxed">
                Două cazuri reale din salon, înainte și după tratament. Fiecare corp răspunde diferit, așa că îți spunem sincer la ce să te aștepți înainte să începi.
              </p>
            </div>
            <div className="md:col-span-8">
              <BeforeAfter pairs={beforeAfter} />
            </div>
          </div>
        </section>

        {/* Reassurance + owner */}
        <section aria-labelledby="liniste" className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-40">
          <div className="grid gap-16 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-5">
              <Frame
                src={photos.mihaela}
                alt="Mihaela Ceviker în salonul Slim & Beauty din Dumbrăvița, lângă aparatura de tratament"
                sizes="(min-width: 768px) 40vw, 100vw"
                position="30% 30%"
                reveal="side"
                className="aspect-[4/5]"
              />
            </div>
            <div className="md:col-span-6 md:col-start-7 md:pt-8">
              <h2 id="liniste" data-split className="f-display text-[clamp(2.4rem,4.6vw,4rem)] leading-[1.02] tracking-[-0.02em] text-(--cream)">
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
            <ServiceIndex lead={spotlight?.title} />
          </div>
        </section>

        {/* Reviews */}
        <section aria-labelledby="recenzii" className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-40">
          <h2 id="recenzii" data-split className="f-display max-w-[20ch] text-[clamp(2.4rem,4.6vw,4rem)] leading-[1.02] tracking-[-0.02em] text-(--cream)">
            Ce spun <span className="italic text-(--gold)">clientele</span> noastre
          </h2>
          <p className="mt-5 text-(--muted)">
            Nota <span className="num text-(--cream)">{facts.rating}</span> din 5, din {facts.ratingCount} recenzii pe Google.{" "}
            <a href={contact.googleReview} target="_blank" rel="noopener" className="link-u text-(--gold)">
              Lasă o recenzie
            </a>
          </p>
          <ul data-stagger className="mt-16 grid gap-14 md:grid-cols-3 md:gap-10">
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

        {/* FAQ (the FAQPage schema above describes these) */}
        <section aria-labelledby="intrebari" className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
          <div className="grid gap-12 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-4">
              <h2 id="intrebari" data-split className="f-display text-[clamp(2.4rem,4.6vw,4rem)] leading-[1.02] tracking-[-0.02em] text-(--cream)">
                Întrebări <span className="italic text-(--gold)">frecvente</span>
              </h2>
            </div>
            <div className="md:col-span-8">
              <FaqList items={faqs} />
            </div>
          </div>
        </section>

        <BronzContact />
      </main>
    </BronzChoreo>
  );
}
