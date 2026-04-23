import { siteUrl } from "@/lib/site";

export const metadata = {
  title: "AI Text Detector Free (Check ChatGPT Content Instantly)",
  description:
    "Detect AI-generated text instantly with SmartFlexa. Check ChatGPT content, see AI and human scores, confidence, and suspicious sentences.",
  alternates: {
    canonical: `${siteUrl}/ai-detector`,
  },
  openGraph: {
    title: "AI Text Detector Free (Check ChatGPT Content Instantly)",
    description:
      "Detect AI-generated text instantly with SmartFlexa. Check ChatGPT content, see AI and human scores, confidence, and suspicious sentences.",
    type: "website",
    siteName: "SmartFlexa",
    url: `${siteUrl}/ai-detector`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AiDetectorLayout({ children }) {
  return children;
}
