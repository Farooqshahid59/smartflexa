import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Color Picker & HEX to RGB Converter Online";
const description =
  "Pick colors and convert HEX to RGB instantly. Free online color picker and converter for developers and designers.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://www.smartflexa.com/tools/color-picker",
  },
  keywords: [
    "color picker",
    "HEX to RGB",
    "RGB to HEX",
    "color converter",
    "SmartFlexa",
  ],
  openGraph: {
    title: `${title} | SmartFlexa`,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: "https://www.smartflexa.com/tools/color-picker",
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

export default function ColorPickerLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
