import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Word Counter";
const description =
  "Free online word counter for SmartFlexa. Count words, characters, and sentences in real time as you type — runs in your browser, no signup required.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tools/word-counter",
  },
  keywords: [
    "word counter",
    "character count",
    "sentence count",
    "count words online",
    "text statistics",
    "SmartFlexa",
  ],
  openGraph: {
    title: `${title} | SmartFlexa`,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: "/tools/word-counter",
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

export default function WordCounterLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
