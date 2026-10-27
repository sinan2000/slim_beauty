import Image from "next/image";
import { ArrowUpRight, Phone, MessageCircle } from "lucide-react";
import { MapEmbed } from "@/components/home/map-embed";
import { contact, facts, photos, reviews } from "../../_shared/content";

export function Reassure() {
  return (
    <section aria-labelledby="ed-promise" className="grid gap-12 px-4 py-20 md:grid-cols-12 md:gap-8 md:px-8 md:py-28 lg:px-12">
      <div className="md:col-span-7">
        <h2 id="ed-promise" className="ed-display text-[clamp(2.6rem,6.4vw,6.5rem)] font-[550] leading-[0.92]">
          Non-invaziv.
          <br />
          <span className="italic text-[var(--accent)]">Fără timp</span> de recuperare.
          <br />
          Te întorci la ziua ta.
        </h2>
        <div className="mt-10 grid max-w-2xl gap-6 text-lg leading-relaxed text-[var(--ink-soft)] sm:grid-cols-2">
          <p>
            Salonul e condus de {facts.owner}, fondatoarea Slim &amp; Beauty by MC, cu peste {facts.years.replace("+", "")}{" "}
            ani de experiență în tratamente corporale.
          </p>
          <p>
            Înainte de orice pachet, vorbim despre ce te deranjează și îți spunem sincer ce tratament are sens pentru tine.
            Dacă nu știi de unde să începi, sună-ne.
          </p>
        </div>
      </div>
      <figure className="relative md:col-span-5">
        <div className="relative aspect-[3/4] overflow-hidden md:sticky md:top-24">
          <Image
            src={photos.salonRoom}
            alt="Holul salonului Slim & Beauty by MC din Dumbrăvița, cu scaune și o oglindă"
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
        <figcaption className="mt-3 text-sm text-[var(--ink-soft)]">Salonul, pe strada Petőfi Sándor 101.</figcaption>
      </figure>
    </section>
  );
}

export function Reviews() {
  return (
    <section aria-labelledby="ed-reviews" className="border-y border-[var(--ink)] px-4 py-20 md:px-8 md:py-28 lg:px-12">
      <h2 id="ed-reviews" className="mb-14 flex flex-wrap items-baseline gap-x-4 text-xl font-semibold md:mb-20 md:text-2xl">
        Ce spun clientele
        <span className="text-base font-normal text-[var(--ink-soft)]">
          Nota medie {facts.rating}, din {facts.ratingCount} recenzii.
        </span>
      </h2>
      <div className="flex flex-col gap-16 md:gap-24">
        {reviews.map((r, i) => (
          <figure
            key={r.name}
            className={`max-w-5xl ${i === 1 ? "md:ml-auto md:text-right" : ""} ${i === 2 ? "md:ml-[12%]" : ""}`}
          >
            <blockquote className="ed-display text-[clamp(1.9rem,4.4vw,4.2rem)] leading-[1.02]">
              <span className="text-[var(--accent)]">„</span>
              {r.quote}
              <span className="text-[var(--accent)]">”</span>
            </blockquote>
            <figcaption className={`mt-6 flex items-center gap-3 ${i === 1 ? "md:justify-end" : ""}`}>
              <Image src={r.image} alt="" width={44} height={44} className="size-11 rounded-full object-cover" />
              <span className="font-medium">{r.name}</span>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-[var(--ink-soft)] underline decoration-[var(--rule)] hover:text-[var(--accent)]"
              >
                recenzie pe Facebook
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="ed-contact" className="scroll-mt-16 px-4 py-20 md:px-8 md:py-28 lg:px-12">
      <h2 id="ed-contact" className="ed-display text-[clamp(2.8rem,7vw,7rem)] font-[550] leading-[0.9]">
        Hai să vorbim <span className="italic text-[var(--accent)]">despre tine.</span>
      </h2>
      <a
        href={contact.phoneHref}
        className="ed-display ed-num mt-8 inline-block text-[clamp(2.2rem,8.2vw,8.5rem)] leading-none underline decoration-2 underline-offset-[0.12em] transition-colors hover:text-[var(--accent)]"
      >
        {contact.phone}
      </a>

      <div className="mt-14 grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="flex flex-col gap-10 md:col-span-5">
          <div className="flex flex-wrap gap-3">
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3.5 font-medium text-white transition-colors hover:bg-[var(--accent-deep)]"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              WhatsApp
            </a>
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-[var(--ink)] px-6 py-3.5 font-medium transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Instagram
            </a>
            <a
              href={contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-[var(--ink)] px-6 py-3.5 font-medium transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Facebook
            </a>
          </div>

          <div>
            <h3 className="border-b-2 border-[var(--ink)] pb-2 font-semibold">Program</h3>
            <dl>
              {contact.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4 border-b border-[var(--rule)] py-3">
                  <dt>{h.days}</dt>
                  <dd className="ed-num text-[var(--ink-soft)]">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h3 className="border-b-2 border-[var(--ink)] pb-2 font-semibold">Adresă</h3>
            <p className="mt-3 text-lg">{contact.address}, Timiș</p>
            <p className="mt-1 text-[var(--ink-soft)]">La câteva minute de Timișoara. Plata se face cash, în lei.</p>
            <a
              href={contact.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 font-medium underline decoration-[var(--rule)] hover:text-[var(--accent)]"
            >
              Indicații de drum
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="relative min-h-[24rem] overflow-hidden border border-[var(--ink)] md:col-span-7">
          <MapEmbed />
        </div>
      </div>

      <a
        href={contact.phoneHref}
        className="mt-14 hidden items-center gap-2 text-sm text-[var(--ink-soft)] hover:text-[var(--accent)] md:inline-flex"
      >
        <Phone className="size-4" aria-hidden="true" />
        Programările se fac la telefon sau pe mesaj. Nu avem formular online.
      </a>
    </section>
  );
}
