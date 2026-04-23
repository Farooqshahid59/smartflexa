import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Color Palette Generator from Image — Extract Dominant Colors | SmartFlexa";
const description =
  "Upload a JPG, PNG, or WebP and extract five to six dominant colors into a shareable palette. Runs locally in your browser on SmartFlexa.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: `${siteUrl}/color-palette-generator-from-image`,
  },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/color-palette-generator-from-image`,
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
