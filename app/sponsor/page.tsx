import type { Metadata } from "next";
import { SponsorForm } from "@/components/SponsorForm";

export const metadata: Metadata = { title: "Sponsor", description: "Reach AI builders at the moment they are evaluating what to use." };

export default function SponsorPage() {
  return <>
    <section className="pageHero"><div className="shell"><span className="eyebrow">Partner with BuilderSignal</span><h1>Reach builders while they are deciding what to use.</h1><p>Sponsorships are clearly labeled and selected for technical relevance. We do not sell editorial conclusions.</p></div></section>
    <section className="section" style={{ paddingTop: 20 }}><div className="shell sponsorGrid">
      <div className="prose"><h2>Designed for developer-intent audiences</h2><p>BuilderSignal sits close to implementation: readers are evaluating models, tools, runtimes and patterns while they build. That is a better environment for technical products than broad AI-news impressions.</p><p>Available formats include a daily issue placement, a technical walkthrough, a tool-directory feature and launch-week bundles.</p><SponsorForm /></div>
      <aside className="sponsorCard"><h3>Partner standard</h3><p>Every sponsor is reviewed for relevance and clearly separated from editorial judgment.</p><div className="sponsorMetric"><span>Audience</span><b>AI builders</b></div><div className="sponsorMetric"><span>Formats</span><b>4</b></div><div className="sponsorMetric"><span>Editorial control</span><b>Never sold</b></div><div className="sponsorMetric"><span>Reporting</span><b>Transparent</b></div></aside>
    </div></section>
  </>;
}
