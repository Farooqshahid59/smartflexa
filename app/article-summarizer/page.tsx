import Link from "next/link";

import { AiTextSummarizerTool } from "@/app/tools/ai-text-summarizer/ai-text-summarizer-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function ArticleSummarizerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.articleSummarizer)} />
      <Header />
      <main className="flex-1 bg-background" id="main-content" aria-labelledby="article-sum-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">Article summarizer</span>
          </nav>

          <h1
            id="article-sum-h1"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Article summarizer
          </h1>

          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              An <strong className="text-foreground">article summarizer</strong> is most valuable when
              you already trust the underlying facts but need a faster way to communicate the gist.
              Newsletters, investor updates, and weekly product digests all depend on turning long
              reporting into something a busy reader can scan in under a minute. The risk is always the
              same: compression removes nuance, so the summary should be treated as a draft that still
              needs a human editor who understands what cannot be simplified away.
            </p>
            <p>
              SmartFlexa routes this task through Hugging Face inference using the{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">facebook/bart-large-cnn</code>{" "}
              model, which is trained for document-style summarization. You paste an article-length
              passage, choose a length preset, and receive plain text you can paste into Slack, email, or
              a CMS. Because the request is handled server-side, your API key stays off the client while
              the UI stays simple for contributors who do not manage environment variables.
            </p>
            <p>
              Practical preparation still matters: remove boilerplate navigation text, unrelated
              footers, and duplicate CTAs before summarizing. If the article contains multiple unrelated
              sections—release notes plus a marketing essay—split them first so the model can focus on
              one storyline. When you are ready to polish headings and casing after summarization, pair
              this workflow with SmartFlexa&apos;s{" "}
              <Link href="/tools/text-case-converter" className="font-medium text-foreground underline">
                Text Case Converter
              </Link>{" "}
              and{" "}
              <Link href="/tools/word-counter" className="font-medium text-foreground underline">
                Word Counter
              </Link>{" "}
              so downstream snippets match your style guide.
            </p>
            <p>
              For the canonical page with full SEO copy, FAQ structured data, and related tool links, use
              the{" "}
              <Link href="/tools/ai-text-summarizer" className="font-medium text-foreground underline">
                AI text summarizer
              </Link>{" "}
              route. The widget below is identical so you can bookmark either URL depending on whether
              you searched for an article-focused keyword or the general product name.
            </p>
          </article>

          <div className="mt-10">
            <AiTextSummarizerTool />
          </div>

          <div className="mt-14">
            <RelatedTools currentPath="/article-summarizer" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
