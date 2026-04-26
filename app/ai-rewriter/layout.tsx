import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "AI Rewriter — Rephrase Content Fast | SmartFlexa";
const description = "AI rewriter for emails, blogs, and docs. Rephrase content quickly while keeping meaning intact.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/ai-rewriter` },
  openGraph: { title, description, type: "website", siteName: "SmartFlexa", url: `${siteUrl}/ai-rewriter` },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
