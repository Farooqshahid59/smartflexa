import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Resize Image Online Free (Passport, Instagram) | SmartFlexa";
const description =
  "Resize images to any size or preset dimensions like passport and Instagram. Free online image resizer tool with instant preview.";

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: "https://smartflexa.com/tools/resize-image",
  },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: "/tools/resize-image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ResizeImageLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
