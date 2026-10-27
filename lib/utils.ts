import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { services } from "./data"
import { StaticImageData } from "next/image";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function oldSlug(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-');
};

export function normalizeString(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\s\[\](){}]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getFeaturedServices() {
  return services.flatMap(category =>
    category.items
      .filter(item => item.featured === true)
      .map(({ title, featuredDesc, media, price, duration }) => ({
        name: title,
        description: featuredDesc,
        image: media?.[0] ?? "/placeholder.jpg",
        price: price[0],
        duration: duration,
        href: `/servicii/${normalizeString(category.category)}/${normalizeString(title)}`,
      }))
  );
}

export function getFirstImage(media: (string | StaticImageData)[] | undefined) {
  if (!media) {
    return "/placeholder.svg";
  }
  for (const item of media) {
    if (typeof item !== "string") {
      return item;
    }
  }
  return "/placeholder.svg";
}

/** Returns the first real image (skipping video paths) so OG tags can carry its true dimensions. */
export function getMetadataImage(media: (string | StaticImageData)[] | undefined) {
  if (!media || media.length === 0) {
    return undefined;
  }

  for (const item of media) {
    if (typeof item !== "string") {
      return item;
    }
  }

  return undefined;
}

export const sessions = (index: number, isCrio: boolean) =>
  index === 0
    ? 1
    : index === 1
      ? isCrio
        ? 2
        : 6
      : isCrio
        ? 3
        : 10;