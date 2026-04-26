import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "AI Grammar Correction — Rewrite and Fix Errors | SmartFlexa";
const description = "AI grammar correction tool to fix mistakes and improve sentence flow instantly.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/ai-grammar-correction` },
  openGraph: { title, description, type: "website", siteName: "SmartFlexa", url: `${siteUrl}/ai-grammar-correction` },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
