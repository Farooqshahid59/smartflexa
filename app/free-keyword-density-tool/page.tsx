import Link from "next/link";

import { KeywordDensityCheckerTool } from "@/app/tools/keyword-density-checker/keyword-density-checker-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function FreeKeywordDensityToolPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.freeKeywordDensityTool)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 bg-background" aria-labelledby="free-kd-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Free keyword density tool</span>
          </nav>
          <h1
            id="free-kd-h1"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Free keyword density tool
          </h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Freelancers and in-house teams alike search for a <strong className="text-foreground">free keyword density tool</strong>{" "}
              that does not demand OAuth or credit cards just to count words. This SmartFlexa page
              delivers exactly that: paste a brief, upload a UTF-8 text export, toggle stop-word
              removal, and flip sort order when you want to inspect thin tail vocabulary instead of
              the head terms.
            </p>
            <p>
              The density column answers &quot;what fraction of this draft is the word
              onboarding?&quot; without sending your prose to an opaque API. Pair the numbers with
              editorial judgment—tighten repetitive sections, expand thin paragraphs, and align hero
              copy with the phrases you already validated in Search Console.
            </p>
            <p>
              For structured metadata and crawl guidance after copy is clean, continue to the{" "}
              <Link
                href="/tools/keyword-density-checker"
                className="font-medium text-foreground underline"
              >
                SEO keyword analyzer
              </Link>{" "}
              home at <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">/tools/keyword-density-checker</code>{" "}
              where FAQs and related links are centralized.
            </p>
          </article>
          <div className="mt-10">
            <KeywordDensityCheckerTool />
          </div>
          <div className="mt-14">
            <RelatedTools currentPath="/free-keyword-density-tool" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
