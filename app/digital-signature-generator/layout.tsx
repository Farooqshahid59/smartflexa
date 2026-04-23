import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SignatureGoogleFonts } from "@/components/signature-google-fonts";
import { siteUrl } from "@/lib/site";

const title = "Digital Signature Generator — Free PNG (Draw or Type) | SmartFlexa";
const description =
  "Generate a digital signature image: draw or type, optional transparent PNG. Browser-only tool—learn when a PNG works vs. certified e-sign.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/digital-signature-generator` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/digital-signature-generator`,
  },
  robots: { index: true, follow: true },
};

export default function DigitalSignatureGeneratorLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <SignatureGoogleFonts />
      {children}
    </>
  );
}
