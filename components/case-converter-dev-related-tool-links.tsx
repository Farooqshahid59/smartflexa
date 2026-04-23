import Link from "next/link";

export function CaseConverterDevRelatedToolLinks() {
  return (
    <section
      className="mt-12 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="ccd-related-heading"
    >
      <h2
        id="ccd-related-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Related tools
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
        <li>
          <Link
            href="/tools/text-case-converter"
            className="font-medium text-foreground underline"
          >
            Text Case Converter
          </Link>{" "}
          — uppercase, lowercase, title case, and sentence case for prose.
        </li>
        <li>
          <Link
            href="/tools/json-formatter"
            className="font-medium text-foreground underline"
          >
            JSON Formatter
          </Link>{" "}
          — pretty-print keys that often use camelCase in JavaScript APIs.
        </li>
        <li>
          <Link
            href="/tools/url-encoder-decoder"
            className="font-medium text-foreground underline"
          >
            URL Encoder/Decoder
          </Link>{" "}
          — percent-encode path and query segments after you pick a slug style.
        </li>
      </ul>
    </section>
  );
}
