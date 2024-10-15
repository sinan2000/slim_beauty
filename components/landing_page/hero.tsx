'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MapPin, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
    const [currentImage, setCurrentImage] = useState(0);

    const images = ['/hero1.jpg', '/hero2.jpg', '/hero3.jpg', '/hero4.jpg'];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <section className="relative min-h-[calc(100vh-86px)] overflow-hidden">
            <div className="flex flex-col lg:flex-row h-full">
                {/* Image and controls */}
                <div
                    className="relative w-full lg:w-1/2 h-[50vh] lg:h-[calc(100vh-86px)]"
                    style={{
                        backgroundImage: `url('${images[currentImage]}')`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <AnimatePresence initial={false}>
                        <motion.div
                            key={currentImage}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0"
                        />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-black bg-opacity-50" />

                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImage(index)}
                                className={`h-2 w-2 rounded-full transition-all duration-300 ${currentImage === index ? 'bg-white w-4' : 'bg-gray-400'}`}
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

                    <div className="absolute bottom-4 left-4 flex flex-col lg:flex-row items-start lg:items-center space-y-2 lg:space-y-0 lg:space-x-4 text-white text-sm mb-2">
                        <div className="flex items-center">
                            <Phone className="w-5 h-5 mr-2" />
                            <span>+40 (733) 407 329</span>
                        </div>
                        <div className="flex items-center">
                            <MapPin className="w-5 h-5 mr-2" />
                            <span>Dumbrăvița, str. Petofi Șandor 101</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="w-full min-h-[calc(50vh-86px)] lg:w-1/2 flex flex-col justify-center items-start p-8 lg:p-16 text-black bg-[#F5EBE6]">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl lg:text-5xl font-bold mb-4"
                    >
                        Hai să vorbim despre slăbit și frumusețe!
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg lg:text-xl mb-8 max-w-2xl"
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
            </div>
        </section>
    );
}