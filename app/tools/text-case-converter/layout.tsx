import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Text Case Converter Online Free";
const description =
  "Convert text to uppercase, lowercase, title case, or sentence case instantly with our free online tool.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tools/text-case-converter",
  },
  keywords: [
    "text case converter",
    "uppercase",
    "lowercase",
    "title case",
    "sentence case",
    "SmartFlexa",
  ],
  openGraph: {
    title: `${title} | SmartFlexa`,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: "/tools/text-case-converter",
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

export default function TextCaseConverterLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
