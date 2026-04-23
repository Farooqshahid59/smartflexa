import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Username Ideas — Brainstorm Handles & Gamertags | SmartFlexa";
const description =
  "Username ideas for social and gaming: batch-generate handles, tweak categories, copy results. Free SmartFlexa tool—runs in your browser.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/username-ideas` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/username-ideas`,
  },
  robots: { index: true, follow: true },
};

export default function UsernameIdeasLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
