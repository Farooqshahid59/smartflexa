import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Keyword Analyzer Tool — Frequency & Density Table | SmartFlexa";
const description =
  "Keyword analyzer tool for writers: vocabulary stats, density column, stop-word filter, sortable rows, highlighted preview—client-side on SmartFlexa.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/keyword-analyzer-tool` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/keyword-analyzer-tool`,
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
