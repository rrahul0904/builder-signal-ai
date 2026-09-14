import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteUrl } from "@/lib/site-url";

const canonicalUrl = siteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(canonicalUrl),
  title: { default: "BuilderSignal — AI builder intelligence", template: "%s · BuilderSignal" },
  description: "High-signal intelligence, tutorials and tools for people building with AI agents.",
  openGraph: {
    title: "BuilderSignal",
    description: "AI builder intelligence without the noise.",
    type: "website",
    url: canonicalUrl,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Header/><main>{children}</main><Footer/></body></html>;
}
