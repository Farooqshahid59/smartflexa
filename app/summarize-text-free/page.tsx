import Link from "next/link";

import { AiTextSummarizerTool } from "@/app/tools/ai-text-summarizer/ai-text-summarizer-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function SummarizeTextFreePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.summarizeTextFree)} />
      <Header />
      <main className="flex-1 bg-background" id="main-content" aria-labelledby="sum-free-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Summarize text free</span>
          </nav>

          <h1
            id="sum-free-h1"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Summarize text free
          </h1>

          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              If you want to <strong className="text-foreground">summarize text free</strong>, you still
              deserve predictable quality: clear output, obvious controls, and honest limits. SmartFlexa
              exposes a straightforward flow—paste, choose a length preset, summarize, copy—without
              pushing you through a signup wall for basic usage. The summarizer is backed by Hugging
              Face inference, while your browser handles the interactive UI.
            </p>
            <p>
              Free tools shine in education and community settings where budgets are tight but workload
              is not. Teachers can summarize exemplar essays for discussion prompts; volunteers can
              condense policy updates for neighborhood newsletters; founders can compress user research
              transcripts into decision memos. In each scenario, the cost savings come from time, not
              from skipping review. Summaries should be cited as drafts until a human verifies claims.
            </p>
            <p>
              SmartFlexa also makes adjacent workflows easy. After summarizing, you may want to check
              whether a submission reads overly uniform—use the{" "}
              <Link href="/ai-detector" className="font-medium text-foreground underline">
                AI Detector
              </Link>{" "}
              as a separate screen. For mechanical cleanup, pair summarization with the{" "}
              <Link href="/tools/text-case-converter" className="font-medium text-foreground underline">
                Text Case Converter
              </Link>{" "}
              and{" "}
              <Link href="/tools/word-counter" className="font-medium text-foreground underline">
                Word Counter
              </Link>.
            </p>
            <p>
              For the canonical documentation URL (including FAQ JSON-LD and related tool modules),
              bookmark{" "}
              <Link href="/tools/ai-text-summarizer" className="font-medium text-foreground underline">
                Summarize text online
              </Link>. The widget below matches that page exactly.
            </p>
          </article>

          <div className="mt-10">
            <AiTextSummarizerTool />
          </div>

          <div className="mt-14">
            <RelatedTools currentPath="/summarize-text-free" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
