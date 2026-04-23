import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Simple Invoice Generator — Minimal PDF Invoices | SmartFlexa";
const description =
  "Simple invoice generator: seller, buyer, dates, line items, optional tax, PDF download. Fast and browser-only.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/simple-invoice-generator` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/simple-invoice-generator`,
  },
  robots: { index: true, follow: true },
};

export default function SimpleInvoiceGeneratorLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
