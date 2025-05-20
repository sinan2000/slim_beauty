"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import Pricing from "./pricing";

export default function NoBookingPricing() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="preturi" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Listă de prețuri
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Vezi prețurile tratamentelor noastre.
          </p>
        </div>

        <motion.div
          ref={ref}
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="border rounded-lg p-6 shadow-xs bg-white w-full">
            <Pricing />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
