import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/content";

const BASE = "https://compare.byamarex.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const articles: MetadataRoute.Sitemap = getAllArticles().map((article) => {
    const iso = article.updatedAt ?? article.publishedAt;
    const date = iso ? new Date(iso) : now;
    return {
      url: `${BASE}/vergleich/${article.slug}`,
      lastModified: Number.isNaN(date.getTime()) ? now : date,
      changeFrequency: "monthly",
      priority: 0.7,
    };
  });

  return [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE}/earbuds`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/vergleich`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...articles,
    {
      url: `${BASE}/impressum`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE}/datenschutz`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
