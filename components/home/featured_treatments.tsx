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
            Our Featured Treatments
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience our most popular and effective beauty and wellness treatments, designed to help you look and feel your best.
          </p>
        </div>

        <FeaturedMotion />
      </div>
    </section>
  );
};

export default FeaturedServices;