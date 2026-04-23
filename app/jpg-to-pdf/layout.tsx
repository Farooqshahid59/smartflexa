import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "JPG to PDF — Free Online Multi-Page Converter | SmartFlexa";
const description =
  "Convert JPG to PDF online: upload multiple JPEGs, reorder, choose A4 or Letter, portrait or landscape, download one PDF—runs in your browser.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/jpg-to-pdf` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/jpg-to-pdf`,
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
