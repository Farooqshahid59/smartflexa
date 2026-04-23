import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Unit Converter Online Free";
const description =
  "Convert units instantly. Free online unit converter for length, weight, temperature, and more.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://www.smartflexa.com/tools/unit-converter",
  },
  keywords: [
    "unit converter",
    "cm to inches",
    "kg to lbs",
    "celsius to fahrenheit",
    "km/h to mph",
    "SmartFlexa",
  ],
  openGraph: {
    title: `${title} | SmartFlexa`,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: "https://www.smartflexa.com/tools/unit-converter",
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

export default function UnitConverterLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
