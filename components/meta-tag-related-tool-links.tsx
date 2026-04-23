import Link from "next/link";

export function MetaTagRelatedToolLinks() {
  return (
    <section
      className="mt-12 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="meta-tag-related-heading"
    >
      <h2
        id="meta-tag-related-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Related tools
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
        <li>
          <Link href="/tools/json-formatter" className="font-medium text-foreground underline">
            JSON Formatter
          </Link>{" "}
          — structure API responses and config next to your head tags.
        </li>
        <li>
          <Link
            href="/tools/url-encoder-decoder"
            className="font-medium text-foreground underline"
          >
            URL Encoder / Decoder
          </Link>{" "}
          — safe query strings for canonical and share URLs.
        </li>
        <li>
          <Link href="/tools/html-to-text" className="font-medium text-foreground underline">
            HTML to Text
          </Link>{" "}
          — strip markup when repurposing body copy into descriptions.
        </li>
      </ul>
    </section>
  );
}
