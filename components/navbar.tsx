import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Navbar() {
    return (
        <header className="bg-white shadow-sm fixed w-full z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Image
                    src="/logo.jpg"
                    alt="Slim & Beauty by MC Logo"
                    width={150}
                    height={75}
                    className="w-36 h-auto"
                />
                <nav className="hidden md:block">
                    <ul className="flex space-x-6">
                        <li><Link href="#" className="text-muted-foreground hover:text-primary">Acasă</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-primary">Servicii</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-primary">Despre Noi</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-primary">Contact</Link></li>
                    </ul>
                </nav>
                <Button size="sm" className="md:hidden">Meniu</Button>
            </div>
        </header>
    )
}