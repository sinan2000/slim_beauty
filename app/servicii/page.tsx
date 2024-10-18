'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { services } from '@/lib/data'

interface Service {
  icon: JSX.Element;
  title: string;
  shortDescription: string;
  longDescription: string;
  fact: string;
}

const ServiceAccordionItem = ({ service }: { service: Service }) => (
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
    </div>
  )
}