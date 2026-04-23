import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title =
  "Case Converter (camelCase, snake_case, kebab-case Online) | SmartFlexa";
const description =
  "Convert text to camelCase, snake_case, kebab-case and more. Free developer case converter tool.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: `${siteUrl}/tools/case-converter-dev`,
  },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/tools/case-converter-dev`,
  },
  robots: { index: true, follow: true },
};

export default function CaseConverterDevLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
