import Link from "next/link";

export function DiffRelatedToolLinks() {
  return (
    <section
      className="mt-12 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="diff-related-heading"
    >
      <h2
        id="diff-related-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Related tools
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
        <li>
          <Link href="/tools/json-formatter" className="font-medium text-foreground underline">
            JSON Formatter
          </Link>{" "}
          — pretty-print structured data before you diff versions of config files.
        </li>
        <li>
          <Link href="/tools/html-to-text" className="font-medium text-foreground underline">
            HTML to Text
          </Link>{" "}
          — strip tags so prose comparisons stay readable in plain text.
        </li>
        <li>
          <Link
            href="/tools/remove-duplicate-lines"
            className="font-medium text-foreground underline"
          >
            Remove Duplicate Lines
          </Link>{" "}
          — clean lists before comparing sorted or unsorted exports.
        </li>
      </ul>
    </section>
  );
}
