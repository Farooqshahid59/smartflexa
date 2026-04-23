import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "How to Create robots.txt — Rules, Sitemaps & Validation | SmartFlexa";
const description =
  "How to create robots.txt: User-agent lines, Allow/Disallow paths, Crawl-delay, Sitemap URLs. Use SmartFlexa’s free generator with live preview and download.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/how-to-create-robots-txt` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/how-to-create-robots-txt`,
  },
  robots: { index: true, follow: true },
};

export default function HowToCreateRobotsTxtLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
