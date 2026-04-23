import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Robots.txt for SEO — Crawling, Duplicates & Sitemaps | SmartFlexa";
const description =
  "Understand robots.txt for SEO: block faceted URLs, allow money pages, list sitemaps. Free generator with presets, live output, and download.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/robots-txt-for-seo` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/robots-txt-for-seo`,
  },
  robots: { index: true, follow: true },
};

export default function RobotsTxtForSeoLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
