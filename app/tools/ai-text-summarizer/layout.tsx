import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "AI Text Summarizer Free (Summarize Articles Instantly) | SmartFlexa";
const description =
  "Summarize long text, articles, and content instantly using AI. Free online text summarizer.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/tools/ai-text-summarizer` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/tools/ai-text-summarizer`,
  },
  robots: { index: true, follow: true },
};

export default function AiTextSummarizerLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
