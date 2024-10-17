import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, MapPin, Phone } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-[#3D2B1F] text-[#F5EBE6]">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Despre Noi</h3>
                        <p className="text-sm">
                            Slim & Beauty by MC oferă servicii de înfrumusețare și remodelare corporală de înaltă calitate, folosind tehnologii avansate și produse premium.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Pagini</h3>
                        <ul className="text-sm space-y-2">
                            <li><Link href="/">Acasă</Link></li>
                            <li><Link href="/servicii">Servicii</Link></li>
                            <li><Link href="/despre-noi">Despre noi</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <ul className="text-sm space-y-2">
                            <li className="flex items-center">
                                <Phone className="w-5 h-5 mr-2" />
                                +40 733 407 329
                            </li>
                            <li className="flex items-center"><MapPin className="w-5 h-5 mr-2" /> 
                                Dumbrăvița, str. Petőfi Sándor 101</li>
                        </ul>
                        <div className="flex space-x-4 mt-4">
                            <a href="https://www.facebook.com/SalonSlimBeautyByMc" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#C2A884]">
                                <Facebook size={24} />
                                <span className="sr-only">Facebook</span>
                            </a>
                            <a href="https://www.instagram.com/slimandbeautybymc/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#C2A884]">
                                <Instagram size={24} />
                                <span className="sr-only">Instagram</span>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Legal</h3>
                        <div className="space-y-4">
                            <Link href="https://anpc.ro/" target="_blank" rel="noopener noreferrer">
                                <Image
                                    src="/anpc.avif"
                                    alt="ANPC Logo"
                                    width={282}
                                    height={70}
                                    className="max-w-[200px]"
                                />
                            </Link>
                            <Link href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener noreferrer">
                                <Image
                                    src="/anpc_sal.avif"
                                    alt="ANPC SAL Logo"
                                    width={282}
                                    height={70}
                                    className="max-w-[200px]"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-[#6B4E32] text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Slim & Beauty by MC. Toate drepturile rezervate.</p>
                </div>
            </div>
        </footer>
    )
}