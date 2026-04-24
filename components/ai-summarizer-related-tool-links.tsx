import Link from "next/link";

export function AiSummarizerRelatedToolLinks() {
  return (
    <section
      className="mt-12 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="ai-summarizer-related-heading"
    >
      <h2
        id="ai-summarizer-related-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Related tools
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
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
          — check length targets before and after summarization.
        </li>
        <li>
          <Link href="/tools/text-case-converter" className="font-medium text-foreground underline">
            Text Case Converter
          </Link>{" "}
          — clean heading casing for snippets and outline points.
        </li>
      </ul>
    </section>
  );
}
