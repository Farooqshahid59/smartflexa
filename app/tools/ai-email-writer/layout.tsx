import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "AI Email Writer Free (Generate Professional Emails Instantly) | SmartFlexa";
const description =
  "Write professional emails instantly using AI. Generate replies and new emails for free.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/tools/ai-email-writer` },
  openGraph: { title, description, type: "website", siteName: "SmartFlexa", url: `${siteUrl}/tools/ai-email-writer` },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
