import Link from "next/link";

import { AiParaphraserTool } from "@/app/tools/ai-paraphraser/ai-paraphraser-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function RewriteTextOnlinePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.rewriteTextOnline)} />
      <Header />
      <main className="flex-1 bg-background" id="main-content" aria-labelledby="rewrite-online-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <h1 id="rewrite-online-h1" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Rewrite text online</h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>When you need to rewrite text online, speed matters as much as quality. Marketers update campaign copy, founders polish landing pages, and support teams reframe responses for different customer tones every day. A browser-based rewriter removes friction: no document export, no plugin setup, and no context switching. You paste content, run AI rewrite, then continue editing in your current workflow.</p>
            <p>SmartFlexa is designed for that rapid iteration cycle. You can submit medium-length passages, select rewriting mode, and get readable alternatives that keep the original message intact. The interface shows clear loading states, handles invalid input with helpful errors, and offers one-click copy for each variation. This makes it practical for quick transformations like simplifying dense paragraphs, formalizing informal drafts, or refreshing repetitive wording.</p>
            <p>Still, rewriting should not remove accountability. Before publishing, confirm names, claims, and numbers, especially in regulated topics. AI can alter nuance subtly, so a short human review protects intent. If you want deeper explanation, structured FAQs, and tool comparisons, open <Link href="/tools/ai-paraphraser" className="font-medium text-foreground underline">Rewrite text using AI</Link> on the main paraphraser page.</p>
          </article>
          <div className="mt-10"><AiParaphraserTool /></div>
          <div className="mt-14"><RelatedTools currentPath="/rewrite-text-online" heading="More tools" /></div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
