'use client';
import dynamic from 'next/dynamic';
const FeaturedServices = dynamic(() => import('@/components/home/featured/featured_treatments'), { ssr: false });
const WhyChooseUs = dynamic(() => import('@/components/home/why-choose-us/why-choose-us'), { ssr: false });
const Testimonials = dynamic(() => import('@/components/home/testimonials'), { ssr: false });
const BeforeAfterGallery = dynamic(() => import('@/components/home/before_after'), { ssr: false });
const BookingPricing = dynamic(() => import('@/components/home/booking_pricing'), { ssr: false });
const ContactLocation = dynamic(() => import('@/components/home/contact'), { ssr: false });

export default function HomeRest() {
  return (
    <>
      <FeaturedServices />
      <WhyChooseUs />
      <Testimonials />
      <BeforeAfterGallery />
      <BookingPricing />
      <ContactLocation />
    </>
  )
}