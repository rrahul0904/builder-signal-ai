import Link from "next/link";
import type { Article } from "@/data/content";
import { formatDate, topicName } from "@/lib/content";
import { ArrowUpRight } from "./Icons";

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return <article className={featured ? "articleCard featuredCard" : "articleCard"}>
    <div className="articleMeta"><span className="pill">{article.category}</span><span>{topicName(article.topic)}</span></div>
    <Link href={`/articles/${article.slug}`} className="articleTitle"><h3>{article.title}</h3></Link>
    <p>{article.dek}</p>
    <div className="articleFooter"><span>{formatDate(article.publishedAt)} · {article.readTime} min</span><Link href={`/articles/${article.slug}`} aria-label={`Read ${article.title}`}><ArrowUpRight /></Link></div>
  </article>;
}
