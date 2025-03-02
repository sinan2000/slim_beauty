import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { notFound } from 'next/navigation';

// Service categories data
const servicesData = {
  'remodelare-corporala': {
    title: 'Remodelare Corporală',
    description: 'Tratamente avansate pentru conturarea corpului, reducerea grăsimii și tonifierea musculaturii.',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    services: [
      {
        id: 'emslim-neo',
        name: 'EMSlim Neo RF',
        shortDescription: 'Tehnologie avansată pentru tonifierea musculară și reducerea grăsimii simultan.',
        image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
      },
      {
        id: 'cryolipolysis',
        name: 'Cryolipolysis',
        shortDescription: 'Tehnologie non-invazivă de înghețare a celulelor adipoase pentru reducerea grăsimii localizate.',
        image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
      },
      {
        id: 'vacuum-therapy',
        name: 'Vacuum Therapy',
        shortDescription: 'Masaj cu vacuum pentru îmbunătățirea circulației și reducerea celulitei.',
        image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
      },
      {
        id: 'lymphatic-drainage',
        name: 'Lymphatic Drainage',
        shortDescription: 'Masaj specializat pentru eliminarea toxinelor și reducerea retenției de apă.',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
      },
      {
        id: 'radiofrequency',
        name: 'Radiofrequency Treatment',
        shortDescription: 'Tratament pentru întinderea pielii și reducerea aspectului de coajă de portocală.',
        image: 'https://images.unsplash.com/photo-1598887142487-3c854d51d2c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
      },
      {
        id: 'ultrasound-cavitation',
        name: 'Ultrasound Cavitation',
        shortDescription: 'Tehnologie cu ultrasunete pentru distrugerea celulelor de grăsime și remodelarea corpului.',
        image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80'
      }
    ]
  },
  'dermatocosmetica': {
    title: 'Dermatocosmetică',
    description: 'Tratamente faciale premium pentru îngrijirea pielii, anti-aging și strălucire naturală.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    services: [
      {
        id: 'hydrafacial',
        name: 'Hydrafacial Deluxe',
        shortDescription: 'Tratament facial avansat pentru curățare, exfoliere, extracție și hidratare.',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
      },
      {
        id: 'microdermabrasion',
        name: 'Microdermabrasion',
        shortDescription: 'Exfoliere mecanică pentru îmbunătățirea texturii pielii și reducerea imperfecțiunilor.',
        image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
      },
      {
        id: 'led-therapy',
        name: 'LED Light Therapy',
        shortDescription: 'Terapie cu lumină LED pentru tratarea acneei, reducerea inflamației și stimularea colagenului.',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80'
      },
      {
        id: 'anti-aging',
        name: 'Anti-Aging Treatment',
        shortDescription: 'Tratament complex pentru reducerea ridurilor și îmbunătățirea elasticității pielii.',
        image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
      },
      {
        id: 'acne-treatment',
        name: 'Acne Treatment',
        shortDescription: 'Tratament specializat pentru reducerea acneei și prevenirea cicatricilor.',
        image: 'https://images.unsplash.com/photo-1612908689356-3c2a2d0c2e58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
      },
      {
        id: 'chemical-peels',
        name: 'Chemical Peels',
        shortDescription: 'Exfoliere chimică pentru îmbunătățirea aspectului pielii și tratarea hiperpigmentării.',
        image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
      }
    ]
  }
};

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = servicesData[params.category as keyof typeof servicesData];

  // If category doesn't exist, return 404
  if (!category) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Page Header */}
      <section
        className="pt-32 pb-16 bg-cover bg-center relative"
        style={{ backgroundImage: `url('${category.image}')` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <Link
            href="/services"
            className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Înapoi la Servicii
          </Link>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
            {category.title}
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto">
            {category.description}
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${params.category}/${service.id}`}
                className="group"
              >
                <div className="h-full rounded-2xl overflow-hidden shadow-lg border border-pink-100 transition-all duration-300 hover:shadow-xl hover:border-pink-200">
                  {/* Service Image */}
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  </div>

                  {/* Service Info */}
                  <div className="p-6">
                    <h2 className="font-playfair text-xl font-bold text-gray-800 mb-2 group-hover:text-pink-500 transition-colors">
                      {service.name}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {service.shortDescription}
                    </p>
                    <div className="flex items-center text-pink-500 font-medium">
                      Vezi detalii
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="py-16 bg-pink-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl font-bold text-gray-800 mb-4">
            Dorești mai multe informații?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Echipa noastră de specialiști îți stă la dispoziție pentru a răspunde la orice întrebare și a te ajuta să alegi tratamentul potrivit.
          </p>
          <Button className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-8 py-6 text-lg">
            Contactează-ne
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}