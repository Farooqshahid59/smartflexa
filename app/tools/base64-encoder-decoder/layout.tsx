import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Base64 Encoder & Decoder Online Free";
const description =
  "Encode and decode Base64 instantly with our free online tool. Fast, secure, and easy to use.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteUrl}/tools/base64-encoder-decoder`,
  },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/tools/base64-encoder-decoder`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Base64EncoderDecoderLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
