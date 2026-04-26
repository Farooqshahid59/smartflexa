import Link from "next/link";

export function AiParaphraserRelatedToolLinks() {
  return (
    <section
      className="mt-12 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="ai-paraphraser-related-heading"
    >
      <h2
        id="ai-paraphraser-related-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Related tools
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
        <li>
          <Link href="/tools/ai-grammar-fixer" className="font-medium text-foreground underline">
            AI Grammar Fixer
          </Link>{" "}
          — clean syntax after paraphrasing when tone shifts punctuation.
        </li>
        <li>
          <Link href="/tools/ai-text-summarizer" className="font-medium text-foreground underline">
            AI Text Summarizer
          </Link>{" "}
          — condense rewritten passages into short takeaways.
        </li>
        <li>
          <Link href="/ai-detector" className="font-medium text-foreground underline">
            AI Detector
          </Link>{" "}
          — estimate whether rewritten text appears machine-like or human-like.
        </li>
      </ul>
    </section>
  );
}
