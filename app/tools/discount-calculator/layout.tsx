import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Discount Calculator Online Free";
const description =
  "Calculate discounts instantly. Find discount amount and final price with our free online discount calculator.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://www.smartflexa.com/tools/discount-calculator",
  },
  keywords: [
    "discount calculator",
    "sale price",
    "percent off",
    "final price",
    "SmartFlexa",
  ],
  openGraph: {
    title: `${title} | SmartFlexa`,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: "https://www.smartflexa.com/tools/discount-calculator",
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

export default function DiscountCalculatorLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
