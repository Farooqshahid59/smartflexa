import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Remove Background Online — JPG & PNG, Browser-Only | SmartFlexa";
const description =
  "Remove background online without uploading to a server: edge flood-fill, bright threshold, or color pick—preview side by side and download transparent PNG.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/remove-background-online` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/remove-background-online`,
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
