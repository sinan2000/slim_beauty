import Link from "next/link";
import { contact, priceFrom, ron, serviceImage, whatsappFor, type PreviewService } from "@/lib/site-content";
import { Frame } from "./frame";
import { Arrow } from "./ui";

/**
 * One treatment given the stage: a large photo, its name with the "NOU" badge, its own description, the price (or
 * "Preț stabilit la evaluare" when the evaluation sets it) and direct calls to action.
 */
export function Spotlight({ service }: { service: PreviewService }) {
  const from = priceFrom(service);
  return (
    <section aria-labelledby="in-prim-plan" className="border-b border-(--line)">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-24 md:grid-cols-12 md:gap-10 md:px-10 md:py-36">
        <Link href={service.href} aria-label={`Află mai multe despre ${service.title}`} className="zoom block md:col-span-7">
          <Frame
            src={serviceImage(service)}
            alt={`${service.title} la Slim & Beauty by MC`}
            sizes="(min-width: 768px) 58vw, 100vw"
            position="62% 50%"
            className="aspect-[4/3] md:aspect-[7/5]"
          />
        </Link>
        <div className="md:col-span-5 md:col-start-8">
          <h2 id="in-prim-plan" data-split className="f-display text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.98] tracking-[-0.025em] text-(--cream)">
            {service.title}
          </h2>
          {service.isNew ? (
            <span className="mt-5 inline-block rounded-full border border-(--gold)/60 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.18em] text-(--gold) uppercase">
              Nou
            </span>
          ) : null}
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed">{service.medium}</p>
          <div className="mt-10 border-t border-(--gold)/40 pt-6">
            <p className="f-display text-[clamp(1.6rem,2.4vw,2.2rem)] leading-tight text-(--cream)">
              {from === null ? (
                <>
                  Preț stabilit <span className="italic text-(--gold)">la evaluare</span>
                </>
              ) : (
                <>
                  de la <span className="num">{ron(from)}</span>
                </>
              )}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={contact.phoneHref} className="btn-gold h-12 px-7">
                {from === null ? "Sună pentru evaluare" : "Sună"}
              </a>
              <a href={whatsappFor(service.title)} target="_blank" rel="noopener" className="btn-ghost h-12 px-7">
                WhatsApp
              </a>
            </div>
            <Link href={service.href} className="link-u mt-6 inline-flex items-center gap-3 text-(--gold)">
              Află tot despre {service.title} <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
