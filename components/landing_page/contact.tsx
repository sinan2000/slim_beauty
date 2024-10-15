import { Facebook, Instagram, MapPin, Phone } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Link from 'next/link';

export default function Contact() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-semibold text-center mb-12">Contactează-ne</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <form className="space-y-4">
                            <Input type="text" placeholder="Numele tău" />
                            <Input type="email" placeholder="Adresa ta de email" />
                            <Input type="tel" placeholder="Numărul tău de telefon" />
                            <select className="w-full p-2 border rounded-md">
                                <option>Selectează un serviciu</option>
                                <option>VShape Anticelulitic</option>
                                <option>Criolipoliză</option>
                                <option>EMSlim Neo RF</option>
                                <option>Radiofrecvență Bipolară</option>
                                <option>Masaj Vacuum Anticelulitic</option>
                                <option>Presoterapie</option>
                                <option>Dermapen cu Microneedling</option>
                                <option>Microdermabraziune</option>
                                <option>Tratament Clasic de Curățire</option>
                            </select>
                            <Textarea placeholder="Mesajul tău" />
                            <Button type="submit" className="w-full">Trimite mesajul</Button>
                        </form>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <MapPin className="w-5 h-5 text-primary" />
                            <span>strada Petofi Sandor 101, Dumbrăvița, Romania</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Phone className="w-5 h-5 text-primary" />
                            <span>+40 733 407 329</span>
                        </div>
                        <div className="flex items-center space-x-4 mt-4">
                            <Link href="https://www.instagram.com/slim_beauty_by_mc/" className="text-primary hover:text-primary/80">
                                <Instagram className="w-6 h-6" />
                            </Link>
                            <Link href="#" className="text-primary hover:text-primary/80">
                                <Facebook className="w-6 h-6" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}