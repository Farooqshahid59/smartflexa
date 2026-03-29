import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Merge PDF Files Online Free | SmartFlexa";
const description =
  "Combine multiple PDF files into one instantly. Free online PDF merge tool with secure processing and fast download.";

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: "https://www.smartflexa.com/tools/merge-pdf",
  },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: "/tools/merge-pdf",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MergePdfLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
