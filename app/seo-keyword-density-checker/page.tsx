import Link from "next/link";

import { KeywordDensityCheckerTool } from "@/app/tools/keyword-density-checker/keyword-density-checker-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function SeoKeywordDensityCheckerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.seoKeywordDensityChecker)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 bg-background" aria-labelledby="seo-kdc-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">SEO keyword density checker</span>
          </nav>
          <h1
            id="seo-kdc-h1"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            SEO keyword density checker
          </h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Search specialists auditing a landing page rarely ask for density in isolation—they
              want the <strong className="text-foreground">SEO keyword density checker</strong> view
              alongside headings, internal links, and schema. SmartFlexa keeps the math transparent:
              every alphanumeric token is counted once in the denominator, each row shows raw
              frequency and percentage, and you can strip stop words so the grid surfaces nouns and
              verbs instead of glue words.
            </p>
            <p>
              Use the highlight preview after major rewrites to confirm you did not push important
              phrases only into footers or disclaimers. Because processing stays in the tab, you can
              paste pre-rendered HTML source stripped elsewhere, or competitor snippets for training
              workshops—just remember ethical and contractual boundaries when borrowing text.
            </p>
            <p>
              Canonical documentation, FAQ schema, and the extended article live on the{" "}
              <Link
                href="/tools/keyword-density-checker"
                className="font-medium text-foreground underline"
              >
                Check keyword density
              </Link>{" "}
              route; the widget below is the same implementation shared across SmartFlexa hubs.
            </p>
          </article>
          <div className="mt-10">
            <KeywordDensityCheckerTool />
          </div>
          <div className="mt-14">
            <RelatedTools currentPath="/seo-keyword-density-checker" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
