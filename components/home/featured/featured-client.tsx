"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { getFeaturedServices } from '@/lib/utils';

export default function FeaturedMotion() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const featured = getFeaturedServices();

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2
          }
        }
      }}
    >
      {featured.map((service, index) => (
        <motion.div
          key={index}
          className="group relative overflow-hidden rounded-2xl shadow-lg"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6 }
            }
          }}
        >
          <div className="relative h-[400px] w-full">
            <Image
              src={service.image}
              alt={service.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-playfair text-xl font-semibold">{service.name}</h3>
              <div className="bg-pink-500 text-white text-sm px-3 py-1 rounded-full">
                {service.price + ' RON'}
              </div>
            </div>
            <p className="text-white/80 text-sm mb-4">{service.description}</p>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-white/70 text-sm">
                {/* Clock Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3.5A8.5 8.5 0 1 0 20.5 12 8.51 8.51 0 0 0 12 3.5Zm0 15A6.5 6.5 0 1 1 18.5 12 6.51 6.51 0 0 1 12 18.5ZM12 7a1 1 0 0 1 1 1v3.59l2.7 2.7a1 1 0 1 1-1.42 1.42l-3-3A1 1 0 0 1 11 12V8a1 1 0 0 1 1-1Z" />
                </svg>
                {service.duration + " min"}
              </span>

            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
