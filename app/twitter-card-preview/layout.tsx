import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Twitter Card Preview — X Link Summary Mockup | SmartFlexa";
const description =
  "Preview summary_large_image style Twitter/X cards: image, title, description, and domain. Edit fields live and copy OG + Twitter meta tags.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/twitter-card-preview` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/twitter-card-preview`,
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
