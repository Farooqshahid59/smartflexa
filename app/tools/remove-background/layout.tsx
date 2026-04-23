import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Remove Background from Image Free (Online Background Remover) | SmartFlexa";
const description =
  "Remove image background online for free. Simple and fast background remover tool.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: `${siteUrl}/tools/remove-background`,
  },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/tools/remove-background`,
  },
  robots: { index: true, follow: true },
};

export default function RemoveBackgroundLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
