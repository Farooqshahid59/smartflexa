import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "UK Invoice Generator — Free GBP Invoices with VAT | SmartFlexa";
const description =
  "Free UK invoice generator for freelancers and businesses. Create GBP invoices with VAT, logo upload, and PDF download—no account required.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/uk-invoice-generator` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/uk-invoice-generator`,
  },
  robots: { index: true, follow: true },
};

export default function UkInvoiceGeneratorLandingLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
