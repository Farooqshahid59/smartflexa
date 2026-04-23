import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Invoice Generator Free — PDF Invoices in Your Browser | SmartFlexa";
const description =
  "Free invoice generator: line items, optional tax, live preview, PDF download. No signup—runs locally for freelancers and small businesses.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/invoice-generator-free` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/invoice-generator-free`,
  },
  robots: { index: true, follow: true },
};

export default function InvoiceGeneratorFreeLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
