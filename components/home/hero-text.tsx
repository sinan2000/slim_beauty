'use client';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';

export default function FancyHeader() {
  return (
    <>
      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Enhance Your Beauty, Elevate Your Confidence
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Premium body remodeling & dermato-cosmetic treatments in Dumbrăvița
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-8 py-6 text-lg transition-all duration-300 transform hover:scale-105">
              Book a Consultation
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg">
              Explore Services
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center"
        animate={{ opacity: [0.4, 1, 0.4], y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      >
        <div className="text-pink-300 opacity-80">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-8 w-8" viewBox="0 0 24 24">
            <path d="M12 18.5a1 1 0 0 1-.71-.29l-6-6a1 1 0 1 1 1.42-1.42L12 16.08l5.29-5.29a1 1 0 1 1 1.42 1.42l-6 6a1 1 0 0 1-.71.29Z" />
          </svg>
        </div>
      </motion.div>
    </>
  )
}