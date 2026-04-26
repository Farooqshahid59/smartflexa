import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Sentence Rewriter — Improve Clarity Instantly | SmartFlexa";
const description = "Rewrite sentences with AI for clearer structure and cleaner wording without losing context.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/sentence-rewriter` },
  openGraph: { title, description, type: "website", siteName: "SmartFlexa", url: `${siteUrl}/sentence-rewriter` },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
