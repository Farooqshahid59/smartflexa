import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Robots.txt Generator Online — Browser-Only, No Upload | SmartFlexa";
const description =
  "Robots.txt generator online: edit crawl rules in your browser, apply presets, copy or download robots.txt. Nothing is uploaded to our servers.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/robots-txt-generator-online` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/robots-txt-generator-online`,
  },
  robots: { index: true, follow: true },
};

export default function RobotsTxtGeneratorOnlineLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
