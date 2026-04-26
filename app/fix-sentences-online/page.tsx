import Link from "next/link";

import { AiGrammarFixerTool } from "@/app/tools/ai-grammar-fixer/ai-grammar-fixer-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function FixSentencesOnlinePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.fixSentencesOnline)} />
      <Header />
      <main className="flex-1 bg-background" id="main-content" aria-labelledby="fix-sentences-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <h1 id="fix-sentences-h1" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Fix sentences online</h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              People searching to <strong className="text-foreground">fix sentences online</strong>
              usually care less about grammar terminology and more about readability. They want text that
              sounds natural, avoids awkward phrasing, and communicates intent clearly in one pass. That
              includes founders writing investor updates, HR teams drafting policy reminders, customer
              success teams preparing handoffs, and creators polishing captions before publishing.
            </p>
            <p>
              SmartFlexa&apos;s AI grammar fixer can rewrite clunky sentence structure while correcting
              punctuation and agreement mistakes. The output is plain text, so you can paste directly into
              email clients, docs, or CMS editors without extra cleanup. Use the basic highlight panel to
              spot changed words quickly, then decide whether each revision matches your preferred voice.
              This keeps review practical: accept useful clarity improvements, reject changes that alter
              legal nuance, product naming, or audience tone.
            </p>
            <p>
              Sentence-level rewriting is especially helpful when drafts come from mixed sources—voice
              notes, chat transcripts, and collaborative outlines. Those inputs often contain fragmented
              clauses and inconsistent tense. AI cleanup provides a strong baseline, after which a human
              editor can enforce brand style and strategic messaging.
            </p>
            <p>
              For the complete feature page with FAQs and related tools, visit
              <Link href="/tools/ai-grammar-fixer" className="font-medium text-foreground underline"> AI grammar checker</Link>.
            </p>
            <p>
              If your workflow involves frequent rewrites, keep a short checklist for final human QA:
              factual integrity, tone consistency, and call-to-action clarity after each AI pass.
            </p>
          </article>
          <div className="mt-10"><AiGrammarFixerTool /></div>
          <div className="mt-14"><RelatedTools currentPath="/fix-sentences-online" heading="More tools" /></div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
