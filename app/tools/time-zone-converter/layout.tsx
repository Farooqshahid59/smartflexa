import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Time Zone Converter Online Free";
const description =
  "Convert time between different time zones instantly. Free online time zone converter for global use.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://www.smartflexa.com/tools/time-zone-converter",
  },
  keywords: [
    "time zone converter",
    "world clock",
    "UTC",
    "meeting time",
    "DST",
    "SmartFlexa",
  ],
  openGraph: {
    title: `${title} | SmartFlexa`,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: "https://www.smartflexa.com/tools/time-zone-converter",
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

export default function TimeZoneConverterLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
