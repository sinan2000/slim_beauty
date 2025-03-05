import { Button } from "@/components/ui/button";
import Image from "next/image";
// use this for A/B testing, also this should be faster
export default function Hero_B() {
  return (
    < section className="relative h-screen flex items-center justify-center overflow-hidden" >
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Beauty treatment"
          fill
          priority
          loading="eager"
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-purple-500/30 backdrop-blur-sm"></div>
      </div>
      <div className="container relative z-10 text-center px-4 md:px-6">
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          Enhance Your Beauty, Elevate Your Confidence
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto font-light">
          Premium body remodeling & dermato-cosmetic treatments in Dumbrăvița
        </p>
        <Button
          size="lg"
          className="bg-white text-pink-600 hover:bg-white/90 hover:scale-105 transition-all duration-300"
        >
          Book a Consultation
        </Button>
      </div>
    </section >
  );
}