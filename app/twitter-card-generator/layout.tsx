import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Twitter Card Generator — twitter:title & Image Meta Tags | SmartFlexa";
const description =
  "Generate Twitter Card meta tags: twitter:card, title, description, and image. Free online tool with live HTML and snippet-style preview context.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/twitter-card-generator` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/twitter-card-generator`,
  },
  robots: { index: true, follow: true },
};

export default function TwitterCardGeneratorLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
