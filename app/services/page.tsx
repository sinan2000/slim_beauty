import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const servicesCategories = [
  {
    id: 'remodelare-corporala',
    title: 'Remodelare Corporală',
    description: 'Tratamente avansate pentru conturarea corpului, reducerea grăsimii și tonifierea musculaturii.',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    services: [
      { id: 'emslim-neo', name: 'EMSlim Neo RF' },
      { id: 'cryolipolysis', name: 'Cryolipolysis' },
      { id: 'vacuum-therapy', name: 'Vacuum Therapy' },
      { id: 'lymphatic-drainage', name: 'Lymphatic Drainage' },
      { id: 'radiofrequency', name: 'Radiofrequency Treatment' },
      { id: 'ultrasound-cavitation', name: 'Ultrasound Cavitation' }
    ]
  },
  {
    id: 'dermatocosmetica',
    title: 'Dermatocosmetică',
    description: 'Tratamente faciale premium pentru îngrijirea pielii, anti-aging și strălucire naturală.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    services: [
      { id: 'hydrafacial', name: 'Hydrafacial Deluxe' },
      { id: 'microdermabrasion', name: 'Microdermabrasion' },
      { id: 'led-therapy', name: 'LED Light Therapy' },
      { id: 'anti-aging', name: 'Anti-Aging Treatment' },
      { id: 'acne-treatment', name: 'Acne Treatment' },
      { id: 'chemical-peels', name: 'Chemical Peels' }
    ]
  }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Page Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-pink-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Serviciile Noastre
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descoperă gama noastră completă de tratamente premium pentru remodelare corporală și îngrijire facială.
          </p>
        </div>
      </section>

      {/* Services Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {servicesCategories.map((category) => (
              <div key={category.id} className="flex-1 group">
                <div className="h-full rounded-2xl overflow-hidden shadow-lg border border-pink-100 transition-all duration-300 hover:shadow-xl hover:border-pink-200 flex flex-col">
                  {/* Category Image */}
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white">
                        {category.title}
                      </h2>
                    </div>
                  </div>

                  {/* Category Description */}
                  <div className="p-6 flex-grow">
                    <p className="text-gray-600 mb-6">
                      {category.description}
                    </p>

                    {/* Services List */}
                    <ul className="space-y-3 mb-8">
                      {category.services.map((service) => (
                        <li key={service.id} className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-pink-500 mr-3"></div>
                          <Link
                            href={`/services/${category.id}/${service.id}`}
                            className="text-gray-700 hover:text-pink-500 transition-colors"
                          >
                            {service.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* View All Button */}
                  <div className="px-6 pb-6 mt-auto">
                    <Link href={`/services/${category.id}`}>
                      <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white group">
                        Vezi Toate Serviciile
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="py-16 bg-pink-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl font-bold text-gray-800 mb-4">
            Nu ești sigur ce tratament ți se potrivește?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Programează o consultație gratuită și te vom ajuta să alegi tratamentele potrivite pentru nevoile tale.
          </p>
          <Button className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-8 py-6 text-lg">
            Programează Consultație
          </Button>
        </div>
      </section>

    </main>
  );
}