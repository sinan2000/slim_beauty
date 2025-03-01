// components/navbar/index.tsx
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import { Button } from '@/components/ui/button';

export default function Navbar() {
    const items = [
        { name: "Acasă", href: "/" },
        { name: "Servicii", href: "/servicii" },
        { name: "Despre Noi", href: "/despre-noi" },
        { name: "Contact", href: "/#contact" },
    ];

    return (
        <header className="bg-[#F7F7F7] shadow-xs sticky top-0 z-20">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/">
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
                        {items.map((item) => (
                            <li key={item.name}>
                                <Link href={item.href} className="text-[#6B4E32] hover:text-primary">
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <Link href="/#rezervare">
                        <Button variant="default" className="bg-primary text-white hover:bg-primary/90">
                            Rezervă acum
                        </Button>
                    </Link>
                </nav>
                {/* Include the client component */}
                <MobileMenu items={items} />
            </div>
        </header>
    );
}
