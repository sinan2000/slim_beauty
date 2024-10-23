import { Metadata } from "next";
import Script from "next/script";
import { LocalBusiness, WithContext } from "schema-dts";
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, MapPin, Car, Calendar, Clock, Users, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import GoogleMap from '@/components/googlemap'

export const metadata: Metadata = {
    title: "Despre Slim & Beauty by MC - Tratamente și Contact",
    description: "Descoperă povestea Slim & Beauty by MC. Oferim tratamente dermato-cosmetice și remodelare corporală de top în Dumbrăvița. Programează o consultație!",
    keywords: ['Slim & Beauty by MC', 'remodelare corporală', 'dermato-cosmetică', 'tratamente de frumusețe', 'consultație', 'îngrijire piele Dumbrăvița', 'poveste Slim & Beauty'],
    authors: [{ name: "Slim & Beauty by MC", url: "https://www.slimandbeauty.ro" }],
    openGraph: {
        title: "Despre Slim & Beauty by MC - Povestea Noastră",
        description: "Slim & Beauty by MC oferă tratamente profesionale de remodelare corporală și dermato-cosmetică. Află mai multe despre noi și echipa noastră de specialiști.",
        url: "https://www.slimandbeauty.ro/despre-noi",
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

const ContactItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
    <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg shadow-sm">
        {icon}
        <span className="text-gray-700">{text}</span>
    </div>
)

export default function Page() {
    const jsonLd: WithContext<LocalBusiness> = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Slim & Beauty by MC",
        image: "https://www.slimandbeauty.ro/logo.jpg",
        "@id": "https://www.slimandbeauty.ro",
        url: "https://www.slimandbeauty.ro/despre-noi",
        telephone: "+40 733 407 329",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Str. Petőfi Sándor 101",
            addressLocality: "Dumbrăvița",
            postalCode: "307160",
            addressCountry: "RO"
        },
        description: "Slim & Beauty by MC oferă servicii profesionale dermato-cosmetice și proceduri de remodelare corporală în Dumbrăvița. Află mai multe despre echipa noastră.",
        currenciesAccepted: "RON",
        paymentAccepted: "Cash",
        priceRange: "$$",
        openingHoursSpecification: [
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                    "Monday", "Tuesday", "Thursday"
                ],
                opens: "12:00",
                closes: "20:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                    "Wednesday", "Friday"
                ],
                opens: "09:00",
                closes: "17:00"
            }
        ],
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.7",
            reviewCount: "15"
        },
        areaServed: {
            "@type": "Place",
            name: "Dumbrăvița, Timișoara, România"
        },
        brand: {
            "@type": "Brand",
            name: "Slim & Beauty by MC"
        },
        logo: "https://www.slimandbeauty.ro/logo.jpg",
        sameAs: [
            "https://www.facebook.com/SalonSlimBeautyByMc",
            "https://www.instagram.com/slimandbeautybymc/"
        ]

    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FDF8F5] to-[#F5EBE6] py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <h1
                    className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary"
                >
                    Despre Slim & Beauty
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    <div
                        className="lg:col-span-2"
                    >
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-primary">Povestea Noastră</CardTitle>
                            </CardHeader>
                            <CardContent className="prose prose-sm max-w-none">
                                <p className="text-gray-700 mb-4">
                                    Slim & Beauty by MC a luat naștere în anul 2013 din pasiunea noastră pentru frumusețe și dorința de a oferi servicii de înaltă calitate în domeniul tratamentelor corporale și dermato-cosmetice.
                                </p>
                                <p className="text-gray-700 mb-4">
                                    De-a lungul anilor, ne-am dedicat îmbunătățirii continue a serviciilor noastre, investind în tehnologii de ultimă generație.
                                </p>
                                <p className="text-gray-700">
                                    Misiunea noastră este să oferim fiecărei cliente o experiență personalizată, care să le ajute să se simtă încrezătoare și frumoase în propria piele.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <div>
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-primary">Informații de Contact</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <ContactItem icon={<Phone className="w-5 h-5 text-primary" />} text="+40 733 407 329" />
                                    <ContactItem icon={<MapPin className="w-5 h-5 text-primary" />} text="Str. Petofi Sandor 101, Dumbrăvița, Jud. Timiș" />
                                    <ContactItem icon={<Car className="w-5 h-5 text-primary" />} text="Locuri de parcare disponibile" />
                                    <ContactItem icon={<Calendar className="w-5 h-5 text-primary" />} text="Luni, Marți, Joi: 13:00 - 21:00" />
                                    <ContactItem icon={<Clock className="w-5 h-5 text-primary" />} text="Miercuri, Vineri: 9:00 - 17:00" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div
                    className="mb-16"
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl font-semibold text-primary">Echipa Noastră</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
                                <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg">
                                    <Image
                                        src="/owner.jpg"
                                        alt="Proprietar Slim & Beauty"
                                        width={192}
                                        height={192}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="md:flex-1">
                                    <h3 className="text-xl font-semibold text-primary mb-2">Mihaela Ceviker</h3>
                                    <p className="text-gray-700 mb-4 font-medium">
                                        Fondatoare și Specialist în Tratamente Corporale
                                    </p>
                                    <p className="text-gray-700">
                                        Cu o experiență de peste 10 ani în domeniul frumuseții și îngrijirii corporale, Mihaela Ceviker a fondat Slim & Beauty cu viziunea de a oferi servicii de cea mai înaltă calitate, personalizate pentru nevoile fiecărei cliente.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div>
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-primary">Locația Noastră</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                                    <GoogleMap />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div>
                        <Card className="h-full flex flex-col justify-between">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-primary">Programează o Consultație</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow flex flex-col justify-center">
                                <p className="text-gray-700 mb-6">
                                    Suntem aici pentru a vă ajuta să vă atingeți obiectivele de frumusețe și wellness. Programați o consultație gratuită astăzi și începeți călătoria către cea mai bună versiune a dumneavoastră!
                                </p>
                                <Link href="/#rezervare" className="w-full">
                                    <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-white">
                                        <Users className="w-5 h-5 mr-2" />
                                        Programează Acum
                                        <ChevronRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <Script
                id="about-us-json-ld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </div>
    )
}