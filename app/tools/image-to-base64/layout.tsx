import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Image to Base64 Converter Online Free";
const description =
  "Convert images to Base64 instantly. Free online image to Base64 encoder with preview and copy option.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://smartflexa.com/tools/image-to-base64",
  },
  keywords: [
    "image to base64",
    "base64 image",
    "data URL",
    "encode image",
    "SmartFlexa",
  ],
  openGraph: {
    title: `${title} | SmartFlexa`,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: "https://smartflexa.com/tools/image-to-base64",
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

export default function ImageToBase64Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
