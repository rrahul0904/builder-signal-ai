import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { ArrowRight, ArrowUpRight, SparkIcon } from "@/components/Icons";
import { SubscribeForm } from "@/components/SubscribeForm";
import { TopicStrip } from "@/components/TopicStrip";
import { articles, topics } from "@/data/content";
import { formatDate, topicName } from "@/lib/content";

export default function Home() {
  const lead = articles.find((article) => article.featured) ?? articles[0];
  const side = articles.filter((article) => article.slug !== lead.slug).slice(0, 3);
  return <>
    <section className="hero"><div className="shell heroGrid"><div><span className="eyebrow"><SparkIcon/> AI builder intelligence</span><h1>Know what matters. <em>Build what’s next.</em></h1></div><div className="heroAside"><p>A daily signal for engineers and product teams building with agents, models and the infrastructure around them.</p><div className="heroStats"><div><strong>8</strong><span>signal tracks</span></div><div><strong>3 min</strong><span>daily scan</span></div><div><strong>0</strong><span>feed spam</span></div></div></div></div></section>
    <section className="shell signalBoard"><div className="boardGrid"><Link href={`/articles/${lead.slug}`} className="leadStory"><div className="leadKicker"><span className="liveDot"></span><span>Lead signal · {topicName(lead.topic)}</span></div><div><h2>{lead.title}</h2><p>{lead.dek}</p><div className="articleFooter"><span>{formatDate(lead.publishedAt)} · {lead.readTime} min read</span><span><ArrowUpRight/></span></div></div></Link><aside className="boardSide"><div className="boardSideHeader">Today’s builder stack</div>{side.map((item) => <Link className="miniSignal" href={`/articles/${item.slug}`} key={item.slug}><span>{topicName(item.topic)}</span><h3>{item.title}</h3><p>{item.readTime} min · {item.category}</p></Link>)}</aside></div></section>
    <TopicStrip/>
    <section className="section"><div className="shell"><div className="sectionHead"><div><span className="eyebrow">Fresh intelligence</span><h2>Signals worth acting on</h2></div><Link href="/archive" className="textLink">View the archive <ArrowRight/></Link></div><div className="articleGrid">{articles.slice(1, 7).map((article, index) => <ArticleCard key={article.slug} article={article} featured={index === 0}/>)}</div></div></section>
    <section className="section" style={{paddingTop:0}}><div className="shell"><div className="sectionHead"><div><span className="eyebrow">Follow the stack</span><h2>Eight tracks. One signal layer.</h2></div><p>Topic pages turn the archive into a living map of the systems AI builders are actually shipping.</p></div><div className="topicsGrid">{topics.map((topic) => <Link key={topic.slug} href={`/topics/${topic.slug}`} className="topicCard"><div className="topicCardTop"><h3>{topic.name}</h3><b>{topic.signal}</b></div><p>{topic.description}</p><span className="textLink">Open track <ArrowRight size={15}/></span></Link>)}</div></div></section>
    <section className="subscribeSection"><div className="shell"><SubscribeForm source="homepage"/></div></section>
  </>;
}
