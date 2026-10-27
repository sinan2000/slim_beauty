import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { categories, photos, type PreviewService } from "../_shared/content";
import { HoverPreview } from "./anim/hover-preview";
import { ron } from "./ui";

/** Real photos over promo graphics; services without their own photo borrow the facial or the salon room. */
const overrides: Record<string, StaticImageData> = {
  "Criolipoliză": photos.crioRoom,
  "Epilare Definitivă cu Laser Diodă": photos.laserLeg,
  "Bronzare Organică DHA": photos.bronzMirror,
};

function imageFor(s: PreviewService) {
  return overrides[s.title] ?? s.image ?? (s.category.startsWith("Dermato") ? photos.heroFace : photos.salonRoom);
}

function priceLabel(s: PreviewService) {
  return s.tiers.length === 0 ? "La evaluare" : ron(s.tiers[0].price);
}

const flat = categories.flatMap((c) => c.services);
const previewItems = flat.map((s) => ({ image: imageFor(s), price: priceLabel(s) }));

/** Static markup for the price list; the cursor-following photo lives in `anim/hover-preview`. */
export function PriceList() {
  return (
    <section id="preturi" aria-labelledby="meniu" className="grain relative scroll-mt-20 border-y border-(--line) bg-(--espresso-2)">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <h2 id="meniu" className="f-display text-[clamp(2.6rem,6vw,5.6rem)] leading-[0.98] tracking-[-0.025em] text-(--cream) md:col-span-8">
            Toate tratamentele, <span className="italic text-(--gold)">cu prețul la vedere</span>
          </h2>
          <p className="max-w-[40ch] text-base leading-relaxed text-(--muted) md:col-span-4">
            Prețul afișat e pentru o ședință; dedesubt vezi pachetele, care ies mai avantajos. Plata se face cash, în lei.
          </p>
        </div>

        <HoverPreview items={previewItems}>
          {categories.map((cat) => (
            <div key={cat.name} className="mt-16 md:mt-24">
              <div className="flex items-baseline justify-between gap-4 border-b border-(--gold)/50 pb-4">
                <h3 className="f-display text-2xl text-(--gold) italic md:text-3xl">{cat.name}</h3>
                <Link href={cat.href} className="link-u shrink-0 text-sm text-(--muted) hover:text-(--cream)">
                  Vezi categoria
                </Link>
              </div>
              <ul>
                {cat.services.map((s) => (
                  <li key={s.title} className="border-b border-(--line)">
                    <Link
                      href={s.href}
                      data-preview={flat.indexOf(s)}
                      className="row group grid grid-cols-[3.5rem_1fr] items-center gap-x-4 gap-y-2 py-5 md:grid-cols-[1fr_7rem_10rem] md:gap-x-8 md:py-7"
                    >
                      <span className="relative row-span-2 size-14 self-start overflow-hidden md:hidden">
                        <Image src={imageFor(s)} alt="" fill sizes="56px" className="object-cover" />
                      </span>
                      <span className="min-w-0">
                        <span className="row-title f-display block text-[clamp(1.45rem,3.4vw,3rem)] leading-[1.04] text-(--cream)">{s.title}</span>
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
                      {/* On phones the price sits under the title, so long names like "Microdermabraziune" never collide with it. */}
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
      </div>
    </section>
  );
}
