"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import FAQ from '../faq-detail';

const ContactLocation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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

        <motion.div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col h-full">
            <FAQ />
          </div>

          {isInView && (
            <div className="flex flex-col h-full">
              <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5563.776408245072!2d21.237380276850022!3d45.7934674114083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4745664d21d4fe81%3A0x53826fb23724ea2f!2sSlim%20%26%20Beauty%20by%20MC%20srl!5e0!3m2!1sen!2snl!4v1740953647768!5m2!1sen!2snl"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Slim & Beauty Location on Google Maps"
                ></iframe>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactLocation;