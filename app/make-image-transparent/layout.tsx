import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Make Image Transparent — PNG Alpha in Your Browser | SmartFlexa";
const description =
  "Make image backgrounds transparent: flood from edges, brightness cutoff, or color distance—export PNG with alpha, optional solid fill, fully client-side on SmartFlexa.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/make-image-transparent` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/make-image-transparent`,
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
