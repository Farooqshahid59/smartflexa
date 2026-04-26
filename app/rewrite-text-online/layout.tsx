import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Rewrite Text Online — AI Sentence Rewriter | SmartFlexa";
const description = "Rewrite text online with AI to improve readability, flow, and tone in seconds.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/rewrite-text-online` },
  openGraph: { title, description, type: "website", siteName: "SmartFlexa", url: `${siteUrl}/rewrite-text-online` },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
