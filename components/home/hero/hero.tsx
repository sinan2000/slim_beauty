import Image from 'next/image';
import FancyHeader from './hero-client';
import heroImage from '@/assets/hero.jpg'

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

            <FancyHeader />
        </section>
    );
};