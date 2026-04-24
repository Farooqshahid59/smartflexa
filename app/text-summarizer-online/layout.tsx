import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Text Summarizer Online — Fast AI Summary Tool | SmartFlexa";
const description = "Summarize text online with AI. Paste content, choose summary length, and copy results instantly.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/text-summarizer-online` },
  openGraph: { title, description, type: "website", siteName: "SmartFlexa", url: `${siteUrl}/text-summarizer-online` },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
