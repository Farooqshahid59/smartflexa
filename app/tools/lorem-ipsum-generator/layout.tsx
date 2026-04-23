import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Lorem Ipsum Generator Online Free";
const description =
  "Generate lorem ipsum placeholder text instantly. Free dummy text generator for designers and developers.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tools/lorem-ipsum-generator",
  },
  keywords: [
    "lorem ipsum",
    "placeholder text",
    "dummy text",
    "lorem generator",
    "SmartFlexa",
  ],
  openGraph: {
    title: `${title} | SmartFlexa`,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: "/tools/lorem-ipsum-generator",
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

export default function LoremIpsumGeneratorLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
