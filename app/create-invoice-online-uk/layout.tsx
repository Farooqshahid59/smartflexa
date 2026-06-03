import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Create Invoice Online UK — Free GBP Invoice Maker | SmartFlexa";
const description =
  "Create invoice online UK in minutes. Add line items in GBP, apply VAT, upload your logo, and download a professional PDF—no account needed.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/create-invoice-online-uk` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/create-invoice-online-uk`,
  },
  robots: { index: true, follow: true },
};

export default function CreateInvoiceOnlineUkLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
