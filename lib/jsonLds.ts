import { LocalBusiness, WithContext } from "schema-dts";

export const homePagejsonLd: WithContext<LocalBusiness> = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Slim & Beauty by MC',
  image: 'https://www.slimandbeauty.ro/logo.jpg',
  '@id': 'https://www.slimandbeauty.ro',
  url: 'https://www.slimandbeauty.ro',
  telephone: '+40733407329',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Strada Petőfi Sándor 101',
    addressLocality: 'Dumbrăvița',
    postalCode: '307160',
    addressCountry: 'RO'
  },
  description: 'Slim & Beauty by MC oferă servicii profesionale dermato-cosmetice și proceduri de remodelare corporală în Dumbrăvița.',
  currenciesAccepted: 'RON',
  paymentAccepted: 'Cash',
  priceRange: '$$',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Thursday',
      ],
      opens: '12:00',
      closes: '20:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Wednesday',
        'Friday',
      ],
      opens: '09:00',
      closes: '17:00'
    }
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    reviewCount: '15'
  },
  areaServed: 'Dumbrăvița, Timișoara, România',
  brand: {
    '@type': 'Brand',
    name: 'Slim & Beauty by MC'
  },
  logo: 'https://www.slimandbeauty.ro/logo.jpg',
  makesOffer: [
    {
      '@type': 'Offer',
      name: 'Remodelare Corporală',
      priceCurrency: 'RON',
      category: 'Body Treatment'
    },
    {
      '@type': 'Offer',
      name: 'Dermato-Cosmetice',
      priceCurrency: 'RON',
      category: 'Skincare'
    }
  ],
  sameAs: [
    "https://www.facebook.com/SalonSlimBeautyByMc",
    "https://www.instagram.com/slimandbeautybymc/"
  ]
}