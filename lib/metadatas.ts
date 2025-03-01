import type { Metadata } from "next";

export const homeMetadata: Metadata = {
  title: "Remodelare Corporală în Dumbrăvița - Slim & Beauty",
  description: "Descoperă tratamente de remodelare corporală, masaj anticelulitic și bronzare organică la Slim & Beauty by MC, Dumbrăvița. Servicii dermato-cosmetice personalizate.",
  keywords: ['remodelare corporală', 'tratament anticelulitic', 'masaj anticelulitic', 'bronzare organică', 'dermato-cosmetică', 'tratament facial', 'slabire localizata', 'Dumbrăvița', 'Timișoara'],
  authors: [{ name: "Slim & Beauty by MC", url: "https://www.slimandbeauty.ro" }],
  openGraph: {
    title: "Remodelare Corporală în Dumbrăvița - Slim & Beauty",
    description: "Descoperă tratamente de remodelare corporală, masaj anticelulitic și bronzare organică la Slim & Beauty by MC, Dumbrăvița. Servicii dermato-cosmetice personalizate.",
    url: "https://www.slimandbeauty.ro",
    siteName: "Slim & Beauty by MC",
    images: [
      {
        url: "https://www.slimandbeauty.ro/logo.jpg",
        alt: "Logo Slim & Beauty by MC",
      }
    ],
    locale: "ro_RO",
    type: "website",
  },
  robots: {
    follow: true,
    index: true,
  }
}