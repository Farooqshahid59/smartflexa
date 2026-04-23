import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Create robots.txt — Crawl Rules & Sitemap Lines | SmartFlexa";
const description =
  "Create robots.txt online: User-agent groups, Allow/Disallow paths, optional Crawl-delay, and Sitemap URLs. Free browser editor with copy and download.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/create-robots-txt` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/create-robots-txt`,
  },
  robots: { index: true, follow: true },
};

export default function CreateRobotsTxtLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
