"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Link from 'next/link';
import review1 from "@/assets/reviews/1.jpg"
import review2 from "@/assets/reviews/2.jpg"
import review3 from "@/assets/reviews/3.jpg"
import bgpict from "@/assets/testimonials.jpg"

const testimonials = [
  {
    url: 'https://www.facebook.com/rochiide.inchiriat.1/posts/pfbid026wEeoNRfMzHMTYhew6vdnwgVokvL2PhXWptjmHiW8tDyvMF2Vo4fbrmFivzsiphGl',
    name: 'Manuela Lucia Albu',
    imageAlt: 'Imagine de profil a Manuelei Lucia Albu, recenzie facebook Slim & Beauty by MC',
    image: review1,
    quote: 'Personalul foarte prietenos si aparatura moderna,recomand cu mare drag'
  },
  {
    url: 'https://www.facebook.com/irina.brehui.1/posts%2Fpfbid0fN44vwNTB4FjUgFnpgyiEpZN1LCAietbzYpYRUn6QPFscjhbYo9aYrZ8Qk7WaWkul',
    name: 'Irina Brehui',
    imageAlt: 'Imagine de profil a Irinei Brehui, recenzie facebook Slim & Beauty by MC',
    image: review2,
    quote: 'Un salon ff fain, cu atmosfera plăcută și personal prietenos, dar în același timp și foarte profi. Recomand cu cea mai mare caldura! 👌'
  },
  {
    url: 'https://www.facebook.com/adina.filip.9/posts/pfbid02JGTnX2RNHpRKMsvV8NQxdgENaXQxRF11F7wUqgNmUb8kBgtrvnc6encvhVEDYrrRl',
    name: 'Adina Filip',
    imageAlt: 'Imagine de profil a Adinei Filip, recenzie facebook Slim & Beauty by MC',
    image: review3,
    quote: 'Oamenii sfințesc locul, iar locul arata minunat. Revin mereu cu drag la voi'
  }
]

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="testimonials"
      className="py-20 relative overflow-hidden"
      style={{
        backgroundImage: `url('${bgpict.src}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-pink-900/70 backdrop-blur-xs"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
            Ce spun clientele noastre
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Află părerea clientelor noastre.
          </p>
        </div>

        <motion.div
          ref={ref}
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            {/* Testimonial Slider */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full shrink-0 px-4">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-10 shadow-xl">
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="shrink-0">
                          <div className="relative h-20 w-20 md:h-24 md:w-24 rounded-full overflow-hidden border-2 border-pink-300">
                            <Image
                              src={testimonial.image}
                              alt={testimonial.name}
                              fill
                              style={{ objectFit: 'cover' }}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                          <div className="flex justify-center md:justify-start mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>

                          <blockquote className="text-white italic mb-4 text-lg">
                            &quot;{testimonial.quote}&quot;
                          </blockquote>

                          <div>
                            <h4 className="font-semibold text-white text-lg">{testimonial.name}</h4>
                            <Link target="_blank" href={testimonial.url} className="flex items-center gap-2 text-pink-200">
                              <p>Vezi pe </p>
                              <Image
                                src='/icons/facebook.svg'
                                alt="Facebook logo"
                                width={16}
                                height={16}
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 md:-translate-x-0 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 backdrop-blur-xs transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 md:translate-x-0 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 backdrop-blur-xs transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all ${index === currentIndex ? "w-8 bg-white" : "w-2.5 bg-white/40"
                  }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;