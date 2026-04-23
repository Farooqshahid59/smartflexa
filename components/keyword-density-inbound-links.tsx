import Link from "next/link";

export function KeywordDensityInboundLinks() {
  return (
    <section
      className="mt-12 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="kdc-inbound-heading"
    >
      <h2
        id="kdc-inbound-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        On-page wording
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Count how often important terms appear before you publish drafts or client copy.
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>
          <Link
            href="/tools/keyword-density-checker"
            className="font-medium text-foreground underline"
          >
            Check keyword density
          </Link>
        </li>
        <li>
          <Link
            href="/tools/keyword-density-checker"
            className="font-medium text-foreground underline"
          >
            SEO keyword analyzer
          </Link>
        </li>
      </ul>
    </section>
  );
}
