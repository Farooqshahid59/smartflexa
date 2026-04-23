import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "XML Sitemap Generator — urlset, loc & lastmod | SmartFlexa";
const description =
  "XML sitemap generator: build sitemap.org-compliant urlset with loc, changefreq, priority, optional lastmod. Bulk URLs, copy and download in your browser.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/xml-sitemap-generator` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/xml-sitemap-generator`,
  },
  robots: { index: true, follow: true },
};

export default function XmlSitemapGeneratorLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
