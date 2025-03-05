"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/data";
import { normalizeString } from "@/lib/utils";
import { serviceSchema } from "@/lib/jsonLds";

export default function ServicesClient() {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  return (
    <div className="min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-96px)] w-full flex flex-col md:flex-row">
      <script
        id="services-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {services.map((service, index) => (
        <Link
          href={`/servicii/${normalizeString(service.category)}`}
          key={index}
          className="relative w-full h-1/2 md:h-full overflow-hidden cursor-pointer"
          onMouseEnter={() => setHoveredSection(normalizeString(service.category))}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <motion.div
            className="relative bg-cover min-h-[calc(50vh-40px)] md:min-h-[calc(100vh-96px)] bg-center"
            style={{ backgroundImage: `url(${service.media.src})` }}
            animate={{
              scale: hoveredSection === normalizeString(service.category) ? 1.05 : 1,
            }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-black/40 hover:bg-black/30 transition-colors duration-300" />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
            <motion.div
              animate={{
                y: hoveredSection === normalizeString(service.category) ? -10 : 0,
                opacity: hoveredSection === normalizeString(service.category) ? 1 : 0.9,
              }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 tracking-wide">
                {service.category}
              </h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: hoveredSection === normalizeString(service.category) ? 1 : 0,
                  y: hoveredSection === normalizeString(service.category) ? 0 : 20,
                }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="flex items-center justify-center mt-4"
              >
                <span className="text-lg mr-2">Descoperă serviciile</span>
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </motion.div>
          </div>
        </Link>
      ))}
    </div>
  );
}