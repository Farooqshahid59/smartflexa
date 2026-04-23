import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Time Zone Converter: Convert PST, EST, UTC Online Free | SmartFlexa";
const description =
  "Convert time between world time zones instantly. Free online PST/EST/UTC time zone converter with DST-aware results.";

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
    card: "summary_large_image",
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
