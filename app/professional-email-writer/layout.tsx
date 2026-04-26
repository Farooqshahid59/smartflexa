import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Professional Email Writer — AI Business Drafts | SmartFlexa";
const description = "Write professional business emails online with AI-generated structure and tone.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/professional-email-writer` },
  openGraph: { title, description, type: "website", siteName: "SmartFlexa", url: `${siteUrl}/professional-email-writer` },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
