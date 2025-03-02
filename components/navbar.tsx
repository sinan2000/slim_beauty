"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import { logoBlurUrl } from '@/lib/blurUrls';
import { socialData } from '@/lib/socials';

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
                <div className="fixed inset-0 bg-white z-50 flex flex-col items-center h-screen overflow-y-auto">
                    {/* Close Button */}
                    <button
                        className="absolute top-6 right-6 text-gray-800"
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-label="Close menu"
                    >
                        <X className="h-8 w-8" />
                    </button>

                    {/* Menu Items */}
                    <nav className="flex flex-col items-center space-y-6 flex-grow justify-center">
                        {items.map((item, index) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-gray-800 text-xl font-medium hover:text-pink-500 transition-all opacity-0 animate-fade-in"
                                onClick={() => setIsMobileMenuOpen(false)}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Booking Button */}
                    <Button className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-8 py-3">
                        Programări
                    </Button>

                    {/* Footer Section */}
                    <div className="w-full px-6 text-center mt-6 mb-6">
                        <div className="border-t border-gray-300 pt-4 flex flex-col items-center space-y-2">
                            <span className="text-gray-500 text-sm">
                                &copy; {new Date().getFullYear()} Slim & Beauty by M.C.
                            </span>
                            <div className="flex space-x-4">
                                {socialData.map((item, index) => (
                                    <Link key={`social-icon-mobile-menu-no-${index}`} href={item.link} target="_blank" className="text-gray-500 hover:text-pink-500">
                                        <Image 
                                            src={item.icon}
                                            alt={item.alt}
                                            width={20}
                                            height={20}
                                        />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </header>
    );
};

export default Navbar;