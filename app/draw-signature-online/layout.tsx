import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SignatureGoogleFonts } from "@/components/signature-google-fonts";
import { siteUrl } from "@/lib/site";

const title = "Draw Signature Online Free — Mouse & Touch | SmartFlexa";
const description =
  "Draw your signature online on a smooth canvas: pen thickness, colors, transparent PNG export. Free, fast, and client-side only.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/draw-signature-online` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/draw-signature-online`,
  },
  robots: { index: true, follow: true },
};

export default function DrawSignatureOnlineLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <SignatureGoogleFonts />
      {children}
    </>
  );
}
