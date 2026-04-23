import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "BMI Calculator Online Free | Check Body Mass Index";
const description =
  "Calculate your Body Mass Index (BMI) instantly with metric inputs. Free BMI calculator with category guidance.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://www.smartflexa.com/tools/bmi-calculator",
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
    url: "https://www.smartflexa.com/tools/bmi-calculator",
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

export default function BmiCalculatorLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
