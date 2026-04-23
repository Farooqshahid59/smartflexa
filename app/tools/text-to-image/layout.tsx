import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title =
  "Text to Image Generator Free (Create Quote Images Online) | SmartFlexa";
const description =
  "Convert text into beautiful images. Create quote images and download instantly.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: `${siteUrl}/tools/text-to-image`,
  },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/tools/text-to-image`,
  },
  robots: { index: true, follow: true },
};

export default function TextToImageLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
