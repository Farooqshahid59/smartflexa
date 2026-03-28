import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "EMI Calculator Online Free";
const description =
  "Calculate your loan EMI instantly. Free online EMI calculator for home, car, and personal loans.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://smartflexa.com/tools/emi-calculator",
  },
  keywords: [
    "EMI calculator",
    "loan EMI",
    "mortgage calculator",
    "home loan EMI",
    "SmartFlexa",
  ],
  openGraph: {
    title: `${title} | SmartFlexa`,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: "https://smartflexa.com/tools/emi-calculator",
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

export default function EmiCalculatorLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
