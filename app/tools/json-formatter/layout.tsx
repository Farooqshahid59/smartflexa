import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "JSON Formatter";
const description =
  "Free online JSON formatter and validator for SmartFlexa. Pretty-print JSON with 2-space indentation, fix errors, and copy formatted output — runs in your browser.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tools/json-formatter",
  },
  keywords: [
    "JSON formatter",
    "JSON pretty print",
    "JSON validator",
    "format JSON online",
    "beautify JSON",
    "SmartFlexa",
  ],
  openGraph: {
    title: `${title} | SmartFlexa`,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: "/tools/json-formatter",
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

export default function JsonFormatterLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
