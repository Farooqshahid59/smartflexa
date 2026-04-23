import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "HTML Meta Tags Generator — Paste-Ready Head Markup | SmartFlexa";
const description =
  "Generate HTML meta tags for your site head: title, description, keywords, viewport, robots, Open Graph, and Twitter. Live output and copy button—free.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/html-meta-tags-generator` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/html-meta-tags-generator`,
  },
  robots: { index: true, follow: true },
};

export default function HtmlMetaTagsGeneratorLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
