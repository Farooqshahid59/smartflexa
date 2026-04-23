import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Keyword Density Checker Free (SEO Keyword Analyzer) | SmartFlexa";
const description =
  "Check keyword density and frequency in your content. Free SEO keyword density tool.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: `${siteUrl}/tools/keyword-density-checker`,
  },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/tools/keyword-density-checker`,
  },
  robots: { index: true, follow: true },
};

export default function KeywordDensityCheckerLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
