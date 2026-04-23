import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "UK Passport Photo Size (35×45 mm) — Free Online Maker | SmartFlexa";
const description =
  "UK passport photo size: 35×45 mm on paper and a typical 413×531 px digital file. Crop in the browser, add a white background, download JPG or an A4 sheet—always verify on GOV.UK.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/passport-photo-size-uk` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/passport-photo-size-uk`,
  },
  robots: { index: true, follow: true },
};

export default function PassportPhotoSizeUkLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
