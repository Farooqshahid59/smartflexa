import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Fake India Address Generator — PIN & State Test Data | SmartFlexa";
const description =
  "Generate random India-format fake addresses with states, cities, PIN codes, and phone-style numbers for testing. Free, runs in your browser.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/fake-address-generator-india` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/fake-address-generator-india`,
  },
  robots: { index: true, follow: true },
};

export default function FakeAddressIndiaLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
