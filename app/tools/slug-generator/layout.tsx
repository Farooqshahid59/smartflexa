import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "Slug Generator Online Free";
const description =
  "Generate SEO-friendly URL slugs instantly. Convert text into clean, readable slugs for websites and blogs.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/tools/slug-generator",
  },
  keywords: [
    "slug generator",
    "URL slug",
    "SEO friendly URL",
    "permalink",
    "SmartFlexa",
  ],
  openGraph: {
    title: `${title} | SmartFlexa`,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: "/tools/slug-generator",
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

export default function SlugGeneratorLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
