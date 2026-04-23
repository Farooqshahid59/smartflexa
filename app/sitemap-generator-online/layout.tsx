import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Sitemap Generator Online — Build sitemap.xml in Your Browser | SmartFlexa";
const description =
  "Sitemap generator online: edit URLs, changefreq, priority, optional lastmod, merge bulk lists. Client-side XML preview, copy, and download.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/sitemap-generator-online` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/sitemap-generator-online`,
  },
  robots: { index: true, follow: true },
};

export default function SitemapGeneratorOnlineLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
