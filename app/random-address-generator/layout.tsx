import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Random Address Generator — US, UK, India, Canada | SmartFlexa";
const description =
  "Random address generator for QA: switch between US, UK, India, and Canada, batch 1–5 rows, copy instantly. Client-side only.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/random-address-generator` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/random-address-generator`,
  },
  robots: { index: true, follow: true },
};

export default function RandomAddressGeneratorLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
