'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { services } from '@/lib/data'

interface Service {
    icon: JSX.Element;
    title: string;
    shortDescription: string;
    longDescription: string;
    fact: string;
}

const ServiceCard = ({ service, index, category }: { service: Service; index: number; category: string }) => {
    const isBodyTreatment = category === "Proceduri Corporale"
    
    return (
        <motion.div
            initial={{ opacity: 0, x: isBodyTreatment ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`flex flex-col lg:flex-row items-center ${isBodyTreatment ? '' : 'lg:flex-row-reverse'} mb-16`}
        >
            <div className={`lg:w-2/3 ${isBodyTreatment ? 'lg:pr-8' : 'lg:pl-8'}`}>
                <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-primary/10">
                    <CardHeader>
                        <div className="flex items-center space-x-4">
                            {service.icon}
                            <CardTitle className="text-2xl font-bold text-primary">{service.title}</CardTitle>
                        </div>
                        <CardDescription className="text-lg text-gray-600">{service.shortDescription}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700 mb-4">{service.longDescription}</p>
                        <div className="bg-secondary/20 p-4 rounded-lg">
                            <h4 className="font-semibold text-primary mb-2">Știați că?</h4>
                            <p className="text-sm text-gray-600">{service.fact}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className={`lg:w-1/3 flex justify-center items-center ${isBodyTreatment ? 'lg:justify-end' : 'lg:justify-start'} mt-8 lg:mt-0`}>
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    {service.icon}
                </div>
            </div>
        </motion.div>
    )
}

const CategoryHeader = ({ category }: { category: string }) => (
    <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center mb-16"
    >
        <h2 className="text-3xl font-semibold text-center text-primary">{category}</h2>
    </motion.div>
)

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FDF8F5] via-[#F5EBE6] to-[#FDF8F5] py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}

                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary"
                >
                    Serviciile Noastre
                </motion.h1>
                {services.map((category, categoryIndex) => (
                    <React.Fragment key={category.category}>
                        <CategoryHeader category={category.category} />
                        {category.items.map((service, index) => (
                            <ServiceCard key={service.title} service={service} index={index} category={category.category} />
                        ))}
                        {categoryIndex < services.length - 1 && (
                            <div className="flex justify-center my-16">
                                <div className="w-32 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}