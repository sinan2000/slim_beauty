'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, MapPin, Car, Calendar, Clock, Users, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { GoogleMapsEmbed } from '@next/third-parties/google'

const ContactItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
    <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg shadow-sm">
        {icon}
        <span className="text-gray-700">{text}</span>
    </div>
)

export default function AboutUs() {
    return (
        <div className="max-w-6xl mx-auto">
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary"
            >
                Despre Slim & Beauty
            </motion.h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
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
                                De-a lungul anilor, ne-am dedicat îmbunătățirii continue a serviciilor noastre, investind în tehnologii de ultimă generație și în formarea continuă a echipei noastre de specialiști.
                            </p>
                            <p className="text-gray-700">
                                Misiunea noastră este să oferim fiecărui client o experiență personalizată, care să îi ajute să se simtă încrezători și frumoși în propria piele.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
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
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
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
                                    Cu o experiență de peste 10 ani în domeniul frumuseții și îngrijirii corporale, Mihaela Ceviker a fondat Slim & Beauty cu viziunea de a oferi servicii de cea mai înaltă calitate, personalizate pentru nevoile fiecărui client.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle className="text-2xl font-semibold text-primary">Locația Noastră</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                                {/* 
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2783.0874762907417!2d21.23333661554912!3d45.79180077910623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47455d8a8f7f6a3d%3A0x7ab7c3c5d0d8d2c0!2sStrada%20Pet%C5%91fi%20S%C3%A1ndor%20101%2C%20Dumbr%C4%83vi%C8%9Ba%20307160!5e0!3m2!1sen!2sro!4v1634567890123!5m2!1sen!2sro"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen={true}
                                        loading="lazy"
                                    ></iframe>*/}
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
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1 }}
                >
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
                </motion.div>
            </div>
        </div>
    )
}