import AHero from '@/components/landing_page/hero'
import BodyCare from '@/components/landing_page/body_care'
import FaceCare from '@/components/landing_page/face_care'
import Testimonials from '@/components/landing_page/testimonials'
import FacebookPostsCarousel from '@/components/landing_page/gallery'
import type { Metadata } from 'next'
import { WithContext, LocalBusiness } from 'schema-dts'
import Script from 'next/script'
import dynamic from 'next/dynamic'
import LoadingPage from './loading'

const BookingForm = dynamic(() => import('@/components/landing_page/booking_form'), {
  loading: () => <LoadingPage />,
})

const Contact = dynamic(() => import('@/components/landing_page/contact'), {
  loading: () => <LoadingPage />,
  ssr: false,
})

export const metadata: Metadata = {
  description: "Descoperă servicii dermato-cosmetice de top și proceduri de remodelare corporală la Slim & Beauty by MC în Dumbrăvița. Fie că este vorba despre tratamente faciale, conturare corporală sau rejuvenarea pielii, suntem aici pentru a te ajuta să arăți și să te simți la cel mai bun nivel.",
  keywords: ['Slim & Beauty by MC', 'remodelare corporală', 'dermato-cosmetică', 'Dumbrăvița', 'România', "Timișoara", "tratamente faciale", "îngrijirea pielii", "tratament de frumusețe"],
  authors: [{ name: "Slim & Beauty by MC", url: "https://www.slimandbeauty.ro" }],
  openGraph: {
    title: "Slim & Beauty by MC - Remodelare corporală și dermato-cosmetică",
    description: "Slim & Beauty by MC oferă o gamă largă de proceduri profesionale dermato-cosmetice și de remodelare corporală în Dumbrăvița, România. Obține-ți obiectivele de frumusețe cu tratamentele noastre experte.",
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

export default function HomePage() {
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
    description: 'Slim & Beauty by MC oferă servicii profesionale dermato-cosmetice și proceduri de remodelare corporală în Dumbrăvița.',
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
    areaServed: 'Dumbrăvița, Timișoara, România',
    brand: {
      '@type': 'Brand',
      name: 'Slim & Beauty by MC'
    },
    logo: 'https://www.slimandbeauty.ro/logo.jpg',
    makesOffer: {
      '@type': 'Offer',
      name: 'Dermato-Cosmetice și Remodelare Corporală',
      priceCurrency: 'RON'
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FDF8F5]">
      <main className="flex-grow">
        <AHero />
        <BodyCare />
        <FaceCare />
        <Testimonials />
        <FacebookPostsCarousel />
        <div id="rezervare" className="py-5">
          <BookingForm />
        </div>
        <Contact />
      </main>
      <Script
        id="first-page-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  )
}