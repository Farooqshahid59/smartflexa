import Link from "next/link";

export function RobotsTxtInboundLinks() {
  return (
    <section
      className="mt-10 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="robots-txt-inbound-heading"
    >
      <h2
        id="robots-txt-inbound-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Crawl rules
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Build <code className="rounded bg-muted px-1">robots.txt</code> with Allow/Disallow groups,
        optional crawl-delay, and sitemap lines—copy or download in one click.
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
        <li>
          <Link
            href="/tools/robots-txt-generator"
            className="font-medium text-foreground underline"
          >
            Create robots.txt
          </Link>
        </li>
        <li>
          <Link
            href="/tools/robots-txt-generator"
            className="font-medium text-foreground underline"
          >
            robots.txt generator
          </Link>
        </li>
      </ul>
    </section>
  );
}
