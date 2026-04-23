import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SignatureGoogleFonts } from "@/components/signature-google-fonts";
import { siteUrl } from "@/lib/site";

const title =
  "Signature Generator Online Free (Draw or Type Your Signature) | SmartFlexa";
const description =
  "Create your digital signature online for free. Draw or type your signature and download instantly.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/tools/signature-generator` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/tools/signature-generator`,
  },
  robots: { index: true, follow: true },
};

export default function SignatureGeneratorLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <SignatureGoogleFonts />
      {children}
    </>
  );
}
