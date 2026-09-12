import type { Metadata } from "next";
import SearchClient from "./SearchClient";
export const metadata: Metadata = { title: "Search" };
export default function SearchPage(){ return <section className="pageHero"><div className="shell"><span className="eyebrow">Search the signal</span><h1>Find the implementation thread.</h1><p>Search the full BuilderSignal archive by topic, technology or engineering problem.</p><div style={{marginTop:30}}><SearchClient/></div></div></section> }
