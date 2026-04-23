import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Background Remover Free — Simple Cutouts & PNG | SmartFlexa";
const description =
  "Free background remover for JPG and PNG: uniform backdrops, bright walls, or sampled colors—optional solid fill, transparent PNG download, runs in your browser.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/background-remover-free` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/background-remover-free`,
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
