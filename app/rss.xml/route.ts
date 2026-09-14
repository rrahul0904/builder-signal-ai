import { articles } from "@/data/content";
import { siteUrl } from "@/lib/site-url";

export function GET() {
  const base = siteUrl();
  const items = articles
    .map((article) => `<item><title><![CDATA[${article.title}]]></title><link>${base}/articles/${article.slug}</link><guid>${base}/articles/${article.slug}</guid><pubDate>${new Date(`${article.publishedAt}T12:00:00Z`).toUTCString()}</pubDate><description><![CDATA[${article.dek}]]></description></item>`)
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>BuilderSignal</title><link>${base}</link><description>AI builder intelligence</description>${items}</channel></rss>`;

  return new Response(xml, { headers: { "content-type": "application/rss+xml; charset=utf-8" } });
}
