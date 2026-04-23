import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Compare Files Online — Plain Text .txt Diff | SmartFlexa";
const description =
  "Compare two .txt files online in your browser: local FileReader, highlighted line diff, copy unified output. No upload to SmartFlexa servers.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/compare-files-online` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/compare-files-online`,
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
