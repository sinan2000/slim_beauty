import Image from "next/image";
import { Phone, MessageCircle } from "lucide-react";
import { contact, photos, findService } from "../../_shared/content";

/** Splits a line into masked words; `start` continues the stagger across lines. */
function Words({ text, start }: { text: string; start: number }) {
  return text.split(" ").map((word, i) => (
    <span key={i} className="ed-word">
      <span style={{ "--i": start + i } as React.CSSProperties}>{word}</span>
      {" "}
    </span>
  ));
}

export function Hero() {
  const bronz = findService("Bronzare Organică DHA");

  return (
    <section className="relative overflow-hidden px-4 pb-10 pt-24 md:px-8 md:pb-16 md:pt-28 lg:px-12">
      <div className="relative grid grid-cols-12 gap-x-4 md:gap-x-6">
        <h1 className="ed-display col-span-12 text-[clamp(3rem,12.8vw,7.5rem)] lg:text-[min(9.2vw,10rem)] font-[550] leading-[0.86] lg:col-span-9">
          <span className="block">
            <Words text="Corpul tău," start={0} />
          </span>
          <span className="flex items-center gap-[0.12em]">
            <span className="italic text-[var(--accent)]">
              <Words text="remodelat" start={2} />
            </span>
            <span
              className="ed-unveil relative hidden h-[0.72em] w-[1.7em] shrink-0 overflow-hidden rounded-full sm:inline-block"
              style={{ "--d": "0.55s" } as React.CSSProperties}
            >
              <Image
                src={photos.vshapeDark}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 320px, 200px"
                className="object-cover object-[50%_40%]"
              />
            </span>
          </span>
          <span className="block">
            <Words text="fără bisturiu." start={3} />
          </span>
        </h1>

        <figure
          className="ed-unveil relative col-span-7 col-start-6 mt-8 aspect-[4/5] overflow-hidden sm:col-span-5 sm:col-start-8 md:col-span-4 md:col-start-9 lg:absolute lg:right-0 lg:top-0 lg:mt-0 lg:aspect-auto lg:h-[min(76vh,46rem)] lg:w-[25vw]"
          style={{ "--d": "0.3s" } as React.CSSProperties}
        >
          <Image
            src={photos.bronzBack}
            alt="Spatele unei cliente după bronzarea organică, cu linia costumului de baie vizibilă"
            fill
            priority
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 58vw"
            className="object-cover"
          />
        </figure>

        <figure
          className="ed-unveil relative col-span-5 col-start-1 row-start-2 mt-24 aspect-[3/4] self-start overflow-hidden sm:mt-28 md:col-span-3 lg:hidden"
          style={{ "--d": "0.5s" } as React.CSSProperties}
        >
          <Image
            src={photos.heroFace}
            alt="Clientă cu mască facială în timpul unui tratament de curățire"
            fill
            sizes="40vw"
            className="object-cover object-[30%_50%]"
          />
        </figure>

        <div
          className="ed-fade col-span-12 mt-10 flex flex-col gap-8 md:mt-14 lg:col-span-8 lg:mt-16 lg:flex-row lg:items-end lg:justify-between"
          style={{ "--d": "0.85s" } as React.CSSProperties}
        >
          <p className="max-w-[34ch] text-lg leading-snug text-[var(--ink-soft)] md:text-xl">
            Remodelare corporală și dermato-cosmetică în Dumbrăvița, lângă Timișoara. Tratamente non-invazive, aparatură
            modernă și prețuri afișate, ca să știi de la început cât costă.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
            <a
              href={contact.phoneHref}
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[var(--ink)] px-7 py-4 text-base font-medium text-[var(--paper)] transition-[background-color,transform] duration-300 hover:bg-[var(--accent)] active:scale-[0.98]"
            >
              <Phone className="size-4" aria-hidden="true" />
              Sună acum
            </a>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-[var(--ink)] px-7 py-4 text-base font-medium transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Scrie pe WhatsApp
            </a>
          </div>
        </div>

        <figcaption className="ed-fade col-span-12 mt-6 hidden text-sm text-[var(--ink-soft)] lg:absolute lg:right-0 lg:top-[min(76vh,46rem)] lg:mt-3 lg:block lg:w-[25vw]">
          <span className="italic">{bronz.title}</span>, o ședință de {bronz.duration} de minute.{" "}
          <span className="ed-num font-medium text-[var(--ink)]">{bronz.tiers[0].price} RON</span>
        </figcaption>
      </div>
    </section>
  );
}
