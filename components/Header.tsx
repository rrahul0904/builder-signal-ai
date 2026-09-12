"use client";
import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";
import { MenuIcon, SearchIcon } from "./Icons";

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="siteHeader">
    <div className="shell navWrap">
      <Logo />
      <nav className={open ? "mainNav open" : "mainNav"} aria-label="Main navigation">
        <Link href="/archive">Intelligence</Link>
        <Link href="/tutorials">Tutorials</Link>
        <Link href="/tools">Tools</Link>
        <Link href="/about">About</Link>
        <Link href="/sponsor">Sponsor</Link>
      </nav>
      <div className="navActions">
        <Link href="/search" className="iconButton" aria-label="Search"><SearchIcon /></Link>
        <Link href="/#subscribe" className="button buttonSmall">Join free</Link>
        <button className="iconButton menuButton" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu"><MenuIcon /></button>
      </div>
    </div>
  </header>;
}
