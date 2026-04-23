import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "SEO Keyword Density Checker — Table & Highlights | SmartFlexa";
const description =
  "SEO keyword density checker: live frequency table, density %, stop-word filter, .txt upload, highlighted preview—all in your browser on SmartFlexa.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/seo-keyword-density-checker` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/seo-keyword-density-checker`,
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
