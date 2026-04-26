import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Email Response Generator — AI Reply Assistant | SmartFlexa";
const description = "Generate clear email responses for support, sales, and operations workflows.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/email-response-generator` },
  openGraph: { title, description, type: "website", siteName: "SmartFlexa", url: `${siteUrl}/email-response-generator` },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
