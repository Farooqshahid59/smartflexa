import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Social Share Preview Tool — Facebook & X Mockups | SmartFlexa";
const description =
  "Test social share previews for your URLs: dual mockups, live fields, optional HTML fetch, and copy-ready Open Graph + Twitter meta tags.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/social-share-preview-tool` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/social-share-preview-tool`,
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
