import React from 'react'
import { Phone, MapPin, Clock, Instagram, Facebook } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { GoogleMapsEmbed } from '@next/third-parties/google'
import Link from 'next/link'

export default function ContactSection() {
    return (
        <section id="contact" className="py-24 bg-[#F5EBE6]">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-semibold text-center mb-12">Contactează-ne</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-8">
                        <Card className="bg-white shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-4 mb-4">
                                    <Phone className="w-6 h-6 text-[#6B4E32]" />
                                    <div>
                                        <h3 className="font-semibold text-[#6B4E32]">Telefon</h3>
                                        <p className="text-gray-600">+40 733 407 329</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 mb-4">
                                    <MapPin className="w-6 h-6 text-[#6B4E32]" />
                                    <div>
                                        <h3 className="font-semibold text-[#6B4E32]">Adresă</h3>
                                        <p className="text-gray-600">Dumbrăvița, str. Petőfi Șándor 101</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Clock className="w-6 h-6 text-[#6B4E32]" />
                                    <div>
                                        <h3 className="font-semibold text-[#6B4E32]">Program</h3>
                                        <ul className="text-gray-600 text-sm">
                                            <li>Luni, Marți, Joi: 13:00 - 21:00</li>
                                            <li>Miercuri, Vineri: 09:00 - 17:00</li>
                                            <li>Sâmbătă, Duminică: Închis</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <div className="flex justify-center space-x-6">
                            <Link href="https://www.instagram.com/slimandbeautybymc/" target="_blank" rel="noopener noreferrer" className="text-[#6B4E32] hover:text-[#5A4129] transition-colors">
                                <Instagram className="w-8 h-8" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="https://www.facebook.com/SalonSlimBeautyByMc" target="_blank" rel="noopener noreferrer" className="text-[#6B4E32] hover:text-[#5A4129] transition-colors">
                                <Facebook className="w-8 h-8" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                        </div>
                    </div>
                    <div className="relative h-[400px] md:h-full rounded-lg overflow-hidden shadow-lg">
                        <GoogleMapsEmbed
                            apiKey={process.env.MAPS_EMBED_API_KEY as string}
                            height="100%"
                            width="100%"
                            mode="place"
                            q="Slim+&+Beauty+by+MC,+Dumbrăvița"
                            loading="lazy"
                            style="border: 0"
                            language="ro"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}