import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Convert PNG to JPG Online Free | SmartFlexa";
const description =
  "Free online PNG to JPG converter. Convert PNG images to JPG instantly with preview and download. Fast and secure.";

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: "https://www.smartflexa.com/tools/png-to-jpg",
  },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: "/tools/png-to-jpg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PngToJpgLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
