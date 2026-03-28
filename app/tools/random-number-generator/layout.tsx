import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Random Number Generator Online Free";
const description =
  "Generate random numbers instantly with our free online random number generator. Simple, fast, and secure.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tools/random-number-generator",
  },
  keywords: [
    "random number generator",
    "random integer",
    "dice roll",
    "random picker",
    "SmartFlexa",
  ],
  openGraph: {
    title: `${title} | SmartFlexa`,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: "/tools/random-number-generator",
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

export default function RandomNumberGeneratorLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
