import Link from "next/link";
import { Logo } from "./Logo";
export function Footer() {
  return <footer className="footer">
    <div className="shell footerGrid">
      <div><Logo/><p className="muted footerCopy">High-signal intelligence for people building with AI agents.</p></div>
      <div><div className="footerLabel">Explore</div><Link href="/archive">Archive</Link><Link href="/tutorials">Tutorials</Link><Link href="/tools">Tools</Link></div>
      <div><div className="footerLabel">Company</div><Link href="/about">About</Link><Link href="/sponsor">Sponsor</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/rss.xml">RSS</Link></div>
      <div><div className="footerLabel">Signal</div><p className="muted">Original editorial. No recycled feed spam. Every item has a builder takeaway.</p></div>
    </div>
    <div className="shell footerBottom"><span>© 2026 BuilderSignal</span><span>Built for builders, not browsers.</span></div>
  </footer>;
}
