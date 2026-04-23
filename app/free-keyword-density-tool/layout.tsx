import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Free Keyword Density Tool — Paste or .txt Upload | SmartFlexa";
const description =
  "Free keyword density tool: word counts, density percentages, sortable table, optional stop-word filter—no signup, runs locally on SmartFlexa.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/free-keyword-density-tool` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/free-keyword-density-tool`,
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
