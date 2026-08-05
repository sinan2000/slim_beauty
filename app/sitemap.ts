import { MetadataRoute } from "next";
import { services } from "@/lib/data";
import { normalizeString } from "@/lib/utils";

/**
 * Bump this when page content actually changes.
 * Using `new Date()` here would tell Google every page changed on every deploy,
 * which makes <lastmod> worthless as a crawl signal.
 */
const LAST_MODIFIED = new Date("2026-08-05");

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_URL ?? "https://www.slimandbeauty.ro";

    const categoryPages = services.map(category => ({
        url: `${baseUrl}/servicii/${normalizeString(category.category)}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: "yearly" as const,
        priority: 0.8,
    }));

    const servicePages = services.flatMap(category =>
        category.items.map(service => ({
            url: `${baseUrl}/servicii/${normalizeString(category.category)}/${normalizeString(service.title)}`,
            lastModified: LAST_MODIFIED,
            changeFrequency: "monthly" as const,
            priority: 0.7,
        }))
    )

    return [
        {
            url: baseUrl,
            lastModified: LAST_MODIFIED,
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${baseUrl}/servicii`,
            lastModified: LAST_MODIFIED,
            changeFrequency: "yearly",
            priority: 0.9,
        },
        ...categoryPages,
        ...servicePages,
    ]
}
