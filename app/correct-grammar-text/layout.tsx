import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Correct Grammar Text — AI Proofreading Helper | SmartFlexa";
const description = "Correct grammar text instantly with AI and produce clearer, cleaner writing in your browser.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/correct-grammar-text` },
  openGraph: { title, description, type: "website", siteName: "SmartFlexa", url: `${siteUrl}/correct-grammar-text` },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
