'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MapPin, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
    const [currentImage, setCurrentImage] = useState(0);

    const images = [
        { src: '/hero1.jpg', alt: 'Hero Image 1' },
        { src: '/hero2.jpg', alt: 'Hero Image 2' },
        { src: '/hero3.jpg', alt: 'Hero Image 3' },
        { src: '/hero4.jpg', alt: 'Hero Image 4' }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <section className="relative overflow-hidden h-[calc(100vh-86px)] flex flex-col lg:flex-row">
            {/* Image and controls */}
            <div className="relative w-full lg:w-1/2 h-full">
                <AnimatePresence initial={false}>
                    <motion.div
                        key={currentImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <Image
                            src={images[currentImage].src}
                            alt={images[currentImage].alt}
                            fill
                            style= {{ objectFit: 'contain' }}
                            priority={true}
                        />
                    </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-black bg-opacity-50" />

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImage(index)}
                            className={`h-4 w-4 rounded-full transition-all duration-300 ${currentImage === index ? 'bg-white w-6' : 'bg-gray-400'}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                <Button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300"
                    aria-label="Previous image"
                >
                    <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300"
                    aria-label="Next image"
                >
                    <ChevronRight className="w-6 h-6" />
                </Button>

                <div className="absolute bottom-4 left-4 flex flex-col lg:flex-row items-start lg:items-center space-y-2 lg:space-y-0 lg:space-x-4 text-white text-sxs sm:text-sm mb-4">
                    <div className="flex items-center">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        <span>+40 (733) 407 329</span>
                    </div>
                    <div className="flex items-center">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        <span>Dumbrăvița, str. Petőfi Șándor 101</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-start p-4 md:p-8 lg:p-16 text-black bg-[#F5EBE6] min-h-[calc(50vh-86px)] lg:min-h-full">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4"
                >
                    Hai să vorbim despre slăbit și frumusețe!
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-sm sm:text-base md:text-lg lg:text-xl mb-8 max-w-2xl"
                >
                    Experimentează tratamente dermato-cosmetice și de remodelare corporală la Slim & Beauty by MC.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                >
                    <Link href="/#rezervare">
                        <Button size="lg" className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                            Rezervă acum
                        </Button>
                    </Link>
                    <Link href='/servicii'>
                        <Button size="lg" variant="outline" className="border-primary text-primar w-full sm:w-auto">
                            Explorează serviciile noastre
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
