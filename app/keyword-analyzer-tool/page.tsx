import Link from "next/link";

import { KeywordDensityCheckerTool } from "@/app/tools/keyword-density-checker/keyword-density-checker-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function KeywordAnalyzerToolPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.keywordAnalyzerTool)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 bg-background" aria-labelledby="analyzer-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Keyword analyzer tool</span>
          </nav>
          <h1
            id="analyzer-h1"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Keyword analyzer tool
          </h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Editors comparing two blog variants often want a <strong className="text-foreground">keyword analyzer tool</strong>{" "}
              that surfaces repetition before they commit to a headline. SmartFlexa pairs a sortable
              frequency table with a highlighted excerpt so you can see whether a phrase clusters in
              the introduction or leaks awkwardly into every bullet.
            </p>
            <p>
              Journalists and developer advocates can scan transcripts pasted from interview tools:
              filler tokens may spike in the table even when the narrative feels fine aloud. Toggle
              stop-word filtering when you care about substantive nouns only, then switch ascending
              sort to catch rare but important product codenames that only appear once.
            </p>
            <p>
              The same engine powers the primary SmartFlexa entry point—open{" "}
              <Link
                href="/tools/keyword-density-checker"
                className="font-medium text-foreground underline"
              >
                SEO keyword analyzer
              </Link>{" "}
              for long-form guidance, JSON-LD FAQs, and links to meta tag, sitemap, and robots
              generators once wording is stable.
            </p>
          </article>
          <div className="mt-10">
            <KeywordDensityCheckerTool />
          </div>
          <div className="mt-14">
            <RelatedTools currentPath="/keyword-analyzer-tool" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
