import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Merge Images to PDF — One Document, Many Pages | SmartFlexa";
const description =
  "Merge images to PDF online: reorder JPG/PNG/WebP thumbnails, choose A4 or Letter, download a single PDF—client-side with SmartFlexa.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/merge-images-to-pdf` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/merge-images-to-pdf`,
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
