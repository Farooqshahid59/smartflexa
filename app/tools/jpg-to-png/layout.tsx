import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Convert JPG to PNG Online Free | SmartFlexa";
const description =
  "Free JPG to PNG converter. Convert JPEG images to PNG instantly with preview and download. Fast and secure tool.";

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: "https://smartflexa.com/tools/jpg-to-png",
  },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: "/tools/jpg-to-png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function JpgToPngLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
