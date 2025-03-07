"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Settings, BadgeCheck, Sparkles, UserCheck } from "lucide-react";

const benefits = [
  {
    icon: <Settings className="h-8 w-8 text-pink-500" />,
    title: "Tehnologie Modernă",
    description: "Folosim echipamente de ultimă generație pentru remodelare corporală și dermato cosmetică."
  },
  {
    icon: <BadgeCheck className="h-8 w-8 text-pink-500" />,
    title: "Experiență de Peste 10 Ani",
    description: `Cu peste ${new Date().getFullYear() - 2013} ani de experiență în domeniu, suntem alegerea sigură.`
  },
  {
    icon: <Sparkles className="h-8 w-8 text-pink-500" />,
    title: "Rezultate Vizibile",
    description: "Tratamentele noastre sunt concepute cu grijă, fără proceduri invazive."
  },
  {
    icon: <UserCheck className="h-8 w-8 text-pink-500" />,
    title: "Tratamente Personalizate",
    description: "Fiecare clientă are un tip de piele diferit, iar noi ne adaptăm pentru a oferi cele mai bune rezultate."
  }
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" className="py-20 bg-pink-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Video Side */}
          <motion.div
            className="w-full lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-[9/16] w-[90%] md:w-[70%] lg:w-[60%] h-auto max-h-[600px] rounded-2xl overflow-hidden">
              <video
                src={'/about-us.mp4'}
                autoPlay
                loop
                playsInline
                controls
                className="w-full h-full object-contain rounded-2xl"
              />
            </div>
          </motion.div>

          {/* Content Side */}
          <div className="lg:w-1/2">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              De Ce Slim & Beauty?
            </h2>
            <p className="text-gray-600 mb-8">
              Ne dedicăm ție! La Slim & Beauty, combinăm tehnologie de ultimă generație cu grijă personalizată, pentru rezultate rapide și de lungă durată.
            </p>

            <motion.div
              ref={ref}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 }
                    }
                  }}
                >
                  <div className="p-3 bg-white rounded-full shadow-xs">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};