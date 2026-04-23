import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "2×2 Photo Maker Online Free — Passport & ID Size | SmartFlexa";
const description =
  "Make 2 by 2 inch photos online: square crop, 600×600 px JPG, white background, optional A4 print sheet. Great for US-style IDs, forms, and kits—runs locally in your browser.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/2x2-photo-maker` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/2x2-photo-maker`,
  },
  robots: { index: true, follow: true },
};

export default function TwoByTwoPhotoMakerLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
