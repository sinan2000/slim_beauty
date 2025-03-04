"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import Booking from './booking';
import Pricing from './pricing';
import { useSearchParams } from 'next/navigation';

export default function BookingPricing() {
  const [activeTab, setActiveTab] = useState<"pricing" | "booking">("pricing");
  const [service, setService] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "booking" || tab === "pricing") {
      setActiveTab(tab as "pricing" | "booking");
      
      setTimeout(() => {
        document.getElementById('tabs')?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }

    const service = searchParams.get("service");
    if (service) {
      setService(service);
    }
  }, [searchParams]);

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="tabs" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Listă de prețuri și Programări Online
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Vezi prețurile tratamentelor noastre și programează-te simplu și rapid cu câteva click-uri.
          </p>
        </div>

        <motion.div
          ref={ref}
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "pricing" | "booking")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="pricing">Listă de Prețuri</TabsTrigger>
              <TabsTrigger value="booking">Programări Online</TabsTrigger>
            </TabsList>

            <TabsContent value="pricing" className="border rounded-lg p-6 shadow-xs">
              <Pricing />
            </TabsContent>

            <TabsContent value="booking">
              <Booking service={service}/>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};