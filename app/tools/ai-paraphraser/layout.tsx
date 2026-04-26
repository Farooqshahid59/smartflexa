import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteUrl } from "@/lib/site";

const title = "AI Paraphrasing Tool Free (Rewrite Text Instantly) | SmartFlexa";
const description =
  "Rewrite sentences and paraphrase text instantly using AI. Free online paraphrasing tool.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${siteUrl}/tools/ai-paraphraser` },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/tools/ai-paraphraser`,
  },
  robots: { index: true, follow: true },
};

export default function AiParaphraserLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
