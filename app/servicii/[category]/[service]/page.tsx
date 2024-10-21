import { notFound } from 'next/navigation';
import { services } from '@/lib/data';
import { normalizeString } from '@/lib/utils';
import ServiceDetailPage from './temp';
import type { Metadata } from 'next';
import { WithContext, Service, FAQPage } from 'schema-dts';
import Script from 'next/script';

function findService(category: string, service: string) {
    const categoryData = services.find((cat) => normalizeString(cat.category) === category);

    if (!categoryData) {
        return null;
    }

    const serviceData = categoryData.items.find((item) => normalizeString(item.title) === service);

    return serviceData ? { category: categoryData.category, service: serviceData } : null;
}

export async function generateStaticParams() {
    const paths: { category: string; service: string; }[] = [];

    services.forEach((category) => {
        category.items.forEach((service) => {
            paths.push({
                category: normalizeString(category.category),
                service: normalizeString(service.title),
            })
        })
    });

    return paths;
}

export const generateMetadata = ({ params }: { params: { category: string, service: string } }): Metadata => {
    const foundService = findService(params.category, params.service);

    if (!foundService) {
        notFound();
    }

    const { service } = foundService;

    const baseTitle = `${service.title} - Slim & Beauty by MC`;
    const title = baseTitle.length > 60 ? baseTitle.slice(0, 57) + '...' : baseTitle;

    const description = service.longDescription.slice(0, 157) + '...';

    const keywords = [
        service.title.toLowerCase(),
        ...service.benefits.slice(0, 3).map(benefit => benefit.split(":")[0].toLowerCase()),
        "slim & beauty by mc", "tratament anticelulitic", "remodelare corporală", "dermato-cosmetică"
    ];

    return {
        title,
        description,
        keywords,
        openGraph: {
            title,
            description,
            url: "https://www.slimandbeauty.ro",
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
}

export default function ServicePage({ params }: { params: { category: string, service: string } }) {
    const { category, service } = params;

    const foundService = findService(category, service);

    if (!foundService) {
        return notFound();
    }

    const { service: serviceData } = foundService;

    const jsonLd: WithContext<Service> = {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: serviceData.title,
        provider: {
            "@type": "LocalBusiness",
            name: "Slim & Beauty by MC",
            url: "https://www.slimandbeauty.ro",
            logo: "https://www.slimandbeauty.ro/logo.jpg",
            image: "https://www.slimandbeauty.ro/logo.jpg",
            telephone: "+40 733 407 329",
            address: {
                "@type": "PostalAddress",
                streetAddress: "Str. Petőfi Sándor 101",
                addressLocality: "Dumbrăvița",
                postalCode: "307160",
                addressCountry: "RO"
            },
            areaServed: {
                "@type": "Place",
                name: "Dumbrăvița, Timișoara, România",
            },
            aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.7",
                reviewCount: "15",
            },
        },
        name: serviceData.title,
        description: serviceData.mediumDescription,
        offers: {
            "@type": "Offer",
            url: `https://www.slimandbeauty.ro/servicii/${category}/${service}`,
            priceCurrency: "RON",
            price: "Consult",
            availability: "https://schema.org/InStock",
        },
        additionalType: "https://schema.org/Product",
        category: category,
    }

    const faqJsonLd: WithContext<FAQPage> = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: serviceData.faq.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        }))
    }

    return (
        <>
            <ServiceDetailPage service={serviceData} />
            <Script
                id="product-json-ld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Script
                id="faq-json-ld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
        </>
    );
}
