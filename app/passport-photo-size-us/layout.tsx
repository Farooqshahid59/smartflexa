import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "US Passport Photo Size (2×2 inches) — Free Online Maker | SmartFlexa";
const description =
  "US passport photo size explained: 2×2 inch prints and 600×600 px digital files. Crop your portrait, add a white background, download JPG or an A4 print sheet—processed in your browser.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/passport-photo-size-us` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/passport-photo-size-us`,
  },
  robots: { index: true, follow: true },
};

export default function PassportPhotoSizeUsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
