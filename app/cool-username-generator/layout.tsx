import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Cool Username Generator — Stylish Screen Names | SmartFlexa";
const description =
  "Cool username generator: modern blends, length control, optional symbols and numbers. Free batch ideas with copy—all in your browser.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/cool-username-generator` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/cool-username-generator`,
  },
  robots: { index: true, follow: true },
};

export default function CoolUsernameGeneratorLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
