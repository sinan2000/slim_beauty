import {
  Clock,
  Lightbulb,
  Check,
} from 'lucide-react';
import FAQ from '@/components/faq-detail';
import MediaGalery from '@/components/gallery';
import { notFound } from 'next/navigation';
import { normalizeString } from '@/lib/utils';
import { services } from '@/lib/data';
import Link from 'next/link';

export default async function ServicePage({ params }: { params: Promise<{ category: string; service: string }> }) {
  const { category, service } = await params;

  const categoryData = services.find((item) => normalizeString(item.category) === category);
  if (!categoryData) {
    notFound();
  }

  const serviceData = categoryData.items.find((item) => normalizeString(item.title) === service);

  if (!serviceData) {
    notFound();
  }

  const gallery_items = serviceData.media && serviceData.media.length > 0 ? serviceData.media : ['/placeholder.svg'];

  const map_sedinta = ['1 ședință', '6 ședințe', '10 ședințe'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            {serviceData.title}
          </h1>
          {serviceData.featured && (
            <div className="inline-block bg-pink-100 text-pink-600 px-4 py-1 rounded-full text-sm font-medium">
              PREFERAT DE CLIENTELE NOASTRE
            </div>
          )}
        </div>

        {/* Medium Description */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-lg text-gray-700">
            Tratamentul nostru Slim & Beauty combină tehnologii avansate pentru a reduce celulita,
            a tonifica pielea și a remodela silueta. O experiență relaxantă cu rezultate vizibile
            chiar de la prima ședință.
          </p>
        </div>

        {/* Gallery Section */}
        <MediaGalery media={gallery_items} />

        {/* Information Panel */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {serviceData.duration !== '' && (
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <Clock className="h-6 w-6 text-pink-500 mr-2" />
                <h3 className="font-serif text-xl font-semibold text-gray-900">
                  Durata unei ședințe
                </h3>
              </div>
              <p className="text-gray-700 text-lg mb-4">
                {serviceData.duration}
              </p>
              <Link
                href="/contact"
                className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-md"
              >
                Rezervă o programare
              </Link>
            </div>
          )}

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
              Lista de prețuri
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pachet
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Preț
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Economie
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {serviceData.price.map((price, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{map_sedinta[index]}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{price + " RON"}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500 text-pink-600 font-medium">{index === 0 ? '-' : serviceData.price[0] / (price / (index === 1 ? 6 : 10))}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Long Description */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6 text-center">
            Despre {serviceData.title}
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            {serviceData.longDescription.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Interesting Fact Panel */}
        <div className="bg-pink-50 rounded-xl p-6 mb-16 shadow-sm">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <Lightbulb className="h-6 w-6 text-pink-500" />
            </div>
            <div className="ml-4">
              <h3 className="font-serif text-xl font-semibold text-gray-900 mb-2">
                Știați că...?
              </h3>
              <p className="text-gray-700">
                {serviceData.fact}
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="font-serif text-3xl font-bold text-gray-900 mb-8 text-center">
            Beneficiile Tratamentului
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceData.benefits.map((benefit, index) => {
              const [boldText, normalText] = benefit.split(':');
              return (
                <div key={index} className="flex items-start bg-white p-5 rounded-lg shadow-sm">
                  <Check className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                  <span className="ml-3 text-gray-700"><strong>{boldText}:</strong>{normalText}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <FAQ faqs={serviceData.faq} />
      </div>
    </div>
  );
}