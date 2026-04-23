import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "JSON Minifier Online Free";
const description =
  "Minify JSON instantly with our free online JSON minifier. Reduce file size and improve performance easily.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tools/json-minifier",
  },
  keywords: [
    "JSON minifier",
    "minify JSON",
    "compact JSON",
    "JSON compress",
    "SmartFlexa",
  ],
  openGraph: {
    title: `${title} | SmartFlexa`,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: "/tools/json-minifier",
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

export default function JsonMinifierLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
