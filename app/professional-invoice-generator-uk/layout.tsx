import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Professional Invoice Generator UK — Logo, VAT & PDF | SmartFlexa";
const description =
  "Professional invoice generator UK with company logo, VAT registration fields, payment details, and clean PDF layout for UK businesses.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/professional-invoice-generator-uk` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/professional-invoice-generator-uk`,
  },
  robots: { index: true, follow: true },
};

export default function ProfessionalInvoiceGeneratorUkLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
