import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Free Invoice Generator UK — No Signup, PDF in Browser | SmartFlexa";
const description =
  "Free invoice generator UK for sole traders and small businesses. GBP invoices with VAT, logo, and instant PDF download—runs locally in your browser.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/free-invoice-generator-uk` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/free-invoice-generator-uk`,
  },
  robots: { index: true, follow: true },
};

export default function FreeInvoiceGeneratorUkLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
