import type { Metadata } from "next";

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
        url: "https://www.slimandbeauty.ro/logo.jpg",
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