import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Meta Tag Generator Free (SEO Meta Tags for Website) | SmartFlexa";
const description =
  "Generate SEO meta tags for your website including Open Graph and Twitter cards. Free online tool.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/tools/meta-tag-generator` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/tools/meta-tag-generator`,
  },
  robots: { index: true, follow: true },
};

export default function MetaTagGeneratorLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
