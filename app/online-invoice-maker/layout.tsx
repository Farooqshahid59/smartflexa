import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Online Invoice Maker — Create Invoices in Your Browser | SmartFlexa";
const description =
  "Online invoice maker with live preview, optional tax, PDF download, and print. No uploads—runs entirely client-side.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/online-invoice-maker` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/online-invoice-maker`,
  },
  robots: { index: true, follow: true },
};

export default function OnlineInvoiceMakerLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
