import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Write Email Online — Free AI Email Draft Tool | SmartFlexa";
const description = "Write new emails online using AI context prompts for fast first drafts.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/write-email-online` },
  openGraph: { title, description, type: "website", siteName: "SmartFlexa", url: `${siteUrl}/write-email-online` },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
