import Link from "next/link";

export function AiGrammarRelatedToolLinks() {
  return (
    <section
      className="mt-12 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="ai-grammar-related-heading"
    >
      <h2
        id="ai-grammar-related-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Related tools
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
        <li>
          <Link href="/tools/ai-text-summarizer" className="font-medium text-foreground underline">
            AI Text Summarizer
          </Link>{" "}
          — condense corrected drafts into shorter key-point versions.
        </li>
        <li>
          <Link href="/ai-detector" className="font-medium text-foreground underline">
            AI Detector
          </Link>{" "}
          — estimate whether a draft feels machine-like or human-like.
        </li>
        <li>
          <Link href="/tools/word-counter" className="font-medium text-foreground underline">
            Word Counter
          </Link>{" "}
          — verify length targets after sentence rewriting.
        </li>
      </ul>
    </section>
  );
}
