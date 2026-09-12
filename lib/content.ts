import { articles, topics } from "@/data/content";

export function formatDate(input: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${input}T00:00:00Z`));
}

export function topicName(slug: string) {
  return topics.find((t) => t.slug === slug)?.name ?? slug;
}

export function searchContent(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return articles.filter((article) =>
    [article.title, article.dek, article.category, article.topic, ...article.tags]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );
}
