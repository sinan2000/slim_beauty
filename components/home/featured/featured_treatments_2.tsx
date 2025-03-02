"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { featured } from '@/lib/data2';
import Link from 'next/link';

export default function FeaturedMotion() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

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
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-playfair text-xl font-semibold">{service.name}</h3>
              <div className="bg-pink-500 text-white text-sm px-3 py-1 rounded-full">
                {service.price}
              </div>
            </div>
            <p className="text-white/80 text-sm mb-4">{service.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">{service.duration}</span>
              <Link href="#programare">
                <Button
                  className="bg-white text-pink-500 hover:bg-pink-50 rounded-full px-5 py-1 h-auto text-sm font-medium transition-all duration-300 transform group-hover:scale-105"
                >
                  Programare
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
