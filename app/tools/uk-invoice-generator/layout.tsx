import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title =
  "UK Invoice Generator — Free VAT Invoice Maker with PDF Download | SmartFlexa";
const description =
  "Create professional UK invoices in GBP (£) with VAT support, company logo, and payment details. Free invoice generator for UK freelancers, sole traders, and limited companies.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/tools/uk-invoice-generator` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/tools/uk-invoice-generator`,
  },
  robots: { index: true, follow: true },
};

export default function UkInvoiceGeneratorLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
