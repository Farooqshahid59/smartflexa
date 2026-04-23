import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Image to PDF Converter Free (JPG, PNG to PDF Online) | SmartFlexa";
const description =
  "Convert images to PDF online for free. Merge multiple images into a single PDF instantly.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: `${siteUrl}/tools/image-to-pdf`,
  },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/tools/image-to-pdf`,
  },
  robots: { index: true, follow: true },
};

export default function ImageToPdfLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
