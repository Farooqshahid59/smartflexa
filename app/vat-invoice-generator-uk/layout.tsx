import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "VAT Invoice Generator UK — 0%, 5%, 20% VAT Rates | SmartFlexa";
const description =
  "Create VAT-compliant UK invoices with 0%, 5%, or 20% rates. Free VAT invoice generator with GBP totals, logo, and PDF download.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/vat-invoice-generator-uk` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/vat-invoice-generator-uk`,
  },
  robots: { index: true, follow: true },
};

export default function VatInvoiceGeneratorUkLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
