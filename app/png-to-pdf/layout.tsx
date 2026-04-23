import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "PNG to PDF — Screenshots & Graphics to One File | SmartFlexa";
const description =
  "Convert PNG images to a multi-page PDF: drag-and-drop, reorder thumbnails, A4 or Letter, portrait or landscape—client-side, no upload.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/png-to-pdf` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/png-to-pdf`,
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
