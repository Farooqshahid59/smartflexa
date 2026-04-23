import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "QR Code Scanner Online | Scan QR from Camera or Image Free";
const description =
  "Scan QR codes instantly from your camera or uploaded screenshots. Free online QR scanner with local processing.";

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
    card: "summary_large_image",
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
