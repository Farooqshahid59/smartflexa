import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Compress Image to 50KB, 100KB Online Free | SmartFlexa";
const description =
  "Reduce image size online to specific KB. Free image compressor with preview and download. Fast and secure.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteUrl}/tools/image-compressor`,
  },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/tools/image-compressor`,
  },
};

export default function ImageCompressorLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
