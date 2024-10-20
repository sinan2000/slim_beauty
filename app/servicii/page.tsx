import TempPage from './temp';
import { services } from '@/lib/data'
import type { Metadata } from 'next';
import { WithContext, LocalBusiness, Offer } from 'schema-dts';
import Script from 'next/script'
import { normalizeString } from '@/lib/utils';

export const metadata: Metadata = {
  title: "Servicii de Remodelare Corporală și Dermato-Cosmetică - Slim & Beauty",
  description: "Descoperă servicii de remodelare corporală și dermato-cosmetică la Slim & Beauty by MC: VShape, Criolipoliză, EMSlim Neo RF și multe altele pentru un corp tonifiat.",
  keywords: ['Slim & Beauty by MC', 'remodelare corporală', 'tratament anticelulitic', 'criopoliză', 'dermato-cosmetică', 'tratament facial', 'îngrijire piele Dumbrăvița', 'Timișoara tratamente estetice', 'EMSlim Neo RF'],
  authors: [{ name: "Slim & Beauty by MC", url: "https://www.slimandbeauty.ro" }],
  openGraph: {
    title: "Servicii de Remodelare Corporală și Dermato-Cosmetică - Slim & Beauty",
    description: "Descoperă servicii de remodelare corporală și dermato-cosmetică la Slim & Beauty by MC: VShape, Criolipoliză, EMSlim Neo RF și multe altele pentru un corp tonifiat.",
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
      '@context': 'https://schema.org',
      '@type': 'Offer',
      name: item.title,
      description: item.shortDescription,
      priceCurrency: 'RON',
      price: 'Consult',
      priceRange: '$$',
      url: `https://www.slimandbeauty.ro/servicii/${normalizeString(category.category)}/${normalizeString(item.title)}`,
      availability: 'https://schema.org/InStock',
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
    currenciesAccepted: 'RON',
    paymentAccepted: 'Cash',
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Thursday',
        ],
        opens: '12:00',
        closes: '20:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Wednesday',
          'Friday',
        ],
        opens: '09:00',
        closes: '17:00'
      }
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      reviewCount: '15'
    },
    areaServed: {
      '@type': 'Place',
      name: 'Dumbrăvița, Timișoara, România',
    },
    brand: {
      '@type': 'Brand',
      name: 'Slim & Beauty by MC'
    },
    makesOffer: offer as WithContext<Offer>[],
    sameAs: [
      "https://www.facebook.com/SalonSlimBeautyByMc",
      "https://www.instagram.com/slimandbeautybymc/"
    ]
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