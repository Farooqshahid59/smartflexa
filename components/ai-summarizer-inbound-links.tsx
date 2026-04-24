import Link from "next/link";

export function AiSummarizerInboundLinks() {
  return (
    <section
      className="mt-12 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="ai-summarizer-inbound-heading"
    >
      <h2
        id="ai-summarizer-inbound-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Condense long drafts
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Turn long passages into concise key points with AI-assisted summarization.
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>
          <Link href="/tools/ai-text-summarizer" className="font-medium text-foreground underline">
            Summarize text online
          </Link>
        </li>
        <li>
          <Link href="/tools/ai-text-summarizer" className="font-medium text-foreground underline">
            AI text summarizer
          </Link>
        </li>
      </ul>
    </section>
  );
}
