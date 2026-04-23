import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Convert Images to PDF — JPG, PNG, WebP Merge | SmartFlexa";
const description =
  "Convert images to PDF: merge JPG, PNG, and WebP into one file with previews, reorder, page size, and orientation—fully in your browser.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/convert-images-to-pdf` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/convert-images-to-pdf`,
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
