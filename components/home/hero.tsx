import Image from 'next/image';
import FancyHeader from './hero-text';

export default function Hero() {
    return (
        <section
            id="home"
            className="relative h-screen flex items-center justify-center overflow-hidden"
        >
            <Image
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Photo of Slim & Beauty's Salon"
                fill
                priority
                loading="eager"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-pink-900/60 to-purple-900/40 z-10"></div>

            <FancyHeader />
        </section>
    );
};