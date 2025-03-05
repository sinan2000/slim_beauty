import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { services } from "./data"
import { StaticImageData } from "next/image";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const romanianCharMap: { [key: string]: string } = {
  'ă': 'a',
  'â': 'a',
  'î': 'i',
  'ș': 's',
  'ț': 't',
  'Ă': 'A',
  'Â': 'A',
  'Î': 'I',
  'Ș': 'S',
  'Ț': 'T'
};

export function mapRomanianChars(input: string) {
  return input.replace(/[ăâîșțĂÂÎȘȚ]/g, match => romanianCharMap[match]);
}

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
        duration: duration
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

export function getMetadataImage(media: (string | StaticImageData)[] | undefined) {
  if (!media || media.length === 0) {
    return '/logo-og.png';
  }

  for (const item of media) {
    if (typeof item !== "string") {
      return item.src;
    }
  }

  return '/logo-og.png';
}