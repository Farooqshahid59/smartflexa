import Link from "next/link";

import { AiParaphraserTool } from "@/app/tools/ai-paraphraser/ai-paraphraser-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function SentenceRewriterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.sentenceRewriter)} />
      <Header />
      <main className="flex-1 bg-background" id="main-content" aria-labelledby="sentence-rewriter-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <h1 id="sentence-rewriter-h1" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Sentence rewriter</h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>A sentence rewriter helps when individual lines feel awkward, unclear, or too repetitive. Writers often know what they want to say but struggle with rhythm, transitions, or concise structure. Rewriting tools provide alternate sentence forms so you can choose the version that sounds natural to your audience. This is especially helpful for product pages, technical explanations, and customer communication where clarity directly affects trust.</p>
            <p>On SmartFlexa, this route uses the same paraphraser component as the main AI tool. You can paste paragraph-length text, run rewrite mode, and compare up to several outputs depending on model response. Copy controls and responsive layout make it practical on desktop and mobile. Because the underlying model predicts new phrasing rather than performing simple synonym swaps, output tends to be more fluent and coherent.</p>
            <p>After rewriting, review for precision. Ensure key constraints, numbers, and proper nouns are unchanged. If your domain has strict terminology, replace generic alternatives with approved language before publishing. For complete onboarding information and FAQ answers, visit <Link href="/tools/ai-paraphraser" className="font-medium text-foreground underline">AI Paraphrasing Tool</Link> and continue from the same interface.</p>
          </article>
          <div className="mt-10"><AiParaphraserTool /></div>
          <div className="mt-14"><RelatedTools currentPath="/sentence-rewriter" heading="More tools" /></div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
