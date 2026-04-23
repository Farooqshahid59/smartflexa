import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "snake_case Converter — Python & SQL Columns | SmartFlexa";
const description =
  "Convert labels to snake_case online: lowercase underscore tokens, live grid with copy, optional cleanup—client-side on SmartFlexa.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/snake-case-converter` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/snake-case-converter`,
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
