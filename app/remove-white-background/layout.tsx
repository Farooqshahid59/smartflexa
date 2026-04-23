import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Remove White Background — Logos & Product Photos | SmartFlexa";
const description =
  "Remove white backgrounds from JPG or PNG using brightness threshold or border matching—transparent PNG export, optional solid color, client-side on SmartFlexa.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/remove-white-background` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/remove-white-background`,
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
