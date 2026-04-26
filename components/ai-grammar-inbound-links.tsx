import Link from "next/link";

export function AiGrammarInboundLinks() {
  return (
    <section
      className="mt-12 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="ai-grammar-inbound-heading"
    >
      <h2
        id="ai-grammar-inbound-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Polish sentence quality
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Correct grammar mistakes and improve clarity before publishing or sending drafts.
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>
          <Link href="/tools/ai-grammar-fixer" className="font-medium text-foreground underline">
            Fix grammar online
          </Link>
        </li>
        <li>
          <Link href="/tools/ai-grammar-fixer" className="font-medium text-foreground underline">
            AI grammar checker
          </Link>
        </li>
      </ul>
    </section>
  );
}
