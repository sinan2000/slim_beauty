import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://www.slimandbeauty.ro",
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 1,
        },
        {
            url: "https://www.slimandbeauty.ro/servicii",
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.8,
        },
        {
            url: "https://www.slimandbeauty.ro/despre-noi",
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.6,
        }
    ]
}