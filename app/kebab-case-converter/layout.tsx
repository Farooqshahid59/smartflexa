import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "kebab-case Converter — URLs & CSS Classes | SmartFlexa";
const description =
  "Convert text to kebab-case online: hyphenated lowercase tokens, instant copy, optional trim and symbol strip—runs locally on SmartFlexa.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/kebab-case-converter` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/kebab-case-converter`,
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
