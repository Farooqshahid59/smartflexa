import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Gaming Username Generator — Gamertag & Handle Ideas | SmartFlexa";
const description =
  "Gaming username generator: edgy word pools, optional numbers, batch regenerate, copy all. Free client-side tool for tags and screen names.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/gaming-username-generator` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/gaming-username-generator`,
  },
  robots: { index: true, follow: true },
};

export default function GamingUsernameGeneratorLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
