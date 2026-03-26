import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Compress PDF Online Free (Reduce File Size) | SmartFlexa";
const description =
  "Reduce PDF file size online with our free PDF compressor. Fast, secure, and easy to use.";

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: "https://smartflexa.com/tools/compress-pdf",
  },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: "/tools/compress-pdf",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CompressPdfLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
