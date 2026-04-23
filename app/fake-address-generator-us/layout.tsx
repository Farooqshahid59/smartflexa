import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Fake US Address Generator — Random Test Data | SmartFlexa";
const description =
  "Generate random US-style fake addresses: names, streets, cities, states, ZIP codes, and phone patterns for QA. Free, client-side only.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/fake-address-generator-us` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/fake-address-generator-us`,
  },
  robots: { index: true, follow: true },
};

export default function FakeAddressUsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
