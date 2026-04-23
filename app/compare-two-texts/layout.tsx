import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Compare Two Texts — Free Side-by-Side Line Diff | SmartFlexa";
const description =
  "Compare two texts online: highlighted lines, optional ignore case/whitespace, .txt upload, and unified diff copy—runs locally in your browser.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/compare-two-texts` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/compare-two-texts`,
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
