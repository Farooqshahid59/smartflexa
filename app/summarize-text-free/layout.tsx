import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Summarize Text Free — AI Summaries in Seconds | SmartFlexa";
const description = "Summarize text for free with AI. Convert long content into concise summaries instantly.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/summarize-text-free` },
  openGraph: { title, description, type: "website", siteName: "SmartFlexa", url: `${siteUrl}/summarize-text-free` },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
