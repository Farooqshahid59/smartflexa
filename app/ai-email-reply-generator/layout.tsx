import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "AI Email Reply Generator — Draft Smart Responses | SmartFlexa";
const description = "Generate AI-powered email replies fast with adjustable tone and clear structure.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/ai-email-reply-generator` },
  openGraph: { title, description, type: "website", siteName: "SmartFlexa", url: `${siteUrl}/ai-email-reply-generator` },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
