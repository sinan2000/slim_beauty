'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ChevronRight, Phone, MapPin, Clock } from 'lucide-react'

const images = [
  '/hero1.jpg',
  '/hero2.jpg',
  '/hero3.jpg',
  '/hero4.jpg'
]

export default function BHero() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-[calc(100vh-86px)] overflow-hidden bg-[#F5EBE6]">
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={images[currentImage]}
            alt={`Slim & Beauty service ${currentImage + 1}`}
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F5EBE6]/90 via-[#F5EBE6]/70 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-center items-start px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="w-full max-w-2xl"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-4 leading-tight">
            Redescoperă-ți frumusețea naturală
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8">
            Experimentează tratamente inovatoare de remodelare corporală și îngrijire a pielii la Slim & Beauty by MC.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/#rezervare">
              <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white">
                Rezervă o consultație
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/servicii">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10">
                Explorează serviciile
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="absolute bottom-8 left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-4 flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-gray-700">+40 733 407 329</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-gray-700">Str. Petofi Sandor 101, Dumbrăvița</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-gray-700">Luni - Vineri: 9:00 - 20:00</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-24 right-4 sm:right-6 lg:right-8 z-20">
        <div className="flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentImage ? 'bg-primary' : 'bg-gray-300'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}