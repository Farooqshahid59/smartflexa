import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Text Diff Checker Online (Compare Two Texts Instantly) | SmartFlexa";
const description =
  "Compare two texts and find differences instantly. Free online text diff checker with highlights.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: `${siteUrl}/tools/text-diff-checker`,
  },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/tools/text-diff-checker`,
  },
  robots: { index: true, follow: true },
};

export default function TextDiffCheckerLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
