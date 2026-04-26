import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "AI Grammar Fixer Free (Correct Sentences Instantly) | SmartFlexa";
const description =
  "Fix grammar mistakes and improve sentences instantly using AI. Free grammar correction tool online.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/tools/ai-grammar-fixer` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/tools/ai-grammar-fixer`,
  },
  robots: { index: true, follow: true },
};

export default function AiGrammarFixerLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
