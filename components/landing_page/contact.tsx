import React from 'react'
import { Phone, MapPin, Clock, Instagram, Facebook } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

export default function ContactSection() {
    return (
        <section id="contact" className="py-16 bg-[#F5EBE6]">
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
                            <a href="https://www.instagram.com/slimandbeautybymc/" target="_blank" rel="noopener noreferrer" className="text-[#6B4E32] hover:text-[#5A4129] transition-colors">
                                <Instagram className="w-8 h-8" />
                                <span className="sr-only">Instagram</span>
                            </a>
                            <a href="https://www.facebook.com/SalonSlimBeautyByMc" target="_blank" rel="noopener noreferrer" className="text-[#6B4E32] hover:text-[#5A4129] transition-colors">
                                <Facebook className="w-8 h-8" />
                                <span className="sr-only">Facebook</span>
                            </a>
                        </div>
                    </div>
                    <div className="relative h-[400px] md:h-full rounded-lg overflow-hidden shadow-lg">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2783.0708342456!2d21.23518731580908!3d45.79721997910592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47455d8a8f7a2a2f%3A0x7c1e6a0a0b8c8b0a!2sStrada%20Pet%C5%91fi%20S%C3%A1ndor%20101%2C%20Dumbr%C4%83vi%C8%9Ba%20307160!5e0!3m2!1sen!2sro!4v1635789876543!5m2!1sen!2sro"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Locația Slim & Beauty by MC"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    )
}