import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Word to PDF Converter Online Free | SmartFlexa";
const description =
  "Convert DOC and DOCX files to PDF online for free. Fast, secure, and easy-to-use Word to PDF converter.";

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: "https://www.smartflexa.com/tools/word-to-pdf",
  },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: "/tools/word-to-pdf",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function WordToPdfLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}

