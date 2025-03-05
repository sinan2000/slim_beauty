import type { Metadata } from "next";
import { services } from "./data";
import { getMetadataImage, normalizeString } from "./utils";
import { notFound } from "next/navigation";

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
  openGraph: {
    siteName: "Slim & Beauty by MC",
    images: [
      {
        url: "https://www.slimandbeauty.ro/logo-og.png",
        alt: "Logo Slim & Beauty by MC Logo",
        width: 1200,
        height: 629
      }
    ],
    locale: "ro_RO",
    type: "website",
  },
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
  openGraph: {
    title: "Remodelare Corporală Timișoara & Dumbrăvița | Slim & Beauty",
    description: "Remodelare corporală în Timișoara și Dumbrăvița! Slim & Beauty oferă tratamente avansate de slăbire localizată, masaj anticelulitic și dermato-cosmetică.",
    url: "https://www.slimandbeauty.ro",
  },
}

export const servicesPageMeta: Metadata = {
  title: "Tratamente Corporale & Faciale | Slim & Beauty Timișoara",
  description: "La Slim & Beauty Timișoara, oferim remodelare corporală și tratamente dermato-cosmetice personalizate pentru un corp și un ten sănătos.",
  openGraph: {
    title: "Tratamente Corporale & Faciale | Slim & Beauty Timișoara",
    description: "La Slim & Beauty Timișoara, oferim remodelare corporală și tratamente dermato-cosmetice personalizate pentru un corp și un ten sănătos.",
    url: "https://www.slimandbeauty.ro/servicii",
  }
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
    openGraph: {
      title: cat.metaTitle,
      description: cat.metaDesc,
      url: `https://www.slimandbeauty.ro/servicii/${category}`,
      images: [
        {
          url: `https://www.slimandbeauty.ro${cat.media.src}`,
          alt: "Photo of " + cat.category,
        },
        {
          url: "https://www.slimandbeauty.ro/logo-og.png",
          alt: "Logo Slim & Beauty by MC Logo",
          width: 1200,
          height: 629
        }
      ],
    }
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
    description: serviceData.mediumDescription + " Programează-te acum la Slim & Beauty!",
    openGraph: {
      title: `${serviceData.title} - ${categoryData.category} | Slim & Beauty`,
      description: serviceData.mediumDescription + " Programează-te acum la Slim & Beauty!",
      images: [
        {
          url: getMetadataImage(serviceData.media),
          alt: "Photo of " + serviceData.title,
        }
      ]
    }
  }
}