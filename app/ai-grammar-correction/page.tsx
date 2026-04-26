import Link from "next/link";

import { AiGrammarFixerTool } from "@/app/tools/ai-grammar-fixer/ai-grammar-fixer-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function AiGrammarCorrectionPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.aiGrammarCorrection)} />
      <Header />
      <main className="flex-1 bg-background" id="main-content" aria-labelledby="ai-grammar-correction-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <h1 id="ai-grammar-correction-h1" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">AI grammar correction</h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              <strong className="text-foreground">AI grammar correction</strong> combines rule-like
              cleanup with model-based rephrasing to make writing more fluent. Instead of only flagging
              errors, modern correction models can rewrite segments so the final sentence reads naturally
              while preserving intent. That is useful for high-output teams who edit dozens of drafts per
              week and cannot manually line-edit every sentence from scratch.
            </p>
            <p>
              SmartFlexa keeps this workflow practical: submit text, receive corrected output, copy it,
              and move forward. Input limits keep responses fast, and output is normalized to clean text
              so it can be pasted directly into communication channels. The highlight preview gives a quick
              view of changed tokens, helping reviewers catch unintended edits in names, numbers, or legal
              qualifiers before publication.
            </p>
            <p>
              AI correction is strongest as an accelerator, not a final authority. You should still run a
              human review for context-sensitive writing, especially legal, medical, financial, or policy
              content where a subtle wording shift can change meaning. In those cases, think of AI as a
              drafting assistant that removes repetitive mechanics while humans keep final accountability.
            </p>
            <p>
              For full SEO content and FAQ details, head to
              <Link href="/tools/ai-grammar-fixer" className="font-medium text-foreground underline"> AI grammar checker</Link>.
            </p>
            <p>
              In practice, teams get the best outcomes by combining AI correction with editorial
              standards docs so every correction pass aligns with approved terminology and brand voice.
            </p>
          </article>
          <div className="mt-10"><AiGrammarFixerTool /></div>
          <div className="mt-14"><RelatedTools currentPath="/ai-grammar-correction" heading="More tools" /></div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
