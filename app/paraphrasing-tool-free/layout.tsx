import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "Paraphrasing Tool Free — AI Rewrite Assistant | SmartFlexa";
const description = "Use a free paraphrasing tool to rewrite paragraphs with clearer wording and preserved meaning.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/paraphrasing-tool-free` },
  openGraph: { title, description, type: "website", siteName: "SmartFlexa", url: `${siteUrl}/paraphrasing-tool-free` },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
