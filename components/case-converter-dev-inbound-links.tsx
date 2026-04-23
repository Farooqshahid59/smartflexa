import Link from "next/link";

export function CaseConverterDevInboundLinks() {
  return (
    <section
      className="mt-12 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="ccd-inbound-heading"
    >
      <h2
        id="ccd-inbound-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Identifier naming
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Batch-generate camelCase, snake_case, kebab-case, and constant-style names from one paste.
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>
          <Link
            href="/tools/case-converter-dev"
            className="font-medium text-foreground underline"
          >
            Convert text to camelCase
          </Link>
        </li>
        <li>
          <Link
            href="/tools/case-converter-dev"
            className="font-medium text-foreground underline"
          >
            Developer case converter
          </Link>
        </li>
      </ul>
    </section>
  );
}
