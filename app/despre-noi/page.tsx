import { Metadata } from "next";
import AboutUs from "./temp";
import Script from "next/script";
import { LocalBusiness, WithContext } from "schema-dts";

export const metadata: Metadata = {
    title: "Despre Slim & Beauty by MC - Tratamente și Contact",
    description: "Descoperă povestea Slim & Beauty by MC. Oferim tratamente dermato-cosmetice și remodelare corporală de top în Dumbrăvița. Programează o consultație!",
    keywords: ['Slim & Beauty by MC', 'remodelare corporală', 'dermato-cosmetică', 'tratamente de frumusețe', 'consultație', 'îngrijire piele Dumbrăvița', 'poveste Slim & Beauty'],
    authors: [{ name: "Slim & Beauty by MC", url: "https://www.slimandbeauty.ro" }],
    openGraph: {
        title: "Despre Slim & Beauty by MC - Povestea Noastră",
        description: "Slim & Beauty by MC oferă tratamente profesionale de remodelare corporală și dermato-cosmetică. Află mai multe despre noi și echipa noastră de specialiști.",
        url: "https://www.slimandbeauty.ro/despre-noi",
        siteName: "Slim & Beauty by MC",
        images: [
            {
                url: "https://www.slimandbeauty.ro/logo.jpg",
                alt: "Logo Slim & Beauty by MC",
            }
        ],
        locale: "ro_RO",
        type: "website",
    },
    robots: {
        follow: true,
        index: true,
    }
}

export default function Page() {
    const jsonLd: WithContext<LocalBusiness> = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Slim & Beauty by MC",
        image: "https://www.slimandbeauty.ro/logo.jpg",
        "@id": "https://www.slimandbeauty.ro",
        url: "https://www.slimandbeauty.ro/despre-noi",
        telephone: "+40 733 407 329",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Str. Petőfi Sándor 101",
            addressLocality: "Dumbrăvița",
            postalCode: "307160",
            addressCountry: "RO"
        },
        description: "Slim & Beauty by MC oferă servicii profesionale dermato-cosmetice și proceduri de remodelare corporală în Dumbrăvița. Află mai multe despre echipa noastră.",
        currenciesAccepted: "RON",
        paymentAccepted: "Cash",
        priceRange: "$$",
        openingHoursSpecification: [
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                    "Monday", "Tuesday", "Thursday"
                ],
                opens: "12:00",
                closes: "20:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                    "Wednesday", "Friday"
                ],
                opens: "09:00",
                closes: "17:00"
            }
        ],
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.7",
            reviewCount: "15"
        },
        areaServed: {
            "@type": "Place",
            name: "Dumbrăvița, Timișoara, România"
        },
        brand: {
            "@type": "Brand",
            name: "Slim & Beauty by MC"
        },
        logo: "https://www.slimandbeauty.ro/logo.jpg",
        sameAs: [
            "https://www.facebook.com/SalonSlimBeautyByMc",
            "https://www.instagram.com/slimandbeautybymc/"
        ]

    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FDF8F5] to-[#F5EBE6] py-16 px-4 sm:px-6 lg:px-8">
            <AboutUs />
            <Script
                id="about-us-json-ld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </div>
    )
}