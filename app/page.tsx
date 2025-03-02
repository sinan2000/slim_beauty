import Script from 'next/script'
import { homeMetadata } from '@/lib/metadatas'
import { homePagejsonLd } from '@/lib/jsonLds'
import Hero from '@/components/home/hero'
import FeaturedServices from '@/components/home/featured_treatments'
import WhyChooseUs from '@/components/home/why-choose-us'
import Testimonials from '@/components/home/testimonials'
import BeforeAfterGallery from '@/components/home/before_after'
import BookingPricing from '@/components/home/booking_pricing'
import ContactLocation from '@/components/home/contact'

export const metadata = homeMetadata

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <FeaturedServices />
      <WhyChooseUs />
      <Testimonials />
      <BeforeAfterGallery />
      <BookingPricing />
      <ContactLocation />
      
      <Script
        id="first-page-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePagejsonLd) }}
      />
    </main>
  )
}