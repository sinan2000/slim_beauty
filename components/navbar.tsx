'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image"
import Link from "next/link"
import { Button } from '@/components/ui/button';
import { Menu, X, Instagram, Facebook } from 'lucide-react';
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [mobileMenu, setMobileMenu] = useState(false);
    const pathname = usePathname();

    const items = [
        { name: "Acasă", href: "/" },
        { name: "Servicii", href: "/servicii" },
        { name: "Despre Noi", href: "/despre-noi" },
        { name: "Contact", href: "/#contact" }
    ]

    useEffect(() => {
        setMobileMenu(false);
    }, [pathname]);

    const toggleMenu = () => {
        setMobileMenu(!mobileMenu)
    }

    return (
        <header className="bg-[#F7F7F7] shadow-sm sticky top-0 z-20">
            {/* Desktop Menu */}
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href='/'>
                    <Image
                        src="/logo.jpg"
                        alt="Slim & Beauty by MC Logo"
                        width={150}
                        height={75}
                        className="w-36 h-auto"
                        priority
                    />
                </Link>
                <nav className="hidden md:flex items-center space-x-6">
                    <ul className="flex space-x-6">
                        {items.map(item => (
                            <li key={item.name}>
                                <Link href={item.href} key={item.name} className="text-[#6B4E32] hover:text-primary">{item.name}</Link>
                            </li>
                        ))}
                    </ul>
                    <Link href="/#rezervare">
                        <Button variant="default" className="bg-primary text-white hover:bg-primary/90">
                            Rezervă acum
                        </Button>
                    </Link>
                </nav>
                <div className="flex items-center space-x-4 md:hidden">
                    <Link href="/#rezervare">
                        <Button variant="default" className="bg-primary text-white hover:bg-primary/90">
                            Rezervă acum
                        </Button>
                    </Link>
                    <Button size="sm" variant="ghost" onClick={toggleMenu}>
                        <Menu className="h-6 w-6 text-[#6B4E32]" />
                        <span className="sr-only">Deschide meniul</span>
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden fixed inset-y-0 right-0 transform ${mobileMenu ? 'translate-x-0' : 'translate-x-full'} w-64 bg-[#F7F7F7] shadow-lg transition duration-300 ease-in-out z-20 overflow-y-auto`}>
                <div className="p-6 flex flex-col h-full">
                    <div className="flex justify-end mb-8">
                        <Button size="sm" variant="ghost" onClick={toggleMenu}>
                            <X className="h-6 w-6 text-[#6B4E32]" />
                            <span className="sr-only">Închide meniul</span>
                        </Button>
                    </div>
                    <nav className="flex-grow">
                        <ul className="space-y-6">
                            {items.map(item => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-[#6B4E32] hover:text-primary text-lg font-medium block">{item.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <Link href="/#rezervare">
                        <div className="flex justify-center mt-6">
                            <Button variant="default" className="bg-primary text-white hover:bg-primary/90">
                                Rezervă acum
                            </Button>
                        </div>
                    </Link>

                    {/* Social Icons */}
                    <div className="flex justify-center space-x-4 mt-6 mb-2">
                        <Link href="https://www.instagram.com/slimandbeautybymc/" className="text-[#6B4E32] hover:text-primary" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                            <Instagram className="h-6 w-6" />
                        </Link>
                        <Link href="https://www.facebook.com/SalonSlimBeautyByMc" className="text-[#6B4E32] hover:text-primary" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                            <Facebook className="h-6 w-6" />
                        </Link>
                    </div>

                    <div className="mt-auto pt-6 border-t border-gray-200">
                        <p className="text-sm text-[#6B4E32] text-center">© {new Date().getFullYear()} Slim & Beauty by MC.</p>
                    </div>
                </div>
            </div>
        </header>
    )
}