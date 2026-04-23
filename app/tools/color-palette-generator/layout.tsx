import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title =
  "Color Palette Generator Free (From Image & Random Colors) | SmartFlexa";
const description =
  "Generate beautiful color palettes or extract colors from images. Free online color palette tool.";

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: `${siteUrl}/tools/color-palette-generator`,
  },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/tools/color-palette-generator`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ColorPaletteGeneratorLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
