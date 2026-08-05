import { homePageMeta } from '@/lib/metadatas'
import Hero from '@/components/home/hero/hero'
import FeaturedServices from '@/components/home/featured/featured_treatments'
import WhyChooseUs from '@/components/why-choose-us'
import Testimonials from '@/components/home/testimonials'
import BeforeAfterGallery from '@/components/home/before_after'
import NoBookingPricing from '@/components/home/pricing_no_booking'
import ContactLocation from '@/components/home/contact'
import { generateFAQSchema } from '@/lib/jsonLds'
import { faqs } from '@/lib/data'

export const metadata = homePageMeta

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <script
        id="contact-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />

      <Hero />
      <FeaturedServices />
      <WhyChooseUs />
      <Testimonials />
      <BeforeAfterGallery />
      <NoBookingPricing />
      <ContactLocation />
    </main>
  )
}
