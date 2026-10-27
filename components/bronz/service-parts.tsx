import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { priceFrom, ron, serviceImage, type PreviewService, type Tier } from "@/lib/site-content";
import { Arrow, Plus } from "./ui";

/** Package tiers as the value argument: total, price per session and what the package saves. */
export function TierTable({ tiers, duration }: { tiers: Tier[]; duration?: number }) {
  return (
    <div>
      <ul className="border-t border-(--gold)/50">
        {tiers.map((t) => (
          <li key={t.label} data-row className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b border-(--line) py-6 md:py-7">
            <span className="f-display text-2xl text-(--cream) md:text-3xl">{t.label}</span>
            <span className="num f-display text-right text-3xl text-(--cream) md:text-4xl">{ron(t.price)}</span>
            <span className="num text-sm text-(--muted)">
              {t.sessions > 1 ? `${ron(t.perSession)} pe ședință` : duration ? `${duration} de minute` : "o singură ședință"}
            </span>
            <span className="num text-right text-sm">
              {t.saving > 0 ? <span className="text-(--gold)">economisești {t.saving}%</span> : <span className="text-(--muted)">preț întreg</span>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

type Media = string | StaticImageData;

/** The treatment's own photos and videos, at their natural proportions in a masonry of columns. */
export function MediaGallery({ media, title }: { media: Media[]; title: string }) {
  const cols = media.length >= 3 ? "sm:columns-2 lg:columns-3" : media.length === 2 ? "sm:columns-2" : "";
  return (
    <div data-stagger className={`columns-1 gap-5 md:gap-6 ${cols} ${media.length === 1 ? "max-w-2xl" : ""}`}>
      {media.map((m, i) =>
        typeof m === "string" ? (
          <figure key={m} className="mb-5 break-inside-avoid overflow-hidden bg-(--espresso-2) md:mb-6">
            <video src={m} controls playsInline preload="metadata" className="block h-auto w-full">
              Dispozitivul tău nu poate reda acest video.
            </video>
          </figure>
        ) : (
          <figure key={m.src} className="zoom mb-5 break-inside-avoid overflow-hidden md:mb-6">
            <Image
              src={m}
              alt={`${title} la Slim & Beauty by MC - imaginea ${i + 1} din ${media.length}`}
              placeholder="blur"
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
              className="block h-auto w-full"
            />
          </figure>
        ),
      )}
    </div>
  );
}

/**
 * FAQ on native <details>: the answers stay in the server HTML the FAQPage JSON-LD describes, and the browser
 * gives keyboard and screen-reader behaviour for free.
 */
export function FaqList({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="border-t border-(--gold)/50">
      {items.map((f) => (
        <details key={f.question} data-row className="faq group border-b border-(--line)">
          <summary className="flex items-start justify-between gap-6 py-6 md:py-8">
            <h3 className="faq-q f-display text-[clamp(1.3rem,2.4vw,1.9rem)] leading-snug font-normal text-(--cream) transition-colors group-hover:text-(--gold)">
              {f.question}
            </h3>
            <Plus className="faq-icon mt-2 shrink-0 text-(--gold)" />
          </summary>
          <p className="max-w-[65ch] pb-8 text-lg leading-relaxed">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}

/** Other treatments from the same category, as photo-led links. */
export function RelatedServices({ items }: { items: PreviewService[] }) {
  return (
    <ul data-stagger className="grid gap-12 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
      {items.map((s) => {
        const from = priceFrom(s);
        return (
          <li key={s.title}>
            <Link href={s.href} className="zoom group block">
              <span className="relative block aspect-[4/5] overflow-hidden">
                <Image src={serviceImage(s)} alt={`Tratament ${s.title} la Slim & Beauty by MC`} fill placeholder="blur" sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="object-cover" />
              </span>
              <span className="mt-6 flex items-baseline justify-between gap-4">
                <span className="f-display text-[1.7rem] leading-tight text-(--cream) transition-colors group-hover:text-(--gold)">{s.title}</span>
                <span className="num shrink-0 text-sm text-(--muted)">{from === null ? "La evaluare" : `de la ${ron(from)}`}</span>
              </span>
              <span className="mt-3 block text-base leading-relaxed">{s.short}</span>
              <span className="link-u mt-4 inline-flex items-center gap-3 text-sm text-(--gold)">
                Vezi tratamentul <Arrow />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
