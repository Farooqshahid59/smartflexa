import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Crop Image Online Free (Circle & Rectangle) | SmartFlexa";
const description =
  "Crop images online easily with rectangle or circle crop. Free tool for Instagram, profile pictures, and more.";

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: "https://smartflexa.com/tools/crop-image",
  },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: "/tools/crop-image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CropImageLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
