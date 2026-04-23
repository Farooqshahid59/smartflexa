import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Image to Base64 Converter Online Free | PNG, JPG, WebP";
const description =
  "Convert PNG, JPG, and WebP images to Base64 instantly. Free online encoder with preview and copy-ready data URL output.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://www.smartflexa.com/tools/image-to-base64",
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
    url: "https://www.smartflexa.com/tools/image-to-base64",
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
