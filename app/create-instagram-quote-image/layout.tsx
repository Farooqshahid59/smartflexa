import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Create Instagram Quote Image — 1080×1350 Canvas | SmartFlexa";
const description =
  "Create Instagram quote images with a portrait canvas preset, readable typography, optional photo background—export PNG or JPG locally on SmartFlexa.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/create-instagram-quote-image` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/create-instagram-quote-image`,
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
