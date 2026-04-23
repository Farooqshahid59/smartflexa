import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Robots.txt Generator Free (Create SEO Robots File Instantly) | SmartFlexa";
const description =
  "Generate robots.txt file for your website. Control search engine crawling with this free tool.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/tools/robots-txt-generator` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/tools/robots-txt-generator`,
  },
  robots: { index: true, follow: true },
};

export default function RobotsTxtGeneratorLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
