import type { Metadata } from "next";
import { Suspense } from "react";

// import { BlogSection } from "@/components/blog-section";
import { FeaturesSection } from "@/components/features-section";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HomeSearchToolsSkeleton } from "@/components/home-search-tools-skeleton";
import { HomeSearchTools } from "@/components/home-search-tools";
import { JsonLd } from "@/components/json-ld";
import { getWebSiteJsonLd } from "@/lib/schema";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free AI Tools, Developer Tools & Calculators | SmartFlexa",
  description:
    "Use free AI tools, developer utilities, image/PDF tools, and calculators on SmartFlexa. Try AI Email Writer, AI Paraphraser, AI Grammar Fixer, and AI Detector.",
  openGraph: {
    title: "Free AI Tools, Developer Tools & Calculators | SmartFlexa",
    description:
      "Use free AI tools, developer utilities, image/PDF tools, and calculators on SmartFlexa. Fast, browser-based, and no signup required.",
    type: "website",
    siteName: "SmartFlexa",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Tools, Developer Tools & Calculators | SmartFlexa",
    description:
      "Try AI Email Writer, AI Paraphraser, AI Grammar Fixer, AI Detector, and more free tools on SmartFlexa.",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function Home() {
  const organizationJsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SmartFlexa",
    url: siteUrl,
    logo: `${siteUrl}/favicon_io/android-chrome-512x512.png`,
  };

  const featuredToolsJsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured AI and Productivity Tools",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "AI Email Writer",
        url: `${siteUrl}/tools/ai-email-writer`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "AI Paraphrasing Tool",
        url: `${siteUrl}/tools/ai-paraphraser`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "AI Grammar Fixer",
        url: `${siteUrl}/tools/ai-grammar-fixer`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "AI Text Summarizer",
        url: `${siteUrl}/tools/ai-text-summarizer`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "AI Detector",
        url: `${siteUrl}/ai-detector`,
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getWebSiteJsonLd()} />
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={featuredToolsJsonLd} />
      <Header />
      <main className="flex-1">
        <Suspense fallback={<HomeSearchToolsSkeleton />}>
          <HomeSearchTools />
        </Suspense>
        {/* Blog section paused for now
        <BlogSection />
        */}
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}
