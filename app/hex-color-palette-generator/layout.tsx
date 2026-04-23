import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "HEX Color Palette Generator — Copy-Ready Codes & CSS Export | SmartFlexa";
const description =
  "Generate palettes with uppercase HEX codes, matching RGB strings, and downloadable CSS custom properties. Works fully in your browser.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: `${siteUrl}/hex-color-palette-generator`,
  },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/hex-color-palette-generator`,
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
