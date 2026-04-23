import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "HTML to Text Converter Online Free";
const description =
  "Convert HTML to plain text instantly. Remove HTML tags and clean content with our free online tool.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tools/html-to-text",
  },
  keywords: [
    "HTML to text",
    "strip HTML",
    "remove HTML tags",
    "plain text",
    "SmartFlexa",
  ],
  openGraph: {
    title: `${title} | SmartFlexa`,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: "/tools/html-to-text",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | SmartFlexa`,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HtmlToTextLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
