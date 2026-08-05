import Image from "next/image";
import Link from "next/link";
import { getFeaturedServices } from "@/lib/utils";

const FeaturedServices = () => {
  const featured = getFeaturedServices();

  return (
    <section id="featured" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Tratamentele Noastre Populare
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descoperă cele mai eficiente tratamente pentru remodelare corporală și întinerirea pielii. De la masaj anticelulitic până la EMSlim Neo RF și bronzare organică, avem soluții pentru orice tip de corp și nevoie!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((service, index) => (
            <div key={index} className="reveal">
              <Link
                href={service.href}
                className="group relative block overflow-hidden rounded-2xl shadow-lg"
              >
                <div className="relative h-[400px] w-full">
                  <Image
                    src={service.image}
                    alt={`Tratament ${service.name} la Slim & Beauty by MC`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-playfair text-xl font-semibold">{service.name}</h3>
                    <div className="bg-pink-600 text-white text-sm px-3 py-1 rounded-full">
                      {service.price + ' RON'}
                    </div>
                  </div>
                  <p className="text-white/80 text-sm mb-4">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-white/70 text-sm">
                      {/* Clock Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3.5A8.5 8.5 0 1 0 20.5 12 8.51 8.51 0 0 0 12 3.5Zm0 15A6.5 6.5 0 1 1 18.5 12 6.51 6.51 0 0 1 12 18.5ZM12 7a1 1 0 0 1 1 1v3.59l2.7 2.7a1 1 0 1 1-1.42 1.42l-3-3A1 1 0 0 1 11 12V8a1 1 0 0 1 1-1Z" />
                      </svg>
                      {service.duration + " min"}
                    </span>

                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
