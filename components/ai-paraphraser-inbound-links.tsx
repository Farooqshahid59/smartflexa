import Link from "next/link";

export function AiParaphraserInboundLinks() {
  return (
    <section
      className="mt-12 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="ai-paraphraser-inbound-heading"
    >
      <h2
        id="ai-paraphraser-inbound-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Rewrite with clarity
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Reword drafts while preserving meaning, then edit for brand voice and facts.
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>
          <Link href="/tools/ai-paraphraser" className="font-medium text-foreground underline">
            Paraphrase text online
          </Link>
        </li>
        <li>
          <Link href="/tools/ai-paraphraser" className="font-medium text-foreground underline">
            Rewrite text using AI
          </Link>
        </li>
      </ul>
    </section>
  );
}
