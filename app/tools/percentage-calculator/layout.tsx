import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Percentage Calculator Online Free";
const description =
  "Calculate percentages instantly. Find percentage increase, decrease, and difference with our free online calculator.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://smartflexa.com/tools/percentage-calculator",
  },
  keywords: [
    "percentage calculator",
    "percent increase",
    "percent decrease",
    "percentage difference",
    "SmartFlexa",
  ],
  openGraph: {
    title: `${title} | SmartFlexa`,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: "https://smartflexa.com/tools/percentage-calculator",
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

export default function PercentageCalculatorLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
