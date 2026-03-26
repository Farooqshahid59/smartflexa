import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Remove Duplicate Lines Online Free";
const description =
  "Remove duplicate lines from text instantly. Free online tool to clean and deduplicate text quickly and securely.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tools/remove-duplicate-lines",
  },
  keywords: [
    "remove duplicate lines",
    "deduplicate text",
    "unique lines",
    "text cleaner",
    "SmartFlexa",
  ],
  openGraph: {
    title: `${title} | SmartFlexa`,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: "/tools/remove-duplicate-lines",
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

export default function RemoveDuplicateLinesLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
