import Link from "next/link";

import { CaseConverterDevTool } from "@/app/tools/case-converter-dev/case-converter-dev-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function SnakeCaseConverterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.snakeCaseConverter)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 bg-background" aria-labelledby="snake-hub-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">snake_case converter</span>
          </nav>
          <h1
            id="snake-hub-h1"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            snake_case converter
          </h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Python, Django, and SQLAlchemy projects overwhelmingly prefer{" "}
              <strong className="text-foreground">snake_case</strong> for modules, functions, and
              database columns. When product spreadsheets arrive with Title Case headers, you need a
              fast mechanical translation into something PEP 8 will not flag—without opening a regex
              playground for every import.
            </p>
            <p>
              SmartFlexa underscores each token, lowercases the lot, and still shows camelCase and
              kebab-case siblings so cross-language teams can agree on one source phrase during API
              design reviews. Enable <strong className="text-foreground">Remove special characters</strong>{" "}
              when headers include percent signs or parentheses from pivot tables; keep it off when
              you are converting already-valid identifiers that merely use mixed casing.
            </p>
            <p>
              After you copy snake_case values, validate JSON samples with the main formatter and
              compare against the canonical multi-style page:{" "}
              <Link
                href="/tools/case-converter-dev"
                className="font-medium text-foreground underline"
              >
                Convert text to camelCase
              </Link>{" "}
              and related exports live together there under structured metadata.
            </p>
          </article>
          <div className="mt-10">
            <CaseConverterDevTool />
          </div>
          <div className="mt-14">
            <RelatedTools currentPath="/snake-case-converter" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
