import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Service } from '@/app/types'
import MediaComponent from './media'
import PriceComponent from './price'

interface PageProps {
    service: Service
}

export default function ServiceDetailPage({ service }: PageProps) {
    return (
        <div className="min-h-screen bg-linear-to-br from-[#FDF8F5] to-[#F5EBE6] py-8 px-4 sm:px-6 lg:px-8">
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

                {/* Media */}
                {service.media && (<MediaComponent media={service.media} />)}

                {/* Medium Description */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-semibold text-primary mb-4">Despre Tratament</h2>
                            <p className="text-gray-700">{service.mediumDescription}</p>
                        </CardContent>
                    </Card>
                    <PriceComponent prices={service.price} />
                </div>

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
                        Tratamentul {service.title} oferă numeroase avantaje pentru îmbunătățirea aspectului pielii și a conturului corporal:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        {service.benefits.map((benefit, index) => {
                            const [boldText, normalText] = benefit.split(':');
                            return (
                                <li key={index} className="text-gray-700">
                                    <strong>{boldText}:</strong>{normalText}
                                </li>
                            );
                        })}
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

                <hr className="border-t border-gray-200 mb-12" />

                {/* Bottom Text */}
                <div className="text-lg text-gray-700 mt-12">
                    Dacă ai alte întrebări sau dorești să faci o programare, poți folosi <Link href="/#rezervare" className="text-primary underline hover:text-primary/80 hover:underline">formularul nostru online</Link> și te vom contacta noi sau poți suna la <strong>0733407329</strong>.
                </div>
            </div>
        </div>
    )
}
