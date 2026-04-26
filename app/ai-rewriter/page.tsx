import Link from "next/link";

import { AiParaphraserTool } from "@/app/tools/ai-paraphraser/ai-paraphraser-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function AiRewriterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.aiRewriter)} />
      <Header />
      <main className="flex-1 bg-background" id="main-content" aria-labelledby="ai-rewriter-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <h1 id="ai-rewriter-h1" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">AI rewriter</h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>An AI rewriter is useful when you have solid ideas but weak phrasing. It can transform repetitive, flat, or overly complex drafts into cleaner language while keeping meaning stable. This is valuable for high-output teams that produce newsletters, product updates, knowledge-base entries, and social captions on tight schedules. Instead of staring at sentence-level edits for an hour, you generate alternatives in seconds and refine quickly.</p>
            <p>The SmartFlexa implementation uses a Hugging Face paraphrasing model and mode-aware generation settings. Standard mode is balanced for everyday edits, Creative mode broadens vocabulary and structure, and Formal mode keeps tone more restrained for business writing. With word-limit guards and request timeouts in the API route, the experience remains responsive enough for practical production use.</p>
            <p>AI rewriting should complement, not replace, editorial standards. Keep source intent, legal constraints, and brand vocabulary in mind when selecting final copy. If output feels too generic, mix lines from multiple variations and apply a final manual polish. You can also switch to the canonical tool page for richer guidance: <Link href="/tools/ai-paraphraser" className="font-medium text-foreground underline">Paraphrase text online</Link>.</p>
          </article>
          <div className="mt-10"><AiParaphraserTool /></div>
          <div className="mt-14"><RelatedTools currentPath="/ai-rewriter" heading="More tools" /></div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
