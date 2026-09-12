import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { articles } from "@/data/content";
export const metadata: Metadata = { title: "Tutorials", description: "Practical AI engineering tutorials for agent builders." };
export default function TutorialsPage() { const tutorials = articles.filter((article) => article.category === "Tutorial"); return <><section className="pageHero"><div className="shell"><span className="eyebrow">Hands on</span><h1>Tutorials built to survive production.</h1><p>Patterns you can adapt: evidence-backed RAG, MCP tool contracts, model routing and the reliability layers most demos skip.</p></div></section><section className="section" style={{paddingTop:20}}><div className="shell articleGrid">{tutorials.map((article) => <ArticleCard key={article.slug} article={article}/>)}</div></section></> }
