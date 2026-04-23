import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title =
  "Fake Address Generator Online (Random US, UK, India Addresses) | SmartFlexa";
const description =
  "Generate random fake addresses for testing and signup forms. Free online tool with multiple countries.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/tools/fake-address-generator` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/tools/fake-address-generator`,
  },
  robots: { index: true, follow: true },
};

export default function FakeAddressGeneratorLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
