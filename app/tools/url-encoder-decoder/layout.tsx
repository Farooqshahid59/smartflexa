import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "URL Encoder & Decoder Online Free";
const description =
  "Encode and decode URLs instantly with our free online tool. Fast, secure, and easy to use.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tools/url-encoder-decoder",
  },
  keywords: [
    "URL encode",
    "URL decode",
    "percent encoding",
    "encodeURIComponent",
    "SmartFlexa",
  ],
  openGraph: {
    title: `${title} | SmartFlexa`,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: "/tools/url-encoder-decoder",
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

export default function UrlEncoderDecoderLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
