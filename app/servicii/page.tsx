import TempPage from './temp';
import { services } from '@/lib/data'
import type { Metadata } from 'next';
import { WithContext, LocalBusiness, OfferForPurchase } from 'schema-dts';
import Script from 'next/script'

export const metadata: Metadata = {
  title: "Serviciile Noastre - Slim & Beauty by MC",
  description: "Explorează serviciile noastre profesionale de remodelare corporală și dermato-cosmetică la Slim & Beauty by MC. Descoperă tratamente precum VShape Anticelulitic, Criolipoliză, EMSlim Neo RF și multe altele.",
  keywords: ['Slim & Beauty by MC', 'remodelare corporală', 'dermato-cosmetică', 'servicii de frumusețe', 'tratamente faciale', 'anticelulitic', 'Dumbrăvița', 'Timișoara', 'îngrijirea pielii'],
  authors: [{ name: "Slim & Beauty by MC", url: "https://www.slimandbeauty.ro" }],
  openGraph: {
    title: "Slim & Beauty by MC - Servicii de Remodelare Corporală și Dermato-Cosmetică",
    description: "Slim & Beauty by MC oferă o gamă variată de tratamente pentru îngrijirea pielii și remodelare corporală, inclusiv Criolipoliză, EMSlim Neo RF, și Radiofrecvență Bipolară.",
    url: "https://www.slimandbeauty.ro/servicii",
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

export default function ServicesPage() {
  const offer = services.flatMap((category) =>
    category.items.map((item) => ({
      '@type': 'OfferForPurchase',
      name: item.title,
      description: item.shortDescription,
      priceCurrency: 'RON',
    })));
  const jsonLd: WithContext<LocalBusiness> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Slim & Beauty by MC',
    image: 'https://www.slimandbeauty.ro/logo.jpg',
    '@id': 'https://www.slimandbeauty.ro',
    url: 'https://www.slimandbeauty.ro',
    telephone: '+40733407329',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Strada Petőfi Sándor 101',
      addressLocality: 'Dumbrăvița',
      postalCode: '307160',
      addressCountry: 'RO'
    },
    description: 'Descoperă tratamente inovative pentru îngrijirea pielii și remodelare corporală la Slim & Beauty by MC. Oferim servicii precum Criolipoliză, EMSlim Neo RF și VShape Anticelulitic.',
    areaServed: {
      '@type': 'Place',
      name: 'Dumbrăvița, Timișoara, România',
    },
    brand: {
      '@type': 'Brand',
      name: 'Slim & Beauty by MC'
    },
    makesOffer: offer as WithContext<OfferForPurchase>[],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF8F5] via-[#F5EBE6] to-[#FDF8F5] py-16 px-4 sm:px-6 lg:px-8">
      <TempPage />

      <Script
        id="services-page-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  )
}