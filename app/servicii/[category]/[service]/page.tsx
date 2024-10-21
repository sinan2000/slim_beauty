import { notFound } from 'next/navigation';
import { services } from '@/lib/data';
import { normalizeString } from '@/lib/utils';
import ServiceDetailPage from './temp';
import type { Metadata } from 'next';

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

function findService(category: string, service: string) {
    const categoryData = services.find((cat) => normalizeString(cat.category) === category);

    if (!categoryData) {
        return null;
    }

    const serviceData = categoryData.items.find((item) => normalizeString(item.title) === service);

    return serviceData ? { category: categoryData.category, service: serviceData } : null;
}

export default function ServicePage({ params }: { params: { category: string, service: string } }) {
    const { category, service } = params;

    const foundService = findService(category, service);

    if (!foundService) {
        return notFound();
    }

    const { service: serviceData } = foundService;

    return (
        <ServiceDetailPage service={serviceData} />
    );
}
