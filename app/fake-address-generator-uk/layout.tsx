import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Fake UK Address Generator — Postcode Test Data | SmartFlexa";
const description =
  "Random UK-style fake addresses with counties, cities, and postcodes for forms and QA. Free browser-only generator.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/fake-address-generator-uk` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/fake-address-generator-uk`,
  },
  robots: { index: true, follow: true },
};

export default function FakeAddressUkLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
