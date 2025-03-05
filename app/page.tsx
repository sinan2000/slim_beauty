import { homePageMeta } from '@/lib/metadatas'
import Hero from '@/components/home/hero/hero'
import FeaturedServices from '@/components/home/featured/featured_treatments'
import WhyChooseUs from '@/components/home/why-choose-us/why-choose-us'
import Testimonials from '@/components/home/testimonials'
import BeforeAfterGallery from '@/components/home/before_after'
import BookingPricing from '@/components/home/booking_pricing'
import ContactLocation from '@/components/home/contact'

export const metadata = homePageMeta

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
    </main>
  )
}