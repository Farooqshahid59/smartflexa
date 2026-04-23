import Link from "next/link";

export function OgPreviewInboundLinks() {
  return (
    <section
      className="mt-12 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="og-preview-inbound-heading"
    >
      <h2
        id="og-preview-inbound-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Link previews
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        See how titles, descriptions, and images unfurl before you post—runs in your browser.
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>
          <Link
            href="/tools/open-graph-preview"
            className="font-medium text-foreground underline"
          >
            Preview Open Graph tags
          </Link>
        </li>
        <li>
          <Link
            href="/tools/open-graph-preview"
            className="font-medium text-foreground underline"
          >
            Open graph preview tool
          </Link>
        </li>
      </ul>
    </section>
  );
}
