import Link from "next/link";

import { AiGrammarFixerTool } from "@/app/tools/ai-grammar-fixer/ai-grammar-fixer-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function CorrectGrammarTextPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.correctGrammarText)} />
      <Header />
      <main className="flex-1 bg-background" id="main-content" aria-labelledby="correct-grammar-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <h1 id="correct-grammar-h1" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Correct grammar text</h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              To <strong className="text-foreground">correct grammar text</strong> effectively, you
              need more than spellcheck. Real drafts include punctuation drift, run-on clauses, mixed
              tenses, and vague connectors that make ideas harder to follow. AI correction helps by
              producing a cleaner baseline version so your final edit can focus on argument quality,
              audience relevance, and factual precision rather than purely mechanical fixes.
            </p>
            <p>
              This SmartFlexa route shares the same model-backed grammar fixer as the main tool. Paste
              your draft, run correction, and review the revised output with a quick scan of highlighted
              changes. If a technical term or brand phrase is altered, restore it manually while keeping
              the rest of the grammatical cleanup. That balance is often the fastest path: let AI handle
              repetitive language mechanics while humans retain control over domain wording and policy
              accuracy.
            </p>
            <p>
              Teams that publish frequently can use this workflow as a quality gate before final review.
              Documentation writers, support teams, and marketing editors all benefit from predictable
              sentence cleanup that reduces last-minute copy debt. For long documents, process section by
              section so corrections remain context-aware and easier to verify.
            </p>
            <p>
              Use
              <Link href="/tools/ai-grammar-fixer" className="font-medium text-foreground underline"> Fix grammar online</Link>
              for the canonical page, complete FAQ section, and related writing tools.
            </p>
            <p>
              Consistent grammar also improves search readability and user trust signals, especially on
              evergreen pages where small wording issues can persist for months if not corrected early.
            </p>
          </article>
          <div className="mt-10"><AiGrammarFixerTool /></div>
          <div className="mt-14"><RelatedTools currentPath="/correct-grammar-text" heading="More tools" /></div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
