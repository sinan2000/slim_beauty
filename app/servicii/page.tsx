'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { services } from '@/lib/data'
import type { Metadata } from 'next';
import { WithContext, LocalBusiness, OfferForPurchase } from 'schema-dts';
import Script from 'next/script'

interface ServiceProp {
  icon: JSX.Element;
  title: string;
  shortDescription: string;
  longDescription: string;
  fact: string;
}

export const metadata: Metadata = {
  title: "Serviciile Noastre - Slim & Beauty by MC",
  description: "Explorează serviciile noastre profesionale de remodelare corporală și dermato-cosmetică la Slim & Beauty by MC. Descoperă tratamente precum VShape Anticelulitic, Criolipoliză, EMSlim Neo RF și multe altele.",
  keywords: ['Slim & Beauty by MC', 'remodelare corporală', 'dermato-cosmetică', 'servicii de frumusețe', 'tratamente faciale', 'anticelulitic', 'Dumbrăvița', 'Timișoara', 'îngrijirea pielii'],
  authors: [{ name: "Slim & Beauty by MC", url: "https://www.slimandbeauty.ro" }],
  openGraph: {
    title: "Slim & Beauty by MC - Servicii de Remodelare Corporală și Dermato-Cosmetică",
    description: "Slim & Beauty by MC oferă o gamă variată de tratamente pentru îngrijirea pielii și remodelare corporală, inclusiv Criolipoliză, EMSlim Neo RF, și Radiofrecvență Bipolară.",
    url: "https://www.slimandbeauty.ro/servicii",
    siteName: "Slim & Beauty by MC",
    images: [
      {
        url: "https://www.slimandbeauty.ro/logo.jpg",
        alt: "Logo Slim & Beauty by MC",
      }
    ],
    locale: "ro_RO",
    type: "website",
  },
  robots: {
    follow: true,
    index: true,
  }
}

const ServiceAccordionItem = ({ service }: { service: ServiceProp }) => (
  <AccordionItem value={service.title}>
    <AccordionTrigger className="hover:no-underline">
      <div className="flex items-center space-x-4 w-full text-left">
        {service.icon}
        <div>
          <h3 className="text-lg font-semibold text-primary">{service.title}</h3>
          <p className="text-sm text-gray-600">{service.shortDescription}</p>
        </div>
      </div>
    </AccordionTrigger>
    <AccordionContent>
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-300">
        <CardContent className="pt-6">
          <p className="text-gray-700 mb-4">{service.longDescription}</p>
          <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
            <h4 className="font-semibold text-primary mb-2">Știați că?</h4>
            <p className="text-sm text-gray-700">{service.fact}</p>
          </div>
        </CardContent>
      </Card>
    </AccordionContent>
  </AccordionItem>
)

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState(services[0].category)
  const offer = services.flatMap((category) =>
    category.items.map((item) => ({
      '@type': 'OfferForPurchase',
      name: item.title,
      description: item.shortDescription,
      priceCurrency: 'RON',
    })));
  const jsonLd: WithContext<LocalBusiness> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Slim & Beauty by MC',
    image: 'https://www.slimandbeauty.ro/logo.jpg',
    '@id': 'https://www.slimandbeauty.ro',
    url: 'https://www.slimandbeauty.ro',
    telephone: '+40733407329',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Strada Petőfi Sándor 101',
      addressLocality: 'Dumbrăvița',
      postalCode: '307160',
      addressCountry: 'RO'
    },
    description: 'Descoperă tratamente inovative pentru îngrijirea pielii și remodelare corporală la Slim & Beauty by MC. Oferim servicii precum Criolipoliză, EMSlim Neo RF și VShape Anticelulitic.',
    areaServed: {
      '@type': 'Place',
      name: 'Dumbrăvița, Timișoara, România',
    },
    brand: {
      '@type': 'Brand',
      name: 'Slim & Beauty by MC'
    },
    makesOffer: offer as WithContext<OfferForPurchase>[],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF8F5] via-[#F5EBE6] to-[#FDF8F5] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary"
        >
          Serviciile Noastre
        </motion.h1>

        <Tabs defaultValue={services[0].category} className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            {services.map((category) => (
              <TabsTrigger
                key={category.category}
                value={category.category}
                className="text-lg font-semibold"
              >
                {category.category}
              </TabsTrigger>
            ))}
          </TabsList>
          {services.map((category) => (
            <TabsContent key={category.category} value={category.category}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Accordion type="single" collapsible className="w-full">
                    {category.items.map((service) => (
                      <ServiceAccordionItem key={service.title} service={service} />
                    ))}
                  </Accordion>
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <Script
        id="services-page-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  )
}