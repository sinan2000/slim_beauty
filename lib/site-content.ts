import type { StaticImageData } from "next/image";
import { services } from "@/lib/data";
import { company } from "@/lib/company";
import { normalizeString, sessions } from "@/lib/utils";

import review1 from "@/assets/reviews/1.jpg";
import review2 from "@/assets/reviews/2.jpg";
import review3 from "@/assets/reviews/3.jpg";
import before1 from "@/assets/before_after/before1.png";
import after1 from "@/assets/before_after/after1.png";
// Cropped below the English "Before"/"After" text printed on the originals; the slider labels them in Romanian.
import before2 from "@/assets/before_after/before2-crop.jpg";
import after2 from "@/assets/before_after/after2-crop.jpg";

import heroFace from "@/assets/hero.jpg";
import salonRoom from "@/assets/salon2.jpg";
import mihaela from "@/assets/mihaela.jpg";
import bronzDark from "@/assets/services/bronzare/1.jpg";
import bronzMirror from "@/assets/services/bronzare/2.jpg";
import bronzBack from "@/assets/services/bronzare/3.jpg";
import bronzLine from "@/assets/services/bronzare/5.jpg";
import bronzTent from "@/assets/services/bronzare/7.jpg";
import bronzKit from "@/assets/services/bronzare/4.jpg";
import vshapeDark from "@/assets/services/vshape/1.jpg";
import vshapeDevice from "@/assets/services/vshape/2.jpg";
import crioRoom from "@/assets/services/crio/2.jpg";
import crioSession from "@/assets/services/crio/3.jpg";
import emslimDevice from "@/assets/services/emslim/device.jpg";
import presoLegs from "@/assets/services/preso/1.jpg";
// The laser promo (announce.jpg) cropped below its logo inset, so the photo works full-bleed without printed text.
import laserHero from "@/assets/services/laser/hero.jpg";
import dermaSkin from "@/assets/services/dermapen/skin.jpg";

/**
 * Presentation layer over `lib/data.tsx` for the bronz pages:
 * photos, contact channels, and services flattened with their package maths. It adds no facts of its own.
 */

export const photos = {
  heroFace,
  salonRoom,
  mihaela,
  bronzDark,
  bronzMirror,
  bronzBack,
  bronzLine,
  bronzTent,
  bronzKit,
  vshapeDark,
  vshapeDevice,
  crioRoom,
  crioSession,
  emslimDevice,
  presoLegs,
  laserHero,
  dermaSkin,
} satisfies Record<string, StaticImageData>;

const whatsAppMessage = encodeURIComponent("Bună ziua! Sunt interesată de serviciile dvs. de remodelare corporală.");

export const contact = {
  phone: company.phone,
  phoneHref: company.phoneHref,
  whatsapp: `https://api.whatsapp.com/send?phone=40733407329&text=${whatsAppMessage}`,
  instagram: "https://www.instagram.com/slimandbeautybymc/",
  facebook: "https://www.facebook.com/SalonSlimBeautyByMC",
  tiktok: "https://www.tiktok.com/@slimandbeautymc/",
  address: "Str. Petőfi Sándor nr. 101, Dumbrăvița",
  directions: "https://www.google.com/maps/search/?api=1&query=Slim%20%26%20Beauty%20by%20MC%20Dumbr%C4%83vi%C8%9Ba",
  hours: [
    { days: "Luni, marți, joi", time: "13:00 – 21:00" },
    { days: "Miercuri, vineri", time: "09:00 – 17:00" },
    { days: "Sâmbătă, duminică", time: "Închis" },
  ],
} as const;

/** Package labels the service detail page uses: criolipoliză is sold in 1/2/3, everything else in 1/6/10. */
function tierLabels(title: string) {
  return title === "Criolipoliză" ? ["o ședință", "2 ședințe", "3 ședințe"] : ["o ședință", "6 ședințe", "10 ședințe"];
}

export type Tier = {
  label: string;
  price: number;
  sessions: number;
  perSession: number;
  /** Percent saved per session against the single-session price; 0 for the single session. */
  saving: number;
};

export type PreviewService = {
  title: string;
  category: string;
  categorySlug: string;
  slug: string;
  href: string;
  short: string;
  medium: string;
  featured: boolean;
  isNew: boolean;
  duration?: number;
  /** Empty when the salon prices after an evaluation (laser). */
  tiers: Tier[];
  image?: StaticImageData;
};

export const allServices: PreviewService[] = services.flatMap((category) =>
  category.items.map((item) => {
    const labels = tierLabels(item.title);
    const isCrio = item.title === "Criolipoliză";
    const media = (item.media ?? []) as (StaticImageData | string)[];
    const image = media.find((m): m is StaticImageData => typeof m !== "string");
    const categorySlug = normalizeString(category.category);
    const slug = normalizeString(item.title);
    return {
      title: item.title,
      category: category.category,
      categorySlug,
      slug,
      href: `/servicii/${categorySlug}/${slug}`,
      short: item.shortDescription,
      medium: item.mediumDescription,
      featured: Boolean(item.featured),
      isNew: "isNew" in item && Boolean(item.isNew),
      duration: "duration" in item ? (item.duration as number | undefined) : undefined,
      tiers: item.price.map((price, i) => {
        const count = sessions(i, isCrio);
        const perSession = Math.round(price / count);
        return { label: labels[i], price, sessions: count, perSession, saving: i === 0 ? 0 : Math.round(100 - (price / count / item.price[0]) * 100) };
      }),
      image,
    };
  }),
);

/**
 * Best real photograph for a service. Some services lead with a promo graphic (criolipoliză, laser) and some have
 * no media at all, so those borrow a neutral photo of the salon's own rooms rather than another device's shot.
 */
const photoOverrides: Record<string, StaticImageData> = {
  "Criolipoliză": crioRoom,
  "Epilare Definitivă cu Laser Diodă": laserHero,
  "Bronzare Organică DHA": bronzDark,
  "EMSlim Neo RF": emslimDevice,
};

/** The treatment the salon is putting forward: featured and new (laser, since October 2026). Lists open with it. */
export const spotlight = allServices.find((s) => s.featured && s.isNew);

export function serviceImage(s: PreviewService) {
  return photoOverrides[s.title] ?? s.image ?? (s.category.startsWith("Dermato") ? heroFace : salonRoom);
}

export function priceFrom(s: PreviewService) {
  return s.tiers.length === 0 ? null : s.tiers[0].price;
}

export const ron = (n: number) => `${n.toLocaleString("ro-RO")} RON`;

/**
 * Per category: `hero` is the dark, wide photo behind the category page's title; `photo` is the portrait used
 * where the category is a tile. Both are the strongest real images in the group.
 */
const categoryPhotos: Record<string, { hero: StaticImageData; photo: StaticImageData }> = {
  "Remodelare Corporală": { hero: vshapeDark, photo: bronzBack },
  "Dermato Cosmetică": { hero: heroFace, photo: heroFace },
};

export const categories = services.map((c) => ({
  name: c.category,
  slug: normalizeString(c.category),
  href: `/servicii/${normalizeString(c.category)}`,
  description: c.description,
  hero: categoryPhotos[c.category]?.hero ?? (c.media as StaticImageData),
  photo: categoryPhotos[c.category]?.photo ?? (c.media as StaticImageData),
  services: allServices.filter((s) => s.category === c.category),
}));

/** Up to `n` other services from the same category, starting after this one so each page shows a different set. */
export function relatedServices(s: PreviewService, n = 3) {
  const group = allServices.filter((x) => x.category === s.category);
  const at = group.findIndex((x) => x.title === s.title);
  return Array.from({ length: Math.min(n, group.length - 1) }, (_, i) => group[(at + 1 + i) % group.length]);
}

export function whatsappFor(title: string) {
  const text = encodeURIComponent(`Bună ziua! Sunt interesată de ${title}. Aș dori mai multe detalii și o programare.`);
  return `https://api.whatsapp.com/send?phone=40733407329&text=${text}`;
}

export function findService(title: string) {
  const found = allServices.find((s) => s.title === title);
  if (!found) throw new Error(`Unknown service: ${title}`);
  return found;
}

export const reviews = [
  {
    name: "Manuela Lucia Albu",
    image: review1,
    url: "https://www.facebook.com/rochiide.inchiriat.1/posts/pfbid026wEeoNRfMzHMTYhew6vdnwgVokvL2PhXWptjmHiW8tDyvMF2Vo4fbrmFivzsiphGl",
    quote: "Personalul foarte prietenos si aparatura moderna, recomand cu mare drag",
  },
  {
    name: "Irina Brehui",
    image: review2,
    url: "https://www.facebook.com/irina.brehui.1/posts%2Fpfbid0fN44vwNTB4FjUgFnpgyiEpZN1LCAietbzYpYRUn6QPFscjhbYo9aYrZ8Qk7WaWkul",
    quote: "Un salon ff fain, cu atmosfera plăcută și personal prietenos, dar în același timp și foarte profi. Recomand cu cea mai mare caldura!",
  },
  {
    name: "Adina Filip",
    image: review3,
    url: "https://www.facebook.com/adina.filip.9/posts/pfbid02JGTnX2RNHpRKMsvV8NQxdgENaXQxRF11F7wUqgNmUb8kBgtrvnc6encvhVEDYrrRl",
    quote: "Oamenii sfințesc locul, iar locul arata minunat. Revin mereu cu drag la voi",
  },
];

/** The only outcome proof the salon has. Never extend with stock or generated imagery. */
export const beforeAfter = [
  { label: "Tratament facial", before: before1, after: after1 },
  { label: "Remodelare corporală", before: before2, after: after2 },
];

/** Claims already published on the live site; nothing beyond these. */
export const facts = {
  years: "10+",
  yearsLabel: "ani de experiență",
  rating: "4,7",
  ratingCount: 15,
  owner: "Mihaela Ceviker",
};
