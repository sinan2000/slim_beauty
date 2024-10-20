import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Service } from '@/app/types'

interface PageProps {
    service: Service
}

export default function ServiceDetailPage({ service }: PageProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FDF8F5] to-[#F5EBE6] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Breadcrumbs */}
                <nav className="text-sm mb-8">
                    <ol className="list-none p-0 inline-flex">
                        <li className="flex items-center">
                            <Link href="/" className="text-primary hover:text-primary/80">Acasă</Link>
                            <ChevronRight className="h-4 w-4 mx-2" />
                        </li>
                        <li className="flex items-center">
                            <Link href="/servicii" className="text-primary hover:text-primary/80">Servicii</Link>
                            <ChevronRight className="h-4 w-4 mx-2" />
                        </li>
                        <li className="text-gray-500">{service.title}</li>
                    </ol>
                </nav>

                {/* Title and Short Description */}
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">{service.title}</h1>
                <p className="text-xl text-gray-600 mb-8">{service.shortDescription}</p>

                {/* Medium Description */}
                <Card className="mb-12">
                    <CardContent className="p-6">
                        <p className="text-lg text-gray-700">{service.mediumDescription}</p>
                    </CardContent>
                </Card>

                {/* Long Description */}
                <div className="prose prose-lg max-w-none mb-12">
                    <h2 className="text-2xl font-semibold text-primary mb-4">Despre Tratament</h2>
                    {service.longDescription.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4">{paragraph}</p>
                    ))}
                </div>

                {/* Benefits */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-primary mb-4">Beneficii</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Tratamentul VShape Anticelulitic oferă numeroase avantaje pentru îmbunătățirea aspectului pielii și a conturului corporal:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        {service.benefits.map((benefit, index) => (
                            <li key={index} className="text-gray-700">{benefit}</li>
                        ))}
                    </ul>
                </div>

                {/* Fact */}
                <Card className="mb-12 bg-primary/10">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-primary mb-2">Știați că?</h3>
                        <p className="text-gray-700">{service.fact}</p>
                    </CardContent>
                </Card>

                {/* FAQ */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-primary mb-6">Întrebări Frecvente</h2>
                    {service.faq.map((item, index) => (
                        <div key={index} className="mb-6">
                            <h3 className="text-xl font-medium text-primary mb-2">{item.question}</h3>
                            <p className="text-gray-700">{item.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}