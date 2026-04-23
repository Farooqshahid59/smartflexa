import Link from "next/link";

export function UsernameRelatedToolLinks() {
  return (
    <section
      className="mt-12 rounded-lg border border-border bg-muted/15 p-5 sm:p-6"
      aria-labelledby="username-related-heading"
    >
      <h2
        id="username-related-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        Related tools
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
        <li>
          <Link
            href="/tools/password-generator"
            className="font-medium text-foreground underline"
          >
            Password Generator
          </Link>{" "}
          — strong secrets after you pick a handle.
        </li>
        <li>
          <Link
            href="/tools/random-number-generator"
            className="font-medium text-foreground underline"
          >
            Random Number Generator
          </Link>{" "}
          — numeric suffixes and PIN-style draws.
        </li>
        <li>
          <Link
            href="/tools/lorem-ipsum-generator"
            className="font-medium text-foreground underline"
          >
            Lorem Ipsum Generator
          </Link>{" "}
          — placeholder bios and profile copy drafts.
        </li>
      </ul>
    </section>
  );
}
