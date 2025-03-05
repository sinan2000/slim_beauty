import {
  WebSite,
  LocalBusiness,
  WithContext
} from "schema-dts";

export const webSiteSchema: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Slim & Beauty",
  "url": "https://www.slimandbeauty.ro",
  "description": "Slim & Beauty - Salon de înfrumusețare specializat în remodelare corporală și dermato cosmetică în Timișoara și Dumbrăvița.",
  "sameAs": [
    "https://www.facebook.com/SalonSlimBeautyByMc/",
    "https://www.instagram.com/slimandbeautybymc/"
  ]
}

export const localBusinessSchema: WithContext<LocalBusiness> = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": "Slim & Beauty",
  "image": "https://www.slimandbeauty.ro/logo-jsonld.png",
  "@id": "https://www.slimandbeauty.ro",
  "url": "https://www.slimandbeauty.ro",
  "telephone": "+40733407329",
  "priceRange": "$$",
  "description": "Slim & Beauty by MC oferă servicii profesionale dermato-cosmetice și proceduri de remodelare corporală în Dumbrăvița.",
  "currenciesAccepted": "RON",
  "paymentAccepted": "Cash",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Petofi Sandor 101",
    "addressLocality": "Dumbravita",
    "postalCode": "307160",
    "addressCountry": "RO"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 45.7934163,
    "longitude": 21.2399431
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Thursday"
    ],
    "opens": "12:00",
    "closes": "20:00"
  }, {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Wednesday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "17:00"
  }],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "15"
  },
  "sameAs": [
    "https://www.facebook.com/SalonSlimBeautyByMc/",
    "https://www.instagram.com/slimandbeautybymc/",
    "https://www.slimandbeauty.ro"
  ],
  "areaServed": {
    "@type": "Place",
    "name": "Timișoara, Romania"
  },
  "email": "cevikermihaela@gmail.com"
}