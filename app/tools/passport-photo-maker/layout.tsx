import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title =
  "Passport Size Photo Maker Online Free (2x2, Visa Photos) | SmartFlexa";
const description =
  "Make passport and visa-style photos free in your browser: 2×2 US photos, UK & India 35×45 mm presets, custom pixels, white background, JPG download and optional A4 print sheet. No upload to our servers.";

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: `${siteUrl}/tools/passport-photo-maker`,
  },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/tools/passport-photo-maker`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PassportPhotoMakerLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
