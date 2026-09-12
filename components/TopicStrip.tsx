import Link from "next/link";
import { topics } from "@/data/content";
export function TopicStrip() {
  return <div className="topicStrip"><div className="shell topicScroller">{topics.map((topic) => <Link href={`/topics/${topic.slug}`} key={topic.slug}><span>{topic.name}</span><b>{topic.signal}</b></Link>)}</div></div>;
}
