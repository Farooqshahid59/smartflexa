import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Username Generator Free (Cool, Gaming & Instagram Names) | SmartFlexa";
const description =
  "Generate unique usernames for Instagram, gaming, and social media. Free online username generator.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/tools/username-generator` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/tools/username-generator`,
  },
  robots: { index: true, follow: true },
};

export default function UsernameGeneratorLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
