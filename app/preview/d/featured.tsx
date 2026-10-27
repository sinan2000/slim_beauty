import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { findService, photos, type PreviewService } from "../_shared/content";
import { FeaturedTrack } from "./anim/featured-track";
import { Arrow, ron } from "./ui";

const featured: { service: PreviewService; image: StaticImageData; alt: string; position: string; line: string }[] = [
  {
    service: findService("VShape Anticelulitic"),
    image: photos.vshapeDark,
    alt: "Aplicatorul VShape pe piele, în timpul unei ședințe anticelulitice",
    position: "50% 55%",
    line: "Radiofrecvență care lucrează în profunzime: stimulează colagenul, activează circulația și netezește aspectul de coajă de portocală.",
  },
  {
    service: findService("Criolipoliză"),
    image: photos.crioSession,
    alt: "Clientă întinsă în timpul unei ședințe de criolipoliză, cu aplicatoarele pe abdomen",
    position: "50% 45%",
    line: "Răcire controlată pentru grăsimea localizată care nu pleacă nici cu dieta, nici cu sala.",
  },
  {
    service: findService("Bronzare Organică DHA"),
    image: photos.bronzBack,
    alt: "Bronz organic uniform pe spatele unei cliente",
    position: "50% 30%",
    line: "Un bronz uniform, fără soare și fără solar, aplicat în salon în aproximativ douăzeci de minute.",
  },
];

function perSession(price: number, label: string) {
  const n = Number.parseInt(label, 10);
  return Number.isFinite(n) && n > 1 ? Math.round(price / n) : null;
}

function Panel({ item }: { item: (typeof featured)[number] }) {
  const { service } = item;
  return (
    <article className="grid shrink-0 gap-8 md:h-[min(74vh,42rem)] md:w-[min(84vw,76rem)] md:grid-cols-[1.05fr_1fr] md:gap-12">
      <div className="relative aspect-[4/5] overflow-hidden md:aspect-auto md:h-full">
        {/* The photo is a little wider than its frame and drifts against the track as it travels (see .feat-photo). */}
        <div className="feat-photo absolute inset-y-0 -inset-x-[8%]">
          <Image
            src={item.image}
            alt={item.alt}
            fill
            placeholder="blur"
            sizes="(min-width: 768px) 46vw, 100vw"
            className="object-cover"
            style={{ objectPosition: item.position }}
          />
        </div>
      </div>
      <div className="flex flex-col justify-between gap-10 md:py-2">
        <div>
          <h3 className="f-display text-[clamp(2.4rem,4.6vw,4.6rem)] leading-[0.98] tracking-[-0.02em] text-(--cream)">{service.title}</h3>
          <p className="mt-6 max-w-[42ch] text-lg leading-relaxed">{item.line}</p>
          {service.duration ? <p className="mt-3 text-sm text-(--muted)">Ședința durează {service.duration} de minute.</p> : null}
        </div>
        <div>
          <table className="num w-full border-t border-(--gold)/40 text-left">
            <caption className="sr-only">Prețuri {service.title}</caption>
            <tbody>
              {service.tiers.map((tier) => {
                const each = perSession(tier.price, tier.label);
                return (
                  <tr key={tier.label} className="border-b border-(--line)">
                    <th scope="row" className="py-3.5 font-normal text-(--cream-dim)">
                      {tier.label}
                    </th>
                    <td className="py-3.5 text-sm text-(--muted)">{each ? `${each} RON / ședință` : ""}</td>
                    <td className="f-display py-3.5 text-right text-2xl text-(--cream)">{ron(tier.price)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Link href={service.href} className="link-u mt-6 inline-flex items-center gap-3 text-(--gold)">
            Află tot despre {service.title} <Arrow />
          </Link>
        </div>
      </div>
    </article>
  );
}

/** Static markup for the featured run; the pinning and horizontal travel live in `anim/featured-track`. */
export function Featured() {
  return (
    <FeaturedTrack labelledBy="semnatura">
      <div className="flex shrink-0 flex-col justify-end md:w-[min(32vw,28rem)] md:pb-2">
        <h2 id="semnatura" className="f-display text-[clamp(2.6rem,5vw,4.8rem)] leading-[1] tracking-[-0.02em] text-(--cream)">
          Tratamentele pentru care <span className="italic text-(--gold)">ne caută</span> clientele
        </h2>
        <p className="mt-6 max-w-[34ch] text-lg leading-relaxed">
          Prețuri reale, afișate. Cu cât iei mai multe ședințe în pachet, cu atât plătești mai puțin pe fiecare.
        </p>
      </div>
      {featured.map((item) => (
        <Panel key={item.service.title} item={item} />
      ))}
    </FeaturedTrack>
  );
}
