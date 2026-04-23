import Link from "next/link";

import { TextDiffCheckerTool } from "@/app/tools/text-diff-checker/text-diff-checker-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function CompareTwoTextsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.compareTwoTexts)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 bg-background" aria-labelledby="hub-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Compare two texts</span>
          </nav>
          <h1
            id="hub-h1"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Compare two texts online
          </h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Whether you are reconciling two versions of a README, a contract clause, or a
              translation handoff, the core task is the same:{" "}
              <strong className="text-foreground">compare two texts</strong> and make the deltas
              obvious to every reviewer in the room. Side-by-side line alignment beats scrolling
              two windows because the tool keeps rows paired—unchanged lines sit quietly in the
              background while additions, removals, and substitutions shout in color.
            </p>
            <p>
              SmartFlexa’s engine runs entirely in your tab: paste drafts, upload plain-text files,
              toggle ignore-case when capitalization is irrelevant, or ignore whitespace when CMS
              exports introduced stray spaces. When you are finished, copy a unified diff string
              for Jira, GitHub comments, or email. For the canonical experience with full FAQs,
              open the main{" "}
              <Link
                href="/tools/text-diff-checker"
                className="font-medium text-foreground underline"
              >
                text diff checker
              </Link>
              .
            </p>
            <p>
              If your inputs are huge, split them into chapters—browser memory limits still apply—
              then merge findings in your project tracker.
            </p>
          </article>
          <div className="mt-10">
            <TextDiffCheckerTool />
          </div>
          <div className="mt-14">
            <RelatedTools currentPath="/compare-two-texts" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
