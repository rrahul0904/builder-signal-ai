import test from "node:test";
import assert from "node:assert/strict";
import { articles, topics } from "../data/content";
import { searchContent } from "../lib/content";
test("article and topic slugs are unique",()=>{ assert.equal(new Set(articles.map(a=>a.slug)).size,articles.length); assert.equal(new Set(topics.map(t=>t.slug)).size,topics.length); });
test("every article points to a real topic",()=>{ const slugs=new Set(topics.map(t=>t.slug)); for(const article of articles) assert.ok(slugs.has(article.topic),`missing topic ${article.topic}`); });
test("search finds topic and title terms",()=>{ assert.ok(searchContent("MCP").length>0); assert.ok(searchContent("repository-scale").length>0); });
