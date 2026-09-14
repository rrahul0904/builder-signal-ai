import type { MetadataRoute } from "next";
import { articles, topics } from "@/data/content";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const now = new Date();

  return ["", "/archive", "/tutorials", "/tools", "/about", "/sponsor", "/search", "/privacy", "/terms"]
    .map((path) => ({ url: `${base}${path}`, lastModified: now }))
    .concat(
      topics.map((topic) => ({ url: `${base}/topics/${topic.slug}`, lastModified: now })),
      articles.map((article) => ({
        url: `${base}/articles/${article.slug}`,
        lastModified: new Date(`${article.publishedAt}T00:00:00Z`),
      })),
    );
}
