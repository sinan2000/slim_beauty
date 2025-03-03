import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { services } from '@/lib/data';
import { getFirstImage, normalizeString } from '@/lib/utils';
import Breadcrumbs from '@/components/breadcrumbs';

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;

  const cat = services.find((i) => normalizeString(i.category) === category);

  if (!cat) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Page Header */}

      <section
        className="pt-32 pb-16 bg-cover bg-center relative"
        style={{ backgroundImage: `url('${cat.media.src}')` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <Link
            href="/servicii"
            className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Înapoi la Servicii
          </Link>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
            {cat.category}
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto">
            {cat.description}
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cat.items.map((service, index) => (
              <Link
                key={index}
                href={`/servicii/${category}/${normalizeString(service.title)}`}
                className="group"
              >
                <div className="h-full rounded-2xl overflow-hidden shadow-lg border border-pink-100 transition-all duration-300 hover:shadow-xl hover:border-pink-200">
                  {/* Service Image */}
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={getFirstImage(service.media)}
                      alt={'Photo of ' + service.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  </div>

                  {/* Service Info */}
                  <div className="p-6">
                    <h2 className="font-playfair text-xl font-bold text-gray-800 mb-2 group-hover:text-pink-500 transition-colors">
                      {service.title}
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