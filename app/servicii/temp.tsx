import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from 'lucide-react'
import { services } from '@/lib/data'
import { normalizeString } from '@/lib/utils'
import Link from 'next/link'
import type { Service } from '../types'

interface ServiceProps extends Service {
    category: string;
}

const ServiceItem = ({ service }: { service: ServiceProps }) => {
    return (
        <div className="mb-12">
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                        {service.icon}
                        <h3 className="text-xl font-semibold text-primary ml-4">{service.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{service.shortDescription}</p>
                    <div className="mb-4">
                        <h4 className="font-semibold text-primary mb-2">Descriere detaliată:</h4>
                        <p className="text-sm text-gray-700 line-clamp-3">{service.longDescription}</p>
                    </div>
                    <div className="bg-primary/10 p-4 rounded-lg mb-4">
                        <h4 className="font-semibold text-primary mb-2">Știați că?</h4>
                        <p className="text-sm text-gray-700">{service.fact}</p>
                    </div>
                    <Link href={`/servicii/${normalizeString(service.category)}/${normalizeString(service.title)}`} passHref>
                        <Button variant="outline" className="w-full">
                            Află mai multe
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    )
}

const CategorySection = ({ category, items }: { category: string; items: Service[] }) => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-primary mb-8">{category}</h2>
            {items.map((service) => (
                <ServiceItem key={service.title} service={{ ...service, category }} />
            ))}
        </section>
    )
}

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FDF8F5] to-[#F5EBE6] py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary">
                    Serviciile Noastre
                </h1>
                {services.map((category) => (
                    <CategorySection key={category.category} category={category.category} items={category.items} />
                ))}
            </div>
        </div>
    )
}
