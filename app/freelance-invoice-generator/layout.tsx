import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Freelance Invoice Generator — Retainers & Milestones | SmartFlexa";
const description =
  "Freelance invoice generator for project work: line items, tax, PDF download. Client-side tool—ideal for contractors and studios.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/freelance-invoice-generator` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/freelance-invoice-generator`,
  },
  robots: { index: true, follow: true },
};

export default function FreelanceInvoiceGeneratorLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
