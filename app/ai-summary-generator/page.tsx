import Link from "next/link";

import { AiTextSummarizerTool } from "@/app/tools/ai-text-summarizer/ai-text-summarizer-tool";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function AiSummaryGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.aiSummaryGenerator)} />
      <Header />
      <main className="flex-1 bg-background" id="main-content" aria-labelledby="ai-summary-gen-h1">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">AI summary generator</span>
          </nav>

          <h1
            id="ai-summary-gen-h1"
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            AI summary generator
          </h1>

          <article className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              An <strong className="text-foreground">AI summary generator</strong> is not a replacement
              for editorial judgment, but it can compress repetitive source material into a workable
              outline. Product marketing teams use generators to draft “key takeaways” boxes, customer
              education teams convert long help-center articles into onboarding blurbs, and analysts
              condense dense PDFs into meeting-ready paragraphs. The common thread is that humans still
              own the final wording—especially for compliance-sensitive industries.
            </p>
            <p>
              SmartFlexa keeps the interface intentionally small: a large input area, three length
              presets, and a copy button on the output. Under the hood, the server forwards your text to
              Hugging Face with bounded decoding parameters so responses typically return within a few
              seconds for normal article lengths. If you need tighter control over word budgets, combine
              this tool with the{" "}
              <Link href="/tools/word-counter" className="font-medium text-foreground underline">
                Word Counter
              </Link>{" "}
              to compare source and summary lengths side by side.
            </p>
            <p>
              If you are generating summaries for SEO snippets, remember that search snippets should
              reflect the on-page content accurately. Summaries are helpful for internal outlines, but
              your published meta description should still be hand-checked for click appeal and policy
              compliance. When you are ready to format titles and bullets consistently, the{" "}
              <Link href="/tools/text-case-converter" className="font-medium text-foreground underline">
                Text Case Converter
              </Link>{" "}
              can speed up the polish pass.
            </p>
            <p>
              The canonical SmartFlexa entry point for this feature lives at{" "}
              <Link href="/tools/ai-text-summarizer" className="font-medium text-foreground underline">
                AI text summarizer
              </Link>, including FAQ structured data and related links. This URL targets people who
              search using “generator” phrasing while reusing the exact same summarization widget.
            </p>
          </article>

          <div className="mt-10">
            <AiTextSummarizerTool />
          </div>

          <div className="mt-14">
            <RelatedTools currentPath="/ai-summary-generator" heading="More tools" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
