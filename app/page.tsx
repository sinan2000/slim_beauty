import Hero from '@/components/landing_page/hero'
import BodyCare from '@/components/landing_page/body_care'
import FaceCare from '@/components/landing_page/face_care'
import Transformations from '@/components/landing_page/transformations'
import Contact from '@/components/landing_page/contact'
import Footer from '@/components/footer'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDF8F5]">
      <main className="flex-grow pt-[86px]">
        <Hero />
        <BodyCare />
        <FaceCare />
        <Transformations />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}