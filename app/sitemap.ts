import { MetadataRoute } from "next";
import { services } from "@/lib/data";
import { normalizeString } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://www.slimandbeauty.ro";

    const servicePages = services.flatMap(category =>
        category.items.map(service => ({
            url: `${baseUrl}/servicii/${normalizeString(category.category)}/${normalizeString(service.title)}`,
            lastModified: new Date(),
            changeFrequency: "yearly" as const,
            priority: 0.7,
        }))
    )

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 1,
        },
        {
            url: `${baseUrl}/servicii`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/despre-noi`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.6,
        },
        ...servicePages,
    ]
}