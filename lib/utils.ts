import { StaticImageData } from "next/image";

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