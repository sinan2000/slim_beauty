import type { Metadata } from "next";

export const homePageMeta: Metadata = {
  title: "Remodelare Corporală Timișoara & Dumbrăvița | Slim & Beauty",
  description: "Remodelare corporală în Timișoara și Dumbrăvița! Slim & Beauty oferă tratamente avansate de slăbire localizată, masaj anticelulitic și dermato-cosmetică.",
  keywords: ['remodelare corporală Timișoara', 'remodelare corporală Dumbrăvița', 'tratament anticelulitic Timișoara', 'masaj anticelulitic', 'bronzare organică', 'dermato-cosmetică profesională', 'tratament facial Timisoara', 'slabire localizata', 'salon remodelare corporala Timisoara'],
  authors: [{ name: "Slim & Beauty by MC", url: "https://www.slimandbeauty.ro" }],
  openGraph: {
    title: "Remodelare Corporală Timișoara & Dumbrăvița | Slim & Beauty",
    description: "Remodelare corporală în Timișoara și Dumbrăvița! Slim & Beauty oferă tratamente avansate de slăbire localizată, masaj anticelulitic și dermato-cosmetică.",
    url: "https://www.slimandbeauty.ro",
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