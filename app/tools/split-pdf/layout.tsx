import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Split PDF Online Free (Extract Pages) | SmartFlexa";
const description =
  "Split PDF files online and extract pages easily. Free and secure PDF splitter with fast processing.";

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: "https://smartflexa.com/tools/split-pdf",
  },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: "/tools/split-pdf",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SplitPdfLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
