import {
  WebSite,
  LocalBusiness,
  SiteNavigationElement,
  BreadcrumbList,
  WithContext,
  ListItem
} from "schema-dts";
import { normalizeString } from "./utils";

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

export const navSchema: WithContext<SiteNavigationElement> = {
  "@context": "https://schema.org",
  "@type": "SiteNavigationElement",
  "name": "Main Navigation",
  "description": "Principal navigation links",
  "hasPart": [
    {
      "@type": "SiteNavigationElement",
      "name": "Acasă",
      "url": "https://www.slimandbeauty.ro"
    },
    {
      "@type": "SiteNavigationElement",
      "name": "Servicii",
      "url": "https://www.slimandbeauty.ro/servicii",
      "hasPart": [
        {
          "@type": "SiteNavigationElement",
          "name": "Remodelare Corporală",
          "url": "https://www.slimandbeauty.ro/servicii/remodelare-corporala"
        },
        {
          "@type": "SiteNavigationElement",
          "name": "Dermato Cosmetică",
          "url": "https://www.slimandbeauty.ro/servicii/dermato-cosmetica"
        }
      ]
    },
    {
      "@type": "SiteNavigationElement",
      "name": "Prețuri",
      "url": "https://www.slimandbeauty.ro/?tab=pricing"
    },
    {
      "@type": "SiteNavigationElement",
      "name": "Contact",
      "url": "https://www.slimandbeauty.ro/#contact"
    }
  ]
}

export const generateBreadcrumbsSchema = (category: string, service?: string): WithContext<BreadcrumbList> => {
  const schema: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Acasă",
      "item": "https://www.slimandbeauty.ro"
    }, {
      "@type": "ListItem",
      "position": 2,
      "name": "Servicii",
      "item": "https://www.slimandbeauty.ro/servicii"
    }, {
      "@type": "ListItem",
      "position": 3,
      "name": category,
      "item": `https://www.slimandbeauty.ro/servicii/${normalizeString(category)}`
    }] as ListItem[]
  };

  if (service && schema.itemListElement) {
    (schema.itemListElement as ListItem[]).push({
      "@type": "ListItem",
      "position": 4,
      "name": service,
      "item": `https://www.slimandbeauty.ro/servicii/${normalizeString(category)}/${normalizeString(service)}`
    })
  }

  return schema;
}