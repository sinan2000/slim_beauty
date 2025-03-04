import { MetadataRoute } from "next";
import { services } from "@/lib/data";
import { normalizeString } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_URL!;

    const categoryPages = services.map(category => ({
        url: `${baseUrl}/servicii/${normalizeString(category.category)}`,
        lastModified: new Date(),
        changeFrequency: "yearly" as const,
        priority: 0.8,
    }));

    const servicePages = services.flatMap(category =>
        category.items.map(service => ({
            url: `${baseUrl}/servicii/${normalizeString(category.category)}/${normalizeString(service.title)}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
        }))
    )

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${baseUrl}/servicii`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.9,
        },
        ...categoryPages,
        ...servicePages,
    ]
}