import Link from "next/link";

export function DiffInboundLinks() {
  return (
    <section
      className="mt-12 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="diff-inbound-heading"
    >
      <h2
        id="diff-inbound-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Compare text
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Highlight additions, removals, and edits between two drafts—runs locally in your browser.
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>
          <Link
            href="/tools/text-diff-checker"
            className="font-medium text-foreground underline"
          >
            Compare text online
          </Link>
        </li>
        <li>
          <Link
            href="/tools/text-diff-checker"
            className="font-medium text-foreground underline"
          >
            Text diff checker
          </Link>
        </li>
      </ul>
    </section>
  );
}
