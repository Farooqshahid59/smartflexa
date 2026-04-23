import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Create Sitemap XML — URLs, Priority & Changefreq | SmartFlexa";
const description =
  "Create sitemap XML files for SEO: list loc entries, set changefreq and priority, optional lastmod. Live preview, copy, download—free browser tool.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/create-sitemap-xml` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/create-sitemap-xml`,
  },
  robots: { index: true, follow: true },
};

export default function CreateSitemapXmlLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
