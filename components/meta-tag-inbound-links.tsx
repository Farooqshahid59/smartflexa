import Link from "next/link";

export function MetaTagInboundLinks() {
  return (
    <section
      className="mt-10 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="meta-tag-inbound-heading"
    >
      <h2
        id="meta-tag-inbound-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Head tags & social previews
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Paste-ready <code className="rounded bg-muted px-1">&lt;meta&gt;</code> and Open Graph markup,
        with a live search snippet preview—all in your browser.
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>
          <Link
            href="/tools/meta-tag-generator"
            className="font-medium text-foreground underline"
          >
            Generate meta tags
          </Link>
        </li>
        <li>
          <Link
            href="/tools/meta-tag-generator"
            className="font-medium text-foreground underline"
          >
            SEO meta tag tool
          </Link>
        </li>
      </ul>
    </section>
  );
}
