import Link from "next/link";

import { MetaTagGeneratorTool } from "@/app/tools/meta-tag-generator/meta-tag-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function SeoMetaTagGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.seoMetaTagGenerator)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main
        id="main-content"
        className="flex-1 bg-background"
        aria-labelledby="seo-meta-heading"
      >
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">SEO meta tag generator</span>
          </nav>

          <h1
            id="seo-meta-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            SEO meta tag generator
          </h1>

          <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Ranking discussions often jump to backlinks and Core Web Vitals, yet every crawl still
              begins with the basics: a readable <strong className="text-foreground">title</strong>, a
              trustworthy <strong className="text-foreground">meta description</strong>, and{" "}
              <strong className="text-foreground">robots</strong> instructions that match what you
              actually want indexed. This <strong className="text-foreground">SEO meta tag generator</strong>{" "}
              page foregrounds those primitives so you can iterate copy with a live Google-style
              snippet beside the markup—ideal when you are rewriting a services page or cleaning up
              duplicate titles after a migration.
            </p>
            <p>
              Social fields remain available because modern SEO briefs rarely stop at blue links:
              the same URL might rank in search while also circulating in Slack threads. Use Open
              Graph and Twitter inputs when you need parity between SERP messaging and unfurl cards.
              For OG-only or Twitter-only workflows, see our{" "}
              <Link href="/open-graph-generator" className="font-medium text-foreground underline">
                Open Graph generator
              </Link>{" "}
              and{" "}
              <Link href="/twitter-card-generator" className="font-medium text-foreground underline">
                Twitter card generator
              </Link>{" "}
              landing pages—or return to the full{" "}
              <Link href="/tools/meta-tag-generator" className="font-medium text-foreground underline">
                meta tag generator
              </Link>{" "}
              hub for FAQs and deeper guidance.
            </p>
            <p>
              Need raw head markup language for static HTML exports? Open the{" "}
              <Link
                href="/html-meta-tags-generator"
                className="font-medium text-foreground underline"
              >
                HTML meta tags generator
              </Link>{" "}
              companion, which frames the same editor from a paste-into-template angle.
            </p>
          </div>

          <div className="mt-10">
            <MetaTagGeneratorTool />
          </div>

          <div className="mt-14">
            <RelatedTools currentPath="/seo-meta-tag-generator" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
