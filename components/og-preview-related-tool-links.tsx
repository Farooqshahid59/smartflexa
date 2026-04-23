import Link from "next/link";

export function OgPreviewRelatedToolLinks() {
  return (
    <section
      className="mt-12 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="og-preview-related-heading"
    >
      <h2
        id="og-preview-related-heading"
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
          — build full head markup including Open Graph and Twitter tags.
        </li>
        <li>
          <Link
            href="/tools/sitemap-generator"
            className="font-medium text-foreground underline"
          >
            Sitemap Generator
          </Link>{" "}
          — create XML sitemaps for discovery alongside rich previews.
        </li>
        <li>
          <Link
            href="/tools/robots-txt-generator"
            className="font-medium text-foreground underline"
          >
            Robots.txt Generator
          </Link>{" "}
          — control crawling rules on the same domain you share links from.
        </li>
      </ul>
    </section>
  );
}
