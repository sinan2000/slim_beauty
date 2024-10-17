import Hero from '@/components/landing_page/hero'
import BodyCare from '@/components/landing_page/body_care'
import FaceCare from '@/components/landing_page/face_care'
import Contact from '@/components/landing_page/contact'
import Testimonials from '@/components/landing_page/testimonials'
import BookingForm from '@/components/landing_page/booking_form'
import FacebookPostsCarousel from '@/components/landing_page/gallery'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDF8F5]">
      <main className="flex-grow pt-[86px]">
        <Hero />
        <BodyCare />
        <FaceCare />
        <Testimonials />
        <FacebookPostsCarousel />
        <BookingForm />
        <Contact />
      </main>
    </div>
  )
}