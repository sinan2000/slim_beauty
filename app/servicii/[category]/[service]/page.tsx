import { notFound } from 'next/navigation';
import { services } from '@/lib/data';
import { normalizeString } from '@/lib/utils';
import ServiceDetailPage from './temp';

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
