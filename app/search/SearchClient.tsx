"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { articles } from "@/data/content";
import { SearchIcon } from "@/components/Icons";
export default function SearchClient(){ const [query,setQuery]=useState(""); const results=useMemo(()=>{ const q=query.trim().toLowerCase(); if(!q) return articles; return articles.filter((a)=>[a.title,a.dek,a.category,a.topic,...a.tags].join(" ").toLowerCase().includes(q));},[query]); return <div className="searchPanel"><div className="searchInputWrap"><SearchIcon/><input autoFocus className="searchInput" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search agents, MCP, RAG, browser automation…" aria-label="Search articles"/></div><div className="searchResults">{results.map((article)=><Link className="searchResult" href={`/articles/${article.slug}`} key={article.slug}><h2>{article.title}</h2><p>{article.dek}</p></Link>)}{results.length===0&&<p className="muted">No signal matched that query.</p>}</div></div> }
