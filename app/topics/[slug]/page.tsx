import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { getArticlesByTopic, getTopic, topics } from "@/data/content";
export async function generateStaticParams() { return topics.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{slug:string}> }): Promise<Metadata> { const {slug}=await params; const topic=getTopic(slug); return topic ? {title:topic.name,description:topic.description} : {}; }
export default async function TopicPage({ params }: { params: Promise<{slug:string}> }) { const {slug}=await params; const topic=getTopic(slug); if(!topic) notFound(); const topicArticles=getArticlesByTopic(slug); return <><section className="pageHero"><div className="shell"><span className="eyebrow">Signal track · {topic.signal}</span><h1>{topic.name}</h1><p>{topic.description}</p></div></section><section className="section" style={{paddingTop:20}}><div className="shell articleGrid">{topicArticles.length ? topicArticles.map((article)=><ArticleCard key={article.slug} article={article}/>) : <p className="muted">Fresh analysis is being prepared for this track.</p>}</div></section></>; }
