import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Scissors, Sparkles, Star, Phone, MapPin, Instagram, Facebook } from 'lucide-react'
import Hero from '@/components/landing_page/hero'
import BodyCare from '@/components/landing_page/body_care'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDF8F5]">
      <main className="flex-grow pt-[86px]">
        <Hero />

        <BodyCare />

        {/* Facial Aesthetic Treatments Section */}
        <section className="py-16 bg-[#F5EBE6]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-12">Tratamente Faciale</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Scissors className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Dermapen cu Microneedling</h3>
                  <p className="text-muted-foreground">Rejuvenare și regenerare cutanată.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Sparkles className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Microdermabraziune</h3>
                  <p className="text-muted-foreground">Exfoliere și curățare profundă a pielii.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Star className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Tratament Clasic de Curățire</h3>
                  <p className="text-muted-foreground">Curățare facială în profunzime.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Before and After Results Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-12">Rezultate Transformatoare</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="relative">
                    <Image src={`/placeholder.svg?text=Înainte&width=400&height=300`} alt={`Înainte ${i}`} width={400} height={300} className="rounded-lg" />
                    <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded">Înainte</div>
                  </div>
                  <div className="relative">
                    <Image src={`/placeholder.svg?text=După&width=400&height=300`} alt={`După ${i}`} width={400} height={300} className="rounded-lg" />
                    <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded">După</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact & Booking Section */}
        <section className="py-16 bg-[#F5EBE6]">
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
      </main>

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
    </div>
  )
}