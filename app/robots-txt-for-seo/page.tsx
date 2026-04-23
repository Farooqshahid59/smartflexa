import Link from "next/link";

import { RobotsTxtGeneratorTool } from "@/app/tools/robots-txt-generator/robots-txt-generator-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function RobotsTxtForSeoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.robotsTxtForSeo)} />
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
        aria-labelledby="robots-seo-heading"
      >
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Robots.txt for SEO</span>
          </nav>

          <h1
            id="robots-seo-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Robots.txt for SEO
          </h1>

          <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              <strong className="text-foreground">Robots.txt for SEO</strong> is not about tricking
              algorithms—it is about budget. Search engines allocate a crawl budget per host; when
              faceted navigation generates infinite URL variants, you burn that budget on duplicates
              instead of fresh articles or inventory updates. A disciplined Disallow strategy (often
              paired with parameter handling in Search Console) keeps crawlers focused on URLs that
              earn revenue or backlinks.
            </p>
            <p>
              This page still loads the full SmartFlexa editor so practitioners can prototype rules
              while reading SEO-framed guidance. Remember that blocking a URL with robots.txt does not
              remove it from the index if it was already discovered; combine with{" "}
              <code className="rounded bg-muted px-1">noindex</code> or removals when the goal is
              suppression, not merely crawl savings.
            </p>
            <p>
              Jump to{" "}
              <Link href="/tools/robots-txt-generator" className="font-medium text-foreground underline">
                robots.txt generator
              </Link>{" "}
              for FAQs, or compare intent pages such as{" "}
              <Link href="/create-robots-txt" className="font-medium text-foreground underline">
                create robots.txt
              </Link>{" "}
              and{" "}
              <Link
                href="/robots-txt-generator-online"
                className="font-medium text-foreground underline"
              >
                robots.txt generator online
              </Link>
              .
            </p>
          </div>

          <div className="mt-10">
            <RobotsTxtGeneratorTool />
          </div>

          <div className="mt-14">
            <RelatedTools currentPath="/robots-txt-for-seo" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
