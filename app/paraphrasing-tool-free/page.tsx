import Link from "next/link";

import { AiParaphraserTool } from "@/app/tools/ai-paraphraser/ai-paraphraser-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function ParaphrasingToolFreePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.paraphrasingToolFree)} />
      <Header />
      <main className="flex-1 bg-background" id="main-content" aria-labelledby="paraphrasing-free-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <h1 id="paraphrasing-free-h1" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Paraphrasing tool free</h1>
          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>A free paraphrasing tool helps writers restate ideas without rebuilding every sentence from scratch. Teams use it for email updates, blog refreshes, assignment drafts, and support documentation where clarity matters more than stylistic flourish. Instead of manually rewriting line by line, you can generate alternatives and spend your time validating facts and adjusting tone. That workflow is much faster when deadlines are tight and content volume is high.</p>
            <p>This SmartFlexa page runs the same AI component as the canonical route and keeps the process simple: paste at least fifty words, choose Standard, Creative, or Formal mode, and generate rewritten text with one click. Standard mode aims for balance, Creative mode explores broader phrasing, and Formal mode pushes neutral professional language. You can copy the first output immediately and compare extra variations when available.</p>
            <p>Paraphrasing still requires judgment. If your source includes statistics, legal wording, or policy statements, verify details after rewriting so meaning is preserved. Also remember that rewording is not a replacement for attribution when referencing third-party material. Use AI to speed drafting, then complete a human quality pass for accuracy and compliance. For full documentation and FAQ details, visit <Link href="/tools/ai-paraphraser" className="font-medium text-foreground underline">AI Paraphrasing Tool</Link>.</p>
          </article>
          <div className="mt-10"><AiParaphraserTool /></div>
          <div className="mt-14"><RelatedTools currentPath="/paraphrasing-tool-free" heading="More tools" /></div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
