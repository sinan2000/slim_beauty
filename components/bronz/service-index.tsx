import Image from "next/image";
import Link from "next/link";
import { categories as allCategories, priceFrom, ron, serviceImage, type PreviewService } from "@/lib/site-content";
import { HoverPreview } from "./hover-preview";

type Category = (typeof allCategories)[number];

function priceLabel(s: PreviewService) {
  const from = priceFrom(s);
  return from === null ? "La evaluare" : ron(from);
}

/**
 * Every treatment as a price list: title, packages, duration and the single-session price. On a mouse, hovering a
 * row floats that treatment's photo under the cursor (`HoverPreview`); on phones each row carries a thumbnail.
 * `withDescriptions` adds each treatment's short description under its name (category pages).
 */
export function ServiceIndex({
  categories = allCategories,
  withDescriptions = false,
  showCategoryHeads = true,
  headingLevel = 3,
}: {
  categories?: Category[];
  withDescriptions?: boolean;
  showCategoryHeads?: boolean;
  /** Level of the category heads; treatment names sit one level below them. */
  headingLevel?: 2 | 3;
}) {
  const flat = categories.flatMap((c) => c.services);
  const items = flat.map((s) => ({ image: serviceImage(s), price: priceLabel(s) }));
  const CatHead = `h${headingLevel}` as const;
  const RowHead = showCategoryHeads ? (`h${headingLevel + 1}` as "h3" | "h4") : (`h${headingLevel}` as "h2" | "h3");

  return (
    <HoverPreview items={items}>
      {categories.map((cat) => (
        <div key={cat.name} className="mt-16 first:mt-0 md:mt-24">
          {showCategoryHeads ? (
            <div className="flex items-baseline justify-between gap-4 border-b border-(--gold)/50 pb-4">
              <CatHead className="f-display text-2xl text-(--gold) italic md:text-3xl">{cat.name}</CatHead>
              <Link href={cat.href} className="link-u shrink-0 text-sm text-(--muted) hover:text-(--cream)">
                Vezi categoria
              </Link>
            </div>
          ) : (
            <div className="border-b border-(--gold)/50" />
          )}
          <ul>
            {cat.services.map((s) => (
              <li key={s.title} data-row className="border-b border-(--line)">
                <Link
                  href={s.href}
                  data-preview={flat.indexOf(s)}
                  className="row group grid grid-cols-[3.5rem_1fr] items-center gap-x-4 gap-y-2 py-5 md:grid-cols-[1fr_7rem_10rem] md:gap-x-8 md:py-7"
                >
                  <span className="relative row-span-2 size-14 self-start overflow-hidden md:hidden">
                    <Image src={serviceImage(s)} alt="" fill sizes="56px" className="object-cover" />
                  </span>
                  <span className="min-w-0">
                    <RowHead className="row-title f-display block text-[clamp(1.45rem,3.4vw,3rem)] leading-[1.04] font-normal text-(--cream)">
                      {s.title}
                      {s.isNew ? (
                        <span className="f-body ml-3 inline-block translate-y-[-0.35em] rounded-full border border-(--gold)/60 px-2.5 py-0.5 align-middle text-[0.65rem] font-semibold tracking-[0.18em] text-(--gold) not-italic uppercase">
                          Nou
                        </span>
                      ) : null}
                    </RowHead>
                    {withDescriptions ? <span className="mt-3 block max-w-[60ch] text-base leading-relaxed text-(--cream-dim)">{s.short}</span> : null}
                    <span className="num mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-(--muted)">
                      {s.duration ? <span className="md:hidden">{s.duration} min</span> : null}
                      {s.tiers.slice(1).map((t) => (
                        <span key={t.label}>
                          {t.label} · {ron(t.price)}
                        </span>
                      ))}
                      {!s.tiers.length ? <span>Prețul depinde de zonă; îl afli la telefon.</span> : null}
                    </span>
                  </span>
                  <span className="num hidden text-sm text-(--muted) md:block">{s.duration ? `${s.duration} min` : ""}</span>
                  {/* On phones the price sits under the title, so long names never collide with it. */}
                  <span className="num f-display col-start-2 text-xl whitespace-nowrap text-(--cream) md:col-start-auto md:text-right md:text-[1.7rem]">
                    <span className="sr-only"> · </span>
                    {s.tiers.length ? priceLabel(s) : <span className="text-(--gold) italic">La evaluare</span>}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </HoverPreview>
  );
}
