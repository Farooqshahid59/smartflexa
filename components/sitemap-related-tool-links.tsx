import Link from "next/link";

export function SitemapRelatedToolLinks() {
  return (
    <section
      className="mt-12 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="sitemap-related-heading"
    >
      <h2
        id="sitemap-related-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Related tools
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
        <li>
          <Link
            href="/tools/robots-txt-generator"
            className="font-medium text-foreground underline"
          >
            Robots.txt Generator
          </Link>{" "}
          — reference your sitemap URL for crawlers.
        </li>
        <li>
          <Link
            href="/tools/meta-tag-generator"
            className="font-medium text-foreground underline"
          >
            Meta Tag Generator
          </Link>{" "}
          — page-level titles and descriptions for indexed URLs.
        </li>
        <li>
          <Link
            href="/tools/url-encoder-decoder"
            className="font-medium text-foreground underline"
          >
            URL Encoder / Decoder
          </Link>{" "}
          — safe loc values for tracking parameters.
        </li>
      </ul>
    </section>
  );
}
