import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Instagram Username Generator — Aesthetic Handle Ideas | SmartFlexa";
const description =
  "Instagram username generator: soft presets, dots and underscores, batch ideas, copy all. Free browser tool for creators.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/instagram-username-generator` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/instagram-username-generator`,
  },
  robots: { index: true, follow: true },
};

export default function InstagramUsernameGeneratorLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
