import Link from "next/link";

import { AiGrammarFixerTool } from "@/app/tools/ai-grammar-fixer/ai-grammar-fixer-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function GrammarCheckerOnlinePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.grammarCheckerOnline)} />
      <Header />
      <main className="flex-1 bg-background" id="main-content" aria-labelledby="grammar-online-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <h1 id="grammar-online-h1" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Grammar checker online</h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              A <strong className="text-foreground">grammar checker online</strong> is useful when you
              need quick language cleanup without switching apps or installing desktop software. Customer
              support teams paste reply drafts, marketers proof campaign copy, and students review
              assignments before submission. Browser-based correction lowers friction, especially when
              deadlines are tight and multiple people collaborate on the same document in short cycles.
            </p>
            <p>
              This SmartFlexa page runs the same AI grammar fixer component as the canonical tool route.
              It focuses on practical corrections: punctuation, agreement, sentence flow, and readability.
              You can copy revised text immediately, then run a short human pass for tone and factual
              precision. For high-stakes communication, always verify names, numbers, and policy wording
              after automated correction. AI editing is fast, but domain context still belongs to you.
            </p>
            <p>
              Good grammar checking is more than removing typos. It helps readers process ideas faster,
              lowers misinterpretation risk, and improves trust in product updates, onboarding emails, and
              proposal documents. If your team writes at scale, consistent correction also keeps style more
              uniform across contributors and channels, reducing last-minute editorial cleanup before
              publication.
            </p>
            <p>
              If you need full documentation, FAQs, and internal links, open
              <Link href="/tools/ai-grammar-fixer" className="font-medium text-foreground underline"> Fix grammar online</Link>.
              The tool below is exactly the same implementation.
            </p>
            <p>
              A quick pre-send correction pass also helps non-native teams collaborate faster because
              cleaner grammar reduces clarification loops in async chat, tickets, and stakeholder
              approvals.
            </p>
          </article>
          <div className="mt-10"><AiGrammarFixerTool /></div>
          <div className="mt-14"><RelatedTools currentPath="/grammar-checker-online" heading="More tools" /></div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
