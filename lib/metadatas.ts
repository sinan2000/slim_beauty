import type { Metadata } from "next";
import { services } from "./data";
import { getMetadataImage, normalizeString } from "./utils";
import { notFound } from "next/navigation";

function generateOG(title: string, description: string, url?: string, photo?: string, alt?: string) {
  return {
    siteName: "Slim & Beauty by MC",
    title,
    description,
    url: url || "https://www.slimandbeauty.ro",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: photo || "https://www.slimandbeauty.ro/logo-og.png",
        alt: alt ? "Photo of " + alt : "Logo Slim & Beauty by MC Logo",
        width: 1200,
        height: 629
      }
    ]
  }
}

export const rootMeta: Metadata = {
  metadataBase: new URL("https://www.slimandbeauty.ro"),
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
    canonical: "https://www.slimandbeauty.ro",
  }
}

export const servicesPageMeta: Metadata = {
  title: "Tratamente Corporale & Faciale | Slim & Beauty Timișoara",
  description: "La Slim & Beauty Timișoara, oferim remodelare corporală și tratamente dermato-cosmetice personalizate pentru un corp și un ten sănătos.",
  openGraph: generateOG(
    "Tratamente Corporale & Faciale | Slim & Beauty Timișoara",
    "La Slim & Beauty Timișoara, oferim remodelare corporală și tratamente dermato-cosmetice personalizate pentru un corp și un ten sănătos.",
    "https://www.slimandbeauty.ro/servicii"
  )
}

export async function categoryPageMeta({ params }: { params: Promise<{ category: string }> }) {
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
      `https://www.slimandbeauty.ro/servicii/${category}`,
      `https://www.slimandbeauty.ro${cat.media.src}`,
      cat.category
    ),
  }
}

export async function detailPageMeta({ params }: { params: Promise<{ category: string; service: string }> }) {
  const { category, service } = await params;

  const categoryData = services.find((item) => normalizeString(item.category) === category);
  if (!categoryData) {
    notFound();
  }

  const serviceData = categoryData.items.find((item) => normalizeString(item.title) === service);

  if (!serviceData) {
    notFound();
  }
  return {
    title: `${serviceData.title} - ${categoryData.category} | Slim & Beauty`,
    description: truncate(serviceData.mediumDescription + " Programează-te acum la Slim & Beauty!"),
    openGraph: generateOG(
      `${serviceData.title} - ${categoryData.category} | Slim & Beauty`,
      truncate(serviceData.mediumDescription + " Programează-te acum la Slim & Beauty!"),
      `https://www.slimandbeauty.ro/servicii/${category}/${service}`,
      getMetadataImage(serviceData.media),
      serviceData.title
    )
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