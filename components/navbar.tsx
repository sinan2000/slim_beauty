"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn, normalizeString } from '@/lib/utils';
import { socialData } from '@/lib/socials';
import { ChevronDown } from 'lucide-react';
import { services } from '@/lib/data';
import { navSchema } from '@/lib/jsonLds';

export default function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const items = [
        { name: "Acasă", href: "/", dropdown: false },
        { name: "Servicii", href: "/servicii", dropdown: true },
        { name: "Prețuri", href: "/?tab=pricing", dropdown: false },
        { name: "Contact", href: "/#contact", dropdown: false },
    ];

    useEffect(() => {
        if (pathname !== "/") {
            setIsScrolled(true);
            return;
        }

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname]);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-white/80 backdrop-blur-md shadow-xs py-3"
                    : "bg-transparent py-5"
            )}
        >
            <script
                id="nav-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(navSchema) }}
            />
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link href="/" className="flex items-center">
                    <Image
                        src='/icons/logo.svg'
                        alt="Slim & Beauty by MC logo"
                        width={48}
                        height={18}
                        priority
                        loading="eager"
                        className={cn(
                            "w-32 h-auto md:w-40 lg:w-48 transition-all",
                            isScrolled ? "" : "filter brightness-0 invert"
                        )}
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    {items.map((item) => (
                        item.dropdown ? (
                            <div key={item.name} className="relative group">
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "font-medium flex items-center gap-1 hover:text-pink-500 transition-colors",
                                        isScrolled ? "text-gray-700" : "text-white"
                                    )}
                                >
                                    {item.name}
                                    <ChevronDown
                                        className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
                                    />
                                </Link>

                                {/* Dropdown (Visible only on Desktop) */}
                                <div className="absolute left-0 mt-2 w-48 bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    {services.map((cat) => (
                                        <Link
                                            key={cat.category}
                                            href={`/servicii/${normalizeString(cat.category)}`}
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            {cat.category}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : (
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
                        )))}
                    <Link href="/?tab=booking">
                        <Button className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-6">
                            Programări
                        </Button>
                    </Link>
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
                    <Button
                        className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-8 py-3 opacity-0 animate-fade-in"
                        style={{ animationDelay: `${items.length * 100}ms` }}
                    >
                        Programări
                    </Button>

                    {/* Footer Section */}
                    <div
                        className="w-full px-6 text-center mt-6 mb-6 opacity-0 animate-fade-in"
                        style={{ animationDelay: `${items.length * 100 + 100}ms` }}
                    >
                        <div className="border-t border-gray-300 pt-4 flex flex-col items-center space-y-2">
                            <span className="text-gray-500 text-sm pb-2">
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