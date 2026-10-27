"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { company } from "@/lib/company";

const EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5563.776408245072!2d21.237380276850022!3d45.7934674114083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4745664d21d4fe81%3A0x53826fb23724ea2f!2sSlim%20%26%20Beauty%20by%20MC%20srl!5e0!3m2!1sen!2snl!4v1740953647768!5m2!1sen!2snl";
const MAPS_LINK = "https://www.google.com/maps/search/?api=1&query=Slim%20%26%20Beauty%20by%20MC%20Dumbr%C4%83vi%C8%9Ba";

/**
 * Google Maps sets its own cookies and pulls in the whole Maps JS API, so the
 * iframe only loads once the visitor asks for it.
 */
export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        src={EMBED_SRC}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        title="Locația salonului Slim & Beauty by MC pe Google Maps"
        className="absolute inset-0"
      />
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-white p-8 text-center text-gray-600">
      <MapPin className="h-10 w-10 text-pink-500" aria-hidden="true" />
      <p className="font-medium text-gray-800">{company.address}</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="rounded-full bg-pink-500 px-6 py-2.5 font-medium text-white transition-colors hover:bg-pink-600"
        >
          Afișează harta
        </button>
        <a
          href={MAPS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-pink-500 px-6 py-2.5 font-medium text-pink-600 transition-colors hover:bg-pink-50"
        >
          Deschide în Google Maps
        </a>
      </div>
      <p className="max-w-sm text-xs text-gray-500">
        Harta este oferită de Google, care poate seta cookie-uri proprii când o afișezi.
      </p>
    </div>
  );
}
