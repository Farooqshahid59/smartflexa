import Link from "next/link";

import { AiTextSummarizerTool } from "@/app/tools/ai-text-summarizer/ai-text-summarizer-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function TextSummarizerOnlinePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.textSummarizerOnline)} />
      <Header />
      <main className="flex-1 bg-background" id="main-content" aria-labelledby="text-sum-online-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Text summarizer online</span>
          </nav>

          <h1
            id="text-sum-online-h1"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Text summarizer online
          </h1>

          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              When people search for a <strong className="text-foreground">text summarizer online</strong>,
              they usually need speed without installing desktop software. Browser-based workflows are
              ideal for one-off tasks: a journalist condensing a court transcript excerpt, a PM turning a
              meeting dump into bullets, or a student distilling a journal article before annotating
              quotes. The trade-off is trust: you should still read the summary against the source,
              especially when numbers, dates, or conditional statements appear in the original.
            </p>
            <p>
              This SmartFlexa route is built for that pattern: paste text, pick short, medium, or
              detailed output, and copy the result. The backend validates length so the experience stays
              predictable, and the Hugging Face model focuses on abstractive summarization tuned for news
              and article-like prose. If your draft contains heavy markdown or HTML, strip formatting
              first so tokenization aligns with what you see on screen.
            </p>
            <p>
              Online summarization pairs naturally with editorial QA. After you generate a paragraph,
              run a quick sanity pass for hallucinated names, dropped negations, and softened warnings.
              If you are evaluating whether a submission reads machine-written, consider SmartFlexa&apos;s{" "}
              <Link href="/ai-detector" className="font-medium text-foreground underline">
                AI Detector
              </Link>{" "}
              as a separate signal from summarization quality.
            </p>
            <p>
              For the full guide, FAQ schema, and internal links to companion utilities, open{" "}
              <Link href="/tools/ai-text-summarizer" className="font-medium text-foreground underline">
                Summarize text online
              </Link>{" "}
              on the canonical tools path. The component below is the same implementation used there.
            </p>
          </article>

          <div className="mt-10">
            <AiTextSummarizerTool />
          </div>

          <div className="mt-14">
            <RelatedTools currentPath="/text-summarizer-online" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
