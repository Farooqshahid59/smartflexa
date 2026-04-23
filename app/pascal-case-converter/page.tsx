import Link from "next/link";

import { CaseConverterDevTool } from "@/app/tools/case-converter-dev/case-converter-dev-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function PascalCaseConverterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.pascalCaseConverter)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 bg-background" aria-labelledby="pascal-hub-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">PascalCase converter</span>
          </nav>
          <h1
            id="pascal-hub-h1"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            PascalCase converter
          </h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              <strong className="text-foreground">PascalCase</strong> signals &quot;this is a type or
              component&quot; in ecosystems as diverse as React, .NET, and SwiftUI previews. Unlike
              camelCase, every word begins uppercase and there is no separator, so accidental spaces
              from design handoffs must disappear before an{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">
                export function UserProfileCard
              </code>{" "}
              line ships.
            </p>
            <p>
              Paste product phrases or route segments into the tool below: tokens normalize the same
              way as other variants, but the Pascal card capitalizes each segment for instant paste
              into{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">class UserProfile</code>{" "}
              declarations or filename stems. Seeing camelCase beside Pascal
              helps newer contributors internalize the single-character difference that linters
              enforce at compile time.
            </p>
            <p>
              For long-form documentation, structured data, and every format on one page, keep{" "}
              <Link
                href="/tools/case-converter-dev"
                className="font-medium text-foreground underline"
              >
                Convert text to camelCase
              </Link>{" "}
              bookmarked—it is the canonical SmartFlexa entry point that hosts this identical
              control grid.
            </p>
          </article>
          <div className="mt-10">
            <CaseConverterDevTool />
          </div>
          <div className="mt-14">
            <RelatedTools currentPath="/pascal-case-converter" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
