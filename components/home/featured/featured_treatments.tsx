'use client';
import dynamic from "next/dynamic";

const FeaturedMotion = dynamic(() => import("./featured_treatments_2"), {
  ssr: false,
});

const FeaturedServices = () => {
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

        <FeaturedMotion />

      </div>
    </section>
  );
};

export default FeaturedServices;