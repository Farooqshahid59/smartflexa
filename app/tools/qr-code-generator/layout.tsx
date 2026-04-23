import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "QR Code Generator Online Free";
const description =
  "Generate QR codes instantly for URLs, text, and more. Free online QR code generator with download option.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tools/qr-code-generator",
  },
  keywords: [
    "QR code generator",
    "QR code",
    "create QR code",
    "QR PNG",
    "SmartFlexa",
  ],
  openGraph: {
    title: `${title} | SmartFlexa`,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: "/tools/qr-code-generator",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | SmartFlexa`,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function QrCodeGeneratorLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
