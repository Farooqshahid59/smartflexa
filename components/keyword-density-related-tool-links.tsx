import Link from "next/link";

export function KeywordDensityRelatedToolLinks() {
  return (
    <section
      className="mt-12 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="kdc-related-heading"
    >
      <h2
        id="kdc-related-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Related tools
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
        <li>
          <Link
            href="/tools/meta-tag-generator"
            className="font-medium text-foreground underline"
          >
            Meta Tag Generator
          </Link>{" "}
          — draft titles and descriptions after you tune primary phrases.
        </li>
        <li>
          <Link
            href="/tools/sitemap-generator"
            className="font-medium text-foreground underline"
          >
            Sitemap Generator
          </Link>{" "}
          — help crawlers discover URLs once on-page wording is finalized.
        </li>
        <li>
          <Link
            href="/tools/robots-txt-generator"
            className="font-medium text-foreground underline"
          >
            Robots.txt Generator
          </Link>{" "}
          — control crawl budget alongside content quality signals.
        </li>
      </ul>
    </section>
  );
}
