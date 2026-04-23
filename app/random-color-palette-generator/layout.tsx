import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Random Color Palette Generator — Harmonic Swatches & Export | SmartFlexa";
const description =
  "Generate random harmonic color palettes with HEX and RGB, lock swatches, and export JSON, CSS variables, or a PNG strip. Free and client-side.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: `${siteUrl}/random-color-palette-generator`,
  },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/random-color-palette-generator`,
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
