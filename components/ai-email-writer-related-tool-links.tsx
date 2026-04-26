import Link from "next/link";

export function AiEmailWriterRelatedToolLinks() {
  return (
    <section className="mt-12 rounded-lg border border-border bg-muted/15 p-5 sm:p-6" aria-labelledby="ai-email-related-heading">
      <h2 id="ai-email-related-heading" className="text-lg font-semibold tracking-tight text-foreground">Related tools</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
        <li><Link href="/tools/ai-paraphraser" className="font-medium text-foreground underline">AI Paraphraser</Link> — rewrite generated drafts while preserving intent.</li>
        <li><Link href="/tools/ai-grammar-fixer" className="font-medium text-foreground underline">AI Grammar Fixer</Link> — polish grammar and punctuation before sending.</li>
        <li><Link href="/tools/ai-text-summarizer" className="font-medium text-foreground underline">AI Text Summarizer</Link> — condense long threads into key talking points.</li>
      </ul>
    </section>
  );
}
