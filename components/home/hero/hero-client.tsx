import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function FancyHeader() {
  return (
    <>
      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 text-center animate-fade-hero-in">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-slide-up">
            Remodelare Corporală & Tratamente Dermato-Cosmetice
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-slide-up delay-150">
            Scapă de celulită și tonifică-ți corpul cu tehnologii avansate de estetică non-invazivă.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up animation-delay-3000">
            <Link href="/?tab=booking">
              <Button className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-8 py-6 text-lg transition-all duration-300 transform hover:scale-105">
                Programează-te
              </Button>
            </Link>
            <Link href="/servicii">
              <Button className="border border-white text-white bg-white/20 hover:bg-white/30 rounded-full px-8 py-6 text-lg transition-all duration-300 transform hover:scale-105">
                Vezi Tratamentele
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center animate-bounce">
        <div className="text-pink-300 opacity-80">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-8 w-8" viewBox="0 0 24 24">
            <path d="M12 18.5a1 1 0 0 1-.71-.29l-6-6a1 1 0 1 1 1.42-1.42L12 16.08l5.29-5.29a1 1 0 1 1 1.42 1.42l-6 6a1 1 0 0 1-.71.29Z" />
          </svg>
        </div>
      </div>
    </>
  )
}