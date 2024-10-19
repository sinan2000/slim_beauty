'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, Phone, MapPin } from 'lucide-react'

const images = [
    '/hero1.jpg',
    '/hero2.jpg',
    '/hero3.jpg',
    '/hero4.jpg'
]

export default function Hero() {
    const [currentImage, setCurrentImage] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % images.length)
    }

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
    }

    return (
        <section className="flex flex-col lg:flex-row h-[calc(100vh-86px)]">
            {/* Image Section */}
            <div className="relative w-full lg:w-1/2 h-1/2 lg:h-full flex flex-col">
                {/* Image Container */}
                <div className="relative flex-grow bg-transparent">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentImage}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <Image
                                src={images[currentImage]}
                                alt={`Slim & Beauty service ${currentImage + 1}`}
                                layout="fill"
                                objectFit="contain"
                                priority
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation buttons */}
                    <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors"
                        aria-label="Next image"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Contact information */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-black/50 text-white p-2 sm:p-4">
                    <div className="flex items-center mb-1 sm:mb-0">
                        <Phone className="w-4 h-4 mr-2" />
                        <span className="text-sm">+40 733 407 329</span>
                    </div>
                    <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">Str. Petofi Sandor 101, Dumbrăvița, Jud. Timiș</span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-start p-4 sm:p-6 lg:p-8 bg-[#F5EBE6] flex-grow lg:flex-grow-0">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 text-primary"
                >
                    Hai să vorbim despre slăbit și frumusețe!
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 lg:mb-8 text-gray-700"
                >
                    Experimentează tratamente dermato-cosmetice și de remodelare corporală la Slim & Beauty by MC.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="flex flex-row space-x-2 sm:space-x-4 w-full"
                >
                    <Link href="/#rezervare" className="w-1/2 sm:w-auto">
                        <Button size="sm" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm">
                            Rezervă acum
                            <ChevronRight className="w-4 h-4 ml-1 sm:ml-2" />
                        </Button>
                    </Link>
                    <Link href="/servicii" className="w-1/2 sm:w-auto">
                        <Button size="sm" variant="outline" className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10 text-xs sm:text-sm">
                            Explorează serviciile
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}