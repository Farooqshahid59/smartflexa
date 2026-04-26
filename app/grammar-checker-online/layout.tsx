import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Grammar Checker Online — AI Sentence Fixer | SmartFlexa";
const description = "Check grammar online and improve sentence clarity instantly with AI-powered correction.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/grammar-checker-online` },
  openGraph: { title, description, type: "website", siteName: "SmartFlexa", url: `${siteUrl}/grammar-checker-online` },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
