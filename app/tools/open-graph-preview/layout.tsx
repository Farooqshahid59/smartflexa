import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Open Graph Preview Tool (Facebook & Twitter Link Preview) | SmartFlexa";
const description =
  "Preview how your website link will appear on Facebook and Twitter. Test Open Graph meta tags instantly.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: `${siteUrl}/tools/open-graph-preview`,
  },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/tools/open-graph-preview`,
  },
  robots: { index: true, follow: true },
};

export default function OpenGraphPreviewLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
