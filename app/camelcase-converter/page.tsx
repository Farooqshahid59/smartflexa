import Link from "next/link";

import { CaseConverterDevTool } from "@/app/tools/case-converter-dev/case-converter-dev-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function CamelCaseConverterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.camelCaseConverter)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 bg-background" aria-labelledby="cc-hub-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">camelCase converter</span>
          </nav>
          <h1
            id="cc-hub-h1"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            camelCase converter
          </h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              JavaScript and JSON ecosystems default to <strong className="text-foreground">camelCase</strong>{" "}
              for object keys and many function parameters, so engineers constantly translate product
              language into that shape. Rather than retyping &quot;monthly invoice total&quot; by
              hand—and risking a typo in the third word—paste the phrase here and copy the camelCase
              card alongside sibling formats for your Python service or SQL view.
            </p>
            <p>
              The converter tokenizes on spaces, hyphens, underscores, and mid-word capitals, then
              lowercases each segment before joining. That means pasted identifiers like{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">UserProfile</code>{" "}
              still round-trip sensibly when you need snake_case for a migration script in the same
              commit. Optional trimming collapses accidental double spaces from spreadsheets, while
              symbol stripping removes punctuation that would never compile in an identifier anyway.
            </p>
            <p>
              This landing page highlights camelCase search intent, but the widget below mirrors the
              full SmartFlexa developer grid. For FAQs and the canonical route, bookmark{" "}
              <Link
                href="/tools/case-converter-dev"
                className="font-medium text-foreground underline"
              >
                Developer case converter
              </Link>{" "}
              on <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">/tools/case-converter-dev</code>.
            </p>
          </article>
          <div className="mt-10">
            <CaseConverterDevTool />
          </div>
          <div className="mt-14">
            <RelatedTools currentPath="/camelcase-converter" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
