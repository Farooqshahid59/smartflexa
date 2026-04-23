import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Age Calculator Online Free";
const description =
  "Calculate your age instantly from date of birth. Free online age calculator with accurate results.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://www.smartflexa.com/tools/age-calculator",
  },
  keywords: [
    "age calculator",
    "date of birth",
    "how old am I",
    "age in days",
    "SmartFlexa",
  ],
  openGraph: {
    title: `${title} | SmartFlexa`,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: "https://www.smartflexa.com/tools/age-calculator",
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

export default function AgeCalculatorLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
