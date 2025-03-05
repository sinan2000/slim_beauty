import Image from 'next/image';
import heroImage from '@/assets/hero.jpg'
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Hero() {
    return (
        <section
            id="home"
            className="relative h-screen flex items-center justify-center overflow-hidden"
        >
            <Image
                src={heroImage}
                alt="Photo of Facial Treatment"
                fill
                priority
                loading="eager"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-pink-900/60 to-purple-900/40 z-10"></div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-20 text-center animate-fade-hero-in">
                <div className="max-w-3xl mx-auto">
                    <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-slide-up">
                        Un Moment de Răsfăț – Remodelare Corporală & Dermato Cosmetică
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-slide-up">
                        Simte-te bine în pielea ta! La Slim & Beauty, te ajutăm să scapi de celulită, să îți tonifiezi corpul și să îți îngrijești tenul cu tratamente profesionale, într-un mediu relaxant.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
                        <Link href="/?tab=booking">
                            <Button className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-8 py-6 text-lg transition-all duration-300 transform hover:scale-105">
                                Programează-te
                            </Button>
                        </Link>
                        <Link href="/servicii">
                            <Button className="border border-white text-white bg-white/20 hover:bg-white/30 rounded-full px-8 py-6 text-lg transition-all duration-300 transform hover:scale-105">
                                Descoperă Tratamentele
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
        </section>
    );
};