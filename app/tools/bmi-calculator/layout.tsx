import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "BMI Calculator Online Free";
const description =
  "Calculate your Body Mass Index (BMI) instantly. Free BMI calculator with health category insights.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://smartflexa.com/tools/bmi-calculator",
  },
  keywords: [
    "BMI calculator",
    "body mass index",
    "BMI chart",
    "healthy weight",
    "SmartFlexa",
  ],
  openGraph: {
    title: `${title} | SmartFlexa`,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: "https://smartflexa.com/tools/bmi-calculator",
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

export default function BmiCalculatorLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
