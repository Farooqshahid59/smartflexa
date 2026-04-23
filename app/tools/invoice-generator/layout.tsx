import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Free Invoice Generator Online (Create & Download PDF Invoice) | SmartFlexa";
const description =
  "Create professional invoices online for free. Add items, calculate totals, and download PDF instantly.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/tools/invoice-generator` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/tools/invoice-generator`,
  },
  robots: { index: true, follow: true },
};

export default function InvoiceGeneratorLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
