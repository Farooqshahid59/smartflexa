import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "UUID Generator Online Free";
const description =
  "Generate UUID v4 instantly with our free online UUID generator. Create unique identifiers quickly and securely.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tools/uuid-generator",
  },
  keywords: [
    "UUID generator",
    "UUID v4",
    "GUID",
    "unique id",
    "SmartFlexa",
  ],
  openGraph: {
    title: `${title} | SmartFlexa`,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: "/tools/uuid-generator",
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

export default function UuidGeneratorLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
