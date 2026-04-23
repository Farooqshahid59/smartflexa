import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title =
  "India Passport Photo Size (35×45 mm) — Free Online Maker | SmartFlexa";
const description =
  "India passport photo size in mm and pixels: 35×45 mm prints and a typical 413×531 px export. Crop online, white background, JPG + A4 sheet in your browser—confirm rules on the official portal.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/passport-photo-size-india` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/passport-photo-size-india`,
  },
  robots: { index: true, follow: true },
};

export default function PassportPhotoSizeIndiaLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
