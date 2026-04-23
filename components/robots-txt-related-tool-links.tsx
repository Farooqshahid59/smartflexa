import Link from "next/link";

export function RobotsTxtRelatedToolLinks() {
  return (
    <section
      className="mt-12 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="robots-txt-related-heading"
    >
      <h2
        id="robots-txt-related-heading"
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
          — robots meta and social tags alongside crawl rules.
        </li>
        <li>
          <Link
            href="/tools/url-encoder-decoder"
            className="font-medium text-foreground underline"
          >
            URL Encoder / Decoder
          </Link>{" "}
          — encode sitemap and canonical URLs safely.
        </li>
        <li>
          <Link href="/tools/html-to-text" className="font-medium text-foreground underline">
            HTML to Text
          </Link>{" "}
          — extract visible copy when auditing indexed pages.
        </li>
      </ul>
    </section>
  );
}
