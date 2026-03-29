import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "PDF to Word Converter Online Free | SmartFlexa";
const description =
  "Convert PDF to Word online for free. Easily turn PDFs into editable DOC files with our fast and secure tool.";

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: "https://www.smartflexa.com/tools/pdf-to-word",
  },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: "/tools/pdf-to-word",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PdfToWordLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}

