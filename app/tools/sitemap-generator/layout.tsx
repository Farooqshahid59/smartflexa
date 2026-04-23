import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Sitemap Generator Free (Create XML Sitemap Online) | SmartFlexa";
const description =
  "Generate XML sitemap for your website. Improve SEO and help search engines index your pages.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/tools/sitemap-generator` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/tools/sitemap-generator`,
  },
  robots: { index: true, follow: true },
};

export default function SitemapGeneratorLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
