import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Open Graph Generator — og:title, og:description, og:image | SmartFlexa";
const description =
  "Generate Open Graph meta tags (og:title, og:description, og:image, og:type) for rich link previews. Free browser tool with live HTML output.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/open-graph-generator` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/open-graph-generator`,
  },
  robots: { index: true, follow: true },
};

export default function OpenGraphGeneratorLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
