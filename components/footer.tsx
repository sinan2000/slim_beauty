import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Footer() {
    return (
        <footer className="bg-[#2C2C2C] text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Despre Noi</h3>
                        <p className="text-sm text-gray-400">Slim & Beauty by MC este destinația ta pentru tratamente dermato-cosmetice și de remodelare corporală avansate.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Link-uri Rapide</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-sm text-gray-400 hover:text-white">Acasă</Link></li>
                            <li><Link href="#" className="text-sm text-gray-400 hover:text-white">Servicii</Link></li>
                            <li><Link href="#" className="text-sm text-gray-400 hover:text-white">Despre Noi</Link></li>
                            <li><Link href="#" className="text-sm text-gray-400 hover:text-white">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <p className="text-sm text-gray-400">strada Petofi Sandor 101, Dumbrăvița, Romania</p>
                        <p className="text-sm text-gray-400">+40 733 407 329</p>
                        <p className="text-sm text-gray-400">info@slimandbeauty.ro</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                        <form className="space-y-2">
                            <Input type="email" placeholder="Adresa ta de email" className="bg-gray-800 border-gray-700 text-white" />
                            <Button type="submit" className="w-full">Abonează-te</Button>
                        </form>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-800 text-center">
                    <p className="text-sm text-gray-400">&copy; 2024 Slim & Beauty by MC. Toate drepturile rezervate.</p>
                </div>
            </div>
        </footer>
    )
}