import Pricing from "./pricing";

export default function NoBookingPricing() {
  return (
    <section id="preturi" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Listă de prețuri
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Vezi prețurile tratamentelor noastre.
          </p>
        </div>

        <div className="reveal max-w-5xl mx-auto">
          <div className="border rounded-lg p-6 shadow-xs bg-white w-full">
            <Pricing />
          </div>
        </div>
      </div>
    </section>
  );
}
