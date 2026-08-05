import type { Metadata } from "next";
import type { StaticImageData } from "next/image";
import { services } from "./data";
import { getMetadataImage, normalizeString } from "./utils";
import { notFound } from "next/navigation";

const SITE_NAME = "Slim & Beauty by MC";

const defaultOgImage = {
  url: "/logo-og.png",
  alt: "Logo Slim & Beauty by MC",
  width: 1200,
  height: 629,
};

/**
 * `path` and image urls are left relative on purpose - Next resolves them
 * against `metadataBase` (see rootMeta), so the domain lives in one place.
 */
function generateOG(
  title: string,
  description: string,
  path: string = "/",
  photo?: StaticImageData,
  alt?: string
) {
  return {
    siteName: SITE_NAME,
    title,
    description,
    url: path,
    locale: "ro_RO",
    type: "website",
    images: [
      photo
        ? {
          url: photo.src,
          alt: alt ? `${alt} la Slim & Beauty by MC` : defaultOgImage.alt,
          width: photo.width,
          height: photo.height,
        }
        : defaultOgImage,
    ],
  };
}

export const rootMeta: Metadata = {
  metadataBase: new URL("https://www.slimandbeauty.ro"),
  title: {
    default: "Remodelare Corporală Timișoara & Dumbrăvița | Slim & Beauty",
    template: "%s",
  },
  keywords: ['remodelare corporală Timișoara', 'remodelare corporală Dumbrăvița', 'tratament anticelulitic Timișoara', 'masaj anticelulitic', 'bronzare organică', 'dermato-cosmetică profesională', 'tratament facial Timisoara', 'slabire localizata', 'salon remodelare corporala Timisoara'],
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow",
  },
  authors: [{ name: "Slim & Beauty by MC", url: "https://www.slimandbeauty.ro" }],
  creator: "Slim & Beauty",
  publisher: "Slim & Beauty",
  applicationName: "Salon Remodelare Corporală Slim & Beauty by MC",
  appleWebApp: {
    title: "Salon Remodelare Corporală Slim & Beauty by MC",
    statusBarStyle: "default",
    capable: true,
  },
}

export const homePageMeta: Metadata = {
  title: "Remodelare Corporală Timișoara & Dumbrăvița | Slim & Beauty",
  description: "Remodelare corporală în Timișoara și Dumbrăvița! Slim & Beauty oferă tratamente avansate de slăbire localizată, masaj anticelulitic și dermato-cosmetică.",
  openGraph: generateOG(
    "Remodelare Corporală Timișoara & Dumbrăvița | Slim & Beauty",
    "Remodelare corporală în Timișoara și Dumbrăvița! Slim & Beauty oferă tratamente avansate de slăbire localizată, masaj anticelulitic și dermato-cosmetică."
  ),
  alternates: {
    canonical: "/",
  }
}

export const servicesPageMeta: Metadata = {
  title: "Tratamente Corporale & Faciale | Slim & Beauty Timișoara",
  description: "La Slim & Beauty Timișoara, oferim remodelare corporală și tratamente dermato-cosmetice personalizate pentru un corp și un ten sănătos.",
  openGraph: generateOG(
    "Tratamente Corporale & Faciale | Slim & Beauty Timișoara",
    "La Slim & Beauty Timișoara, oferim remodelare corporală și tratamente dermato-cosmetice personalizate pentru un corp și un ten sănătos.",
    "/servicii"
  ),
  alternates: {
    canonical: "/servicii",
  }
}

export async function categoryPageMeta({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;

  const cat = services.find((i) => normalizeString(i.category) === category);

  if (!cat) {
    notFound();
  }

  return {
    title: cat.metaTitle,
    description: cat.metaDesc,
    openGraph: generateOG(
      cat.metaTitle,
      cat.metaDesc,
      `/servicii/${category}`,
      cat.media,
      cat.category
    ),
    alternates: {
      canonical: `/servicii/${category}`,
    },
  }
}

export async function detailPageMeta({ params }: { params: Promise<{ category: string; service: string }> }): Promise<Metadata> {
  const { category, service } = await params;

  const categoryData = services.find((item) => normalizeString(item.category) === category);
  if (!categoryData) {
    notFound();
  }

  const serviceData = categoryData.items.find((item) => normalizeString(item.title) === service);

  if (!serviceData) {
    notFound();
  }

  const title = `${serviceData.title} - ${categoryData.category} | Slim & Beauty`;
  const description = truncate(serviceData.mediumDescription + " Programează-te acum la Slim & Beauty!");

  return {
    title,
    description,
    openGraph: generateOG(
      title,
      description,
      `/servicii/${category}/${service}`,
      getMetadataImage(serviceData.media),
      serviceData.title
    ),
    alternates: {
      canonical: `/servicii/${category}/${service}`,
    },
  }
}

export const notFoundMeta: Metadata = {
  title: "404 - Pagina nu a fost găsită | Slim & Beauty",
  description: "Pagina pe care o căutați nu a fost găsită. Vă rugăm să verificați URL-ul și să încercați din nou.",
  openGraph: generateOG(
    "404 - Pagina nu a fost găsită | Slim & Beauty",
    "Pagina pe care o căutați nu a fost găsită. Vă rugăm să verificați URL-ul și să încercați din nou."
  ),
  robots: {
    index: false,
    follow: false,
  }
}

function truncate(text: string) {
  return text.length > 160
    ? text.slice(0, 160 - 3) + "..."
    : text;
}
