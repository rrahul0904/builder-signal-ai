import type { MetadataRoute } from "next";
import { articles, topics } from "@/data/content";
export default function sitemap(): MetadataRoute.Sitemap { const base=process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:3000"; return ["","/archive","/tutorials","/tools","/about","/sponsor","/search","/privacy","/terms"].map((path)=>({url:`${base}${path}`,lastModified:new Date()})).concat(topics.map((t)=>({url:`${base}/topics/${t.slug}`,lastModified:new Date()})),articles.map((a)=>({url:`${base}/articles/${a.slug}`,lastModified:new Date(`${a.publishedAt}T00:00:00Z`)}))); }
