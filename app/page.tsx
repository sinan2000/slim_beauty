import Script from 'next/script'
import { homeMetadata } from '@/lib/metadatas'
import { homePagejsonLd } from '@/lib/jsonLds'
import Hero from '@/components/home/hero'
import FeaturedServices from '@/components/home/featured_treatments'
import WhyChooseUs from '@/components/home/why-choose-us'
import Testimonials from '@/components/home/testimonials2'

export const metadata = homeMetadata

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <FeaturedServices />
      <WhyChooseUs />
      <Testimonials />
      {/* }
        <AHero />
        <BodyCare />
        <FaceCare />
        <Testimonials />
        <FacebookPostsCarousel />
        {/* 
        <div id="rezervare" className="py-5">
          <BookingForm />
        </div>
        <Contact />
        */}
      <Script
        id="first-page-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePagejsonLd) }}
      />
    </main>
  )
}