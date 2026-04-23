import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Diff Checker Online — Line Diff & Copy Output | SmartFlexa";
const description =
  "Diff checker online: compare two texts with red/green/amber highlights, ignore case or whitespace, upload .txt, copy unified diff—client-side.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/diff-checker-online` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/diff-checker-online`,
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
