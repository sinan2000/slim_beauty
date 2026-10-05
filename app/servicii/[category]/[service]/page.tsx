import {
  Lightbulb,
  Check,
  Sparkles,
  Phone,
} from 'lucide-react';
import FAQ from '@/components/faq-detail';
import MediaGalery from '@/components/gallery';
import { notFound, permanentRedirect } from 'next/navigation';
import { normalizeString, oldSlug } from '@/lib/utils';
import { services } from '@/lib/data';
import Breadcrumbs from '@/components/breadcrumbs';
import { detailPageMeta } from '@/lib/metadatas';
import { generateFAQSchema, generateServiceSchema } from '@/lib/jsonLds';
import { sessions } from '@/lib/utils';

export default async function ServicePage({ params }: { params: Promise<{ category: string; service: string }> }) {
  const { category, service } = await params;

  const categoryData = services.find((item) => normalizeString(item.category) === category);
  if (!categoryData) {
    const old_cat = services.find((i) => oldSlug(i.category) === category);
    if (old_cat) {
      const old_serv = old_cat.items.find((i) => oldSlug(i.title) === service);
      if (old_serv) {
        permanentRedirect(`/servicii/${normalizeString(old_cat.category)}/${normalizeString(old_serv.title)}`);
      }
    }
    notFound();
  }

  const serviceData = categoryData.items.find((item) => normalizeString(item.title) === service);

  if (!serviceData) {
    notFound();
  }

  const hasMedia = serviceData.media && serviceData.media.length > 0;

  const map_sedinta = ['o ședință', '6 ședințe', '10 ședințe'];
  const map_sedinta_2 = ['o ședință', '2 ședințe', '3 ședințe'];

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        id="individual-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateServiceSchema(category === "remodelare-corporala" ? 0 : 1, serviceData.title)) }}
      />

      <script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(serviceData.faq)) }}
      />

      <Breadcrumbs category={categoryData.category} service={serviceData.title} />

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
          {serviceData.isNew && (
            <div className="inline-flex items-center gap-1.5 bg-pink-100 text-pink-600 px-4 py-1 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              NOU LA SLIM & BEAUTY
            </div>
          )}
        </div>

        {/* Medium Description */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-lg text-gray-700">
            {serviceData.mediumDescription}
          </p>
        </div>

        {/* Gallery Section */}
        {hasMedia && (<MediaGalery media={serviceData.media} title={serviceData.title} />)}

        {/* Information Panel */}
        <div className="grid gap-8 mb-16 md:grid-cols-2">
          {/* Pricing Table, or an evaluation card for services priced after consultation */}
          {serviceData.price.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow-sm w-full md:w-auto flex flex-col">
            <h3 className="font-serif text-xl font-semibold text-gray-900 mb-2">
              Preț personalizat
            </h3>
            <p className="text-gray-700 mb-6">
              Programează-te pentru evaluare și află care este protocolul potrivit pentru tine. Pentru detalii despre preț, te rugăm să ne contactezi.
            </p>
            <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href="tel:+40733407329"
                className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white rounded-full px-6 py-2.5 text-sm font-medium transition-colors"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Sună pentru evaluare
              </a>
              <a
                href={`https://api.whatsapp.com/send?phone=40733407329&text=${encodeURIComponent(`Bună ziua! Aș dori o evaluare pentru ${serviceData.title}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-pink-600 hover:text-pink-700 underline underline-offset-4"
              >
                sau scrie-ne pe WhatsApp
              </a>
            </div>
          </div>
          ) : (
          <div className="bg-white p-6 rounded-xl shadow-sm w-full md:w-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-xl font-semibold text-gray-900">
                Lista de prețuri
              </h3>

              <span className="flex items-center gap-1 text-gray-500 text-sm">
                {/* Clock Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3.5A8.5 8.5 0 1 0 20.5 12 8.51 8.51 0 0 0 12 3.5Zm0 15A6.5 6.5 0 1 1 18.5 12 6.51 6.51 0 0 1 12 18.5ZM12 7a1 1 0 0 1 1 1v3.59l2.7 2.7a1 1 0 1 1-1.42 1.42l-3-3A1 1 0 0 1 11 12V8a1 1 0 0 1 1-1Z" />
                </svg>
                {serviceData.duration} min/ ședință
              </span>

            </div>
            <div className="overflow-x-auto mb-2">
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
                  {serviceData.price.map((price, index) => {
                    const isCrio = serviceData.title === 'Criolipoliză';
                    const basePrice = serviceData.price[0];
                    const sessionCount = sessions(index, isCrio);
                    const perSessionPrice = price / sessionCount;

                    const discount = index === 0
                      ? "-"
                      : `${Math.round(100 - (perSessionPrice / basePrice) * 100)}%`;

                    return (
                      <tr key={index}>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {!isCrio ? map_sedinta[index] : map_sedinta_2[index]}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{price} RON</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className={`text-sm font-medium ${index === 0 ? "text-gray-500" : "text-pink-600"}`}>
                            {discount}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>
          )}

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
                  {normalText === undefined ? (
                    <span className="ml-3 text-gray-700">{boldText}</span>
                  ) : (
                    <span className="ml-3 text-gray-700"><strong>{boldText}:</strong>{normalText}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <FAQ input={serviceData.faq} />
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; service: string }> }) {
  return detailPageMeta({ params });
}

export async function generateStaticParams() {
  return services.flatMap((category) =>
    category.items.map((service) => ({
      category: normalizeString(category.category),
      service: normalizeString(service.title),
    })));
}