import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Fix Sentences Online — Improve Clarity with AI | SmartFlexa";
const description = "Fix sentence grammar and clarity online in seconds using AI-powered correction.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/fix-sentences-online` },
  openGraph: { title, description, type: "website", siteName: "SmartFlexa", url: `${siteUrl}/fix-sentences-online` },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
