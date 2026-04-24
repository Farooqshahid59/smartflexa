import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "AI Summary Generator — Summarize Notes and Blogs | SmartFlexa";
const description = "Generate concise AI summaries from long text. Fast, clean output with copy support.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/ai-summary-generator` },
  openGraph: { title, description, type: "website", siteName: "SmartFlexa", url: `${siteUrl}/ai-summary-generator` },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
