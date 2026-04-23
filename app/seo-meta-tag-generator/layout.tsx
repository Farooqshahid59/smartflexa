import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "SEO Meta Tag Generator — Title, Description & Robots | SmartFlexa";
const description =
  "Free SEO meta tag generator: page title, meta description, robots, viewport, Open Graph, and Twitter Card HTML. Live preview, copy markup in your browser.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/seo-meta-tag-generator` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/seo-meta-tag-generator`,
  },
  robots: { index: true, follow: true },
};

export default function SeoMetaTagGeneratorLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
