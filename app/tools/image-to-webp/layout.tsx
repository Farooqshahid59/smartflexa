import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Convert Image to WebP Online Free | SmartFlexa";
const description =
  "Convert JPG and PNG images to WebP format online. Reduce image size and improve performance. Free and secure tool.";

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: "https://www.smartflexa.com/tools/image-to-webp",
  },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: "/tools/image-to-webp",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ImageToWebpLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
