import FAQ from '../faq-detail';
import { MapEmbed } from './map-embed';

const ContactLocation = () => {
  return (
    <section id="contact" className="py-20 bg-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Contact & Locație
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Vizitează salonul nostru în Dumbrăvița sau contactează-ne pentru mai multe detalii despre serviciile noastre.
          </p>
        </div>

        <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-12 h-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col h-full">
            <FAQ />
          </div>

          <div className="flex flex-col h-full">
            <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden shadow-lg">
              <MapEmbed />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactLocation;
