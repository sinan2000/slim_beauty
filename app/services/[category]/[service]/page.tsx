import Link from "next/link";
import { ArrowLeft, Clock, Check, Plus, Minus, Info } from "lucide-react";
import { notFound } from "next/navigation";
import { services } from "@/lib/data";
import { normalizeString } from "@/lib/utils";
import ImageGallery from "@/components/gallery";

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${serviceData.media[0].src})` }}>
        </div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
          {serviceData.featured && (
            <span className="mb-4 uppercase text-sm tracking-wide bg-pink-500 text-white px-3 py-1 rounded-full shadow-md">
              Preferat de clientele noastre
            </span>
          )}
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-center max-w-4xl">
            {serviceData.title}
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Navigation */}
        <Link href={`/servicii/${category}`} className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-12 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Înapoi la {getCategoryName(category)}
        </Link>

        {/* Service Introduction */}
        <div className="mb-16">
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-4xl">
            {serviceData.mediumDescription}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="text-gray-600 space-y-4">
              {serviceData.longDescription.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="space-y-8">
              {/* Fact Card */}
              {serviceData.fact && (
                <div className="bg-pink-50 border border-pink-200 rounded-lg p-6">
                  <div className="flex items-start mb-3">
                    <Info className="h-5 w-5 text-pink-500 mr-2 mt-1 flex-shrink-0" />
                    <h3 className="font-medium text-lg text-gray-800">Știați că?</h3>
                  </div>
                  <p className="text-gray-700">{serviceData.fact}</p>
                </div>
              )}

              {/* Pricing and Duration for non-mobile */}
              <div className="hidden lg:block">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-4 border-b bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-800">Informații rapide</h3>
                  </div>
                  <div className="p-4">
                    {/* Duration */}
                    {serviceData.duration && (
                      <div className="flex items-center mb-4 pb-4 border-b border-gray-100">
                        <Clock className="h-5 w-5 text-pink-500 mr-3" />
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 uppercase">Durată</h4>
                          <p className="text-lg text-gray-800">{serviceData.duration}</p>
                        </div>
                      </div>
                    )}

                    {/* Price Preview */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Preț</h4>
                      {Array.isArray(serviceData.price) ? (
                        <p className="text-lg text-gray-800">
                          De la <span className="font-bold text-xl">{serviceData.price[0]} RON</span>
                        </p>
                      ) : (
                        <p className="text-lg font-bold text-gray-800">{serviceData.price} RON</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <ImageGallery media={serviceData.media} />

        {/* Benefits */}
        {serviceData.benefits && serviceData.benefits.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-serif font-bold mb-8">Beneficii</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {serviceData.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 rounded-lg transition-transform hover:scale-105"
                >
                  <Check className="h-5 w-5 text-pink-500 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-lg text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pricing - Mobile and tablet view */}
        <div className="mb-16 lg:hidden">
          <h2 className="text-3xl font-serif font-bold mb-8">Prețuri</h2>

          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex-grow max-w-md">
              {Array.isArray(serviceData.price) ? (
                <div>
                  <div className="p-6 border-b">
                    <h3 className="text-xl font-semibold mb-2">Pachete disponibile</h3>
                  </div>
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pachet</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Preț (RON)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="bg-pink-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1 sesiune</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-xl text-gray-800">{serviceData.price[0]}</td>
                      </tr>
                      {serviceData.price[1] && (
                        <tr className="bg-white">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3 sesiuni</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-xl text-gray-800">{serviceData.price[1]}</td>
                        </tr>
                      )}
                      {serviceData.price[2] && (
                        <tr className="bg-pink-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">5 sesiuni</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-xl text-gray-800">{serviceData.price[2]}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Preț standard</h3>
                  <p className="text-3xl font-bold text-gray-800">{serviceData.price} RON</p>
                </div>
              )}
            </div>

            {serviceData.duration && (
              <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
                <Clock className="h-5 w-5 text-gray-500 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase">Durată</h3>
                  <p className="text-xl text-gray-800">{serviceData.duration}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Detailed Pricing - Desktop view */}
        <div className="hidden lg:block mb-16">
          <h2 className="text-3xl font-serif font-bold mb-8">Detalii de preț</h2>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {Array.isArray(serviceData.price) ? (
              <div>
                <div className="p-6 border-b">
                  <h3 className="text-xl font-semibold mb-2">Pachete disponibile</h3>
                </div>
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pachet</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Preț (RON)</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Economie</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-pink-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1 sesiune</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-xl text-gray-800">{serviceData.price[0]}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">-</td>
                    </tr>
                    {serviceData.price[1] && (
                      <tr className="bg-white">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3 sesiuni</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-xl text-gray-800">{serviceData.price[1]}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-green-600">
                          {Math.round((1 - serviceData.price[1] / (serviceData.price[0] * 3)) * 100)}%
                        </td>
                      </tr>
                    )}
                    {serviceData.price[2] && (
                      <tr className="bg-pink-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">5 sesiuni</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-xl text-gray-800">{serviceData.price[2]}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-green-600">
                          {Math.round((1 - serviceData.price[2] / (serviceData.price[0] * 5)) * 100)}%
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Preț standard</h3>
                <p className="text-3xl font-bold text-gray-800">{serviceData.price} RON</p>
              </div>
            )}
          </div>
        </div>

        {/* FAQ */}
        {serviceData.faq && serviceData.faq.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-serif font-bold mb-8">Întrebări frecvente</h2>

            <div className="space-y-4">
              {serviceData.faq.map((item, index) => (
                <FaqItem key={index} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-16">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">Programează o sesiune acum</h2>
          <Link
            href="/contact"
            className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-md"
          >
            Rezervă o programare
          </Link>
        </div>
      </div>
    </div>
  );
}

// FAQ Item Component with accordion functionality
function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group bg-white rounded-lg shadow-sm overflow-hidden">
      <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
        <h3 className="font-semibold text-lg">{question}</h3>
        <span className="ml-6 flex-shrink-0 text-gray-400 group-open:hidden">
          <Plus className="h-5 w-5" />
        </span>
        <span className="ml-6 flex-shrink-0 text-gray-400 hidden group-open:block">
          <Minus className="h-5 w-5" />
        </span>
      </summary>
      <div className="px-6 pb-6 text-gray-600">
        <p>{answer}</p>
      </div>
    </details>
  );
}

// Helper function to get category name
function getCategoryName(categorySlug: string): string {
  const categories: Record<string, string> = {
    "remodelare-corporala": "Remodelare Corporală",
    "dermato-cosmetica": "Dermato Cosmetică"
  };

  return categories[categorySlug] || categorySlug;
}