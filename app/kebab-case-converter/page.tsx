import Link from "next/link";

import { CaseConverterDevTool } from "@/app/tools/case-converter-dev/case-converter-dev-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function KebabCaseConverterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.kebabCaseConverter)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 bg-background" aria-labelledby="kebab-hub-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">kebab-case converter</span>
          </nav>
          <h1
            id="kebab-hub-h1"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            kebab-case converter
          </h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              <strong className="text-foreground">kebab-case</strong> is the lingua franca of URL
              segments, many CSS methodologies, and several static-site generators because hyphens
              rarely require escaping in HTML attributes and read cleanly in browser chrome. When a
              marketing headline must become a permalink slug, you want deterministic folding rules
              instead of manual search-and-replace across twenty locales.
            </p>
            <p>
              This SmartFlexa surface outputs hyphenated lowercase tokens while still exposing
              camelCase and PascalCase in the same pass—ideal when the docs team drafts titles but
              engineering owns route tables. Trim noisy whitespace from CMS exports, strip symbols
              that would break routing, then copy the kebab card directly into your router config or
              BEM-style class prefix.
            </p>
            <p>
              When values move into query strings, follow up with the URL encoder tool; for the full
              naming guide and FAQ schema, use the hub at{" "}
              <Link
                href="/tools/case-converter-dev"
                className="font-medium text-foreground underline"
              >
                Developer case converter
              </Link>{" "}
              which embeds this identical widget.
            </p>
          </article>
          <div className="mt-10">
            <CaseConverterDevTool />
          </div>
          <div className="mt-14">
            <RelatedTools currentPath="/kebab-case-converter" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
