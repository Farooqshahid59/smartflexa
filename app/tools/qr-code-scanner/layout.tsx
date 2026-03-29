import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "QR Code Scanner Online Free";
const description =
  "Scan QR codes instantly using your camera or upload an image. Free online QR code scanner tool.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://www.smartflexa.com/tools/qr-code-scanner",
  },
  keywords: [
    "QR code scanner",
    "scan QR online",
    "QR reader",
    "camera QR",
    "SmartFlexa",
  ],
  openGraph: {
    title: `${title} | SmartFlexa`,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: "https://www.smartflexa.com/tools/qr-code-scanner",
  },
  twitter: {
    card: "summary",
    title: `${title} | SmartFlexa`,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function QrCodeScannerLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
