import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Free Sitemap Generator — XML Export, No Signup | SmartFlexa";
const description =
  "Free sitemap generator: combine URLs, changefreq, priority, optional lastmod. Download sitemap.xml or copy—runs entirely in your browser.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/free-sitemap-generator` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/free-sitemap-generator`,
  },
  robots: { index: true, follow: true },
};

export default function FreeSitemapGeneratorLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
