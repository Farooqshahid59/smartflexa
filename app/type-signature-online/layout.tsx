import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SignatureGoogleFonts } from "@/components/signature-google-fonts";
import { siteUrl } from "@/lib/site";

const title = "Type Signature Online Free — Script Fonts | SmartFlexa";
const description =
  "Type your name and preview script-style signature fonts. Download a PNG instantly—runs in your browser with no upload.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/type-signature-online` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/type-signature-online`,
  },
  robots: { index: true, follow: true },
};

export default function TypeSignatureOnlineLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <SignatureGoogleFonts />
      {children}
    </>
  );
}
