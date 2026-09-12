import type { Metadata } from "next";
import { tools } from "@/data/content";
import { ArrowUpRight } from "@/components/Icons";
import Link from "next/link";
export const metadata: Metadata = { title: "Builder tools", description: "A curated directory of high-leverage agent building patterns and tools." };
export default function ToolsPage() { return <><section className="pageHero"><div className="shell"><span className="eyebrow">Builder index</span><h1>Tools with an opinionated bar.</h1><p>We score usefulness, integration friction, evidence quality and production readiness—not launch-day hype.</p></div></section><section className="section" style={{paddingTop:20}}><div className="shell toolsGrid">{tools.map((tool) => <Link href={tool.url} className="toolCard" key={tool.name}><div className="toolScore">{tool.score}</div><div><span className="toolType">{tool.type}</span><h3>{tool.name}</h3><p>{tool.description}</p></div><div className="scoreNum"><ArrowUpRight/><br/>score</div></Link>)}</div></section></> }
