import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Article Summarizer — Condense Long Reads Fast | SmartFlexa";
const description =
  "Summarize long articles with AI in seconds. Choose short, medium, or detailed output and copy instantly.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/article-summarizer` },
  openGraph: { title, description, type: "website", siteName: "SmartFlexa", url: `${siteUrl}/article-summarizer` },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
