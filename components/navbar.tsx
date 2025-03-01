"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import { logoBlurUrl } from '@/lib/blurUrls';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const items = [
        { name: "Acasă", href: "/" },
        { name: "Servicii", href: "/servicii" },
        { name: "Despre Noi", href: "/despre-noi" },
        { name: "Contact", href: "/#contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-white/90 backdrop-blur-md shadow-xs py-3"
                    : "bg-transparent py-5"
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link href="/" className="flex items-center">
                    <Image
                        src={logo}
                        alt="Slim & Beauty by MC logo"
                        priority
                        loading="eager"
                        placeholder='blur'
                        blurDataURL={logoBlurUrl}
                        className="w-32 h-auto md:w-40 lg:w-48"
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    {items.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "font-medium hover:text-pink-500 transition-colors",
                                isScrolled ? "text-gray-700" : "text-white"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Button className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-6">
                        Programări
                    </Button>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? (
                        <X className={cn("h-6 w-6", isScrolled ? "text-gray-800" : "text-white")} />
                    ) : (
                        <Menu className={cn("h-6 w-6", isScrolled ? "text-gray-800" : "text-white")} />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-4 flex flex-col space-y-4 animate-in slide-in-from-top">
                    {items.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-gray-800 font-medium py-2 hover:text-pink-500 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Button className="bg-pink-500 hover:bg-pink-600 text-white w-full rounded-full">
                        Programări
                    </Button>
                </div>
            )}
        </header>
    );
};

export default Navbar;