'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { services } from '@/lib/data'
import { useRouter, useSearchParams } from 'next/navigation'
import { normalizeString } from '@/lib/utils'

interface ServiceProp {
    icon: JSX.Element;
    title: string;
    shortDescription: string;
    longDescription: string;
    fact: string;
}

const ServiceAccordionItem = React.forwardRef<HTMLDivElement, { service: ServiceProp }>(({ service }, ref) => (
    <div ref={ref}>
        <AccordionItem value={service.title} id={normalizeString(service.title)}>
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
    </div>
))
ServiceAccordionItem.displayName = 'ServiceAccordionItem';

export default function TempPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const serviciu = searchParams.get('serviciu');

    const [activeTab, setActiveTab] = useState(services[0].category)
    const [expandedService, setExpandedService] = useState<string | null>(null)

    const hasScrolledRef = useRef(false);
    const hasInitialServiciuParam = useRef(!!serviciu);

    const serviceRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    useEffect(() => {
        if (serviciu) {
            let found = false;
            for (const category of services) {
                for (const item of category.items) {
                    if (item.title === serviciu) {
                        setActiveTab(category.category);
                        setExpandedService(item.title);
                        found = true;
                        break;
                    }
                }
                if (found) break;
            }
        }
    }, [serviciu])

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (expandedService) {
            params.set('serviciu', expandedService);
        } else {
            params.delete('serviciu');
        }

        router.replace(`?${params.toString()}`, { scroll: false });
    }, [expandedService, router, searchParams]);

    useEffect(() => {
        if (expandedService && hasInitialServiciuParam.current && !hasScrolledRef.current) {
            const id = normalizeString(expandedService);
            let attempts = 10;
            const scrollToElement = () => {
                const element = document.getElementById(id);
                if (element) {
                    const yOffset = -86;
                    const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                    hasScrolledRef.current = true;
                } else if (attempts > 0) {
                    attempts--;
                    setTimeout(scrollToElement, 100);
                } else {
                    hasScrolledRef.current = true;
                }
            };
            scrollToElement();
        }
    }, [expandedService, activeTab]);

    return (

        <div className="max-w-4xl mx-auto">
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary"
            >
                Serviciile Noastre
            </motion.h1>

            <Tabs value={activeTab} onValueChange={(value) => { setActiveTab(value); setExpandedService(null); }} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    {services.map((category) => (
                        <TabsTrigger
                            key={category.category}
                            value={category.category}
                            className="text-sm sm:text-lg font-semibold text-center"
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
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full"
                                    value={expandedService ?? undefined}
                                    onValueChange={(value) => {
                                        setExpandedService(value);
                                    }}
                                >
                                    {category.items.map((service) => {
                                        const id = normalizeString(service.title);
                                        return (
                                            <ServiceAccordionItem
                                                key={service.title}
                                                service={service}
                                                ref={(el) => {
                                                    if (el) {
                                                        serviceRefs.current[id] = el;
                                                    }
                                                }}
                                            />
                                        )
                                    })}
                                </Accordion>
                            </motion.div>
                        </AnimatePresence>
                    </TabsContent>
                ))}
            </Tabs>
        </div>

    )
}
